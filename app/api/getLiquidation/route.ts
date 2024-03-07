import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { settleBalances } from "./memberbalanses";

const prisma = new PrismaClient();

interface ExpenseDetails {
  [key: string]: { memberId: string; amount: number };
}

interface MemberTotal {
  [key: string]: { memberId: string; totalAmount: number };
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const groupId = body.groupId;
  const expenses = await prisma.expense.findMany({
    where: {
      groupId: groupId,
    },
    include: {
      participants: {
        include: {
          member: true,
        },
      },
    },
  });

  const expenseDetails: ExpenseDetails = {};

  expenses.forEach((expense) => {
    expense.participants.forEach((participant) => {
      const key = `${expense.expenseId}_${participant.member.name}`;
      // Convert Decimal to number
      const amountAsNumber = parseFloat(participant.amount.toString());
      expenseDetails[key] = {
        memberId: participant.member.memberId,
        amount: amountAsNumber,
      };
    });
  });

  const memberTotal: MemberTotal = {};

  // Calculate total amount for each member
  for (const key in expenseDetails) {
    const { memberId, amount } = expenseDetails[key];
    const [, memberName] = key.split("_");

    // If the member already has an entry, add the amount; otherwise, initialize with the amount
    if (!memberTotal[memberName]) {
      memberTotal[memberName] = { memberId, totalAmount: 0 };
    }

    memberTotal[memberName].totalAmount += amount;
  }
  const settlements = settleBalances(memberTotal);
  console.log(settlements);

  //console.log(expenseDetails, memberTotal);
  return NextResponse.json({
    settlements,
  });
}
