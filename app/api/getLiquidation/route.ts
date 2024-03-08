import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

type ExpenseDetails = {
  [key: string]: {
    memberId: string;
    memberName: string;
    amount: number;
  };
};

type MemberTotalArray = {
  memberId: string;
  memberName: string;
  totalAmount: number;
}[];
export type Settlement = {
  fromId: string;
  fromName: string;
  toId: string;
  toName: string;
  amount: number;
};

type Member = {
  memberId: string;
  memberName: string;
  totalAmount: number;
};

type AmountToSettle = number;

function createSettlement(
  fromMember: Member,
  toMember: Member,
  amountToSettle: AmountToSettle
) {
  // ...
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

  const settlements: Settlement[] = [];

  // Create a map to store the total amount owed by each member
  const totalAmountMap: { [key: string]: number } = {};

  expenses.forEach((expense) => {
    expense.participants.forEach((participant) => {
      const memberId = participant.member.memberId;
      const amount = parseFloat(participant.amount.toString());
      totalAmountMap[memberId] = (totalAmountMap[memberId] || 0) + amount;
    });
  });

  // Generate settlements based on the total amounts
  Object.keys(totalAmountMap).forEach((fromMemberId) => {
    const fromMemberName = expenses
      .flatMap((expense) => expense.participants)
      .find((participant) => participant.member.memberId === fromMemberId)
      ?.member.name;

    if (totalAmountMap[fromMemberId] < 0) {
      Object.keys(totalAmountMap).forEach((toMemberId) => {
        if (totalAmountMap[toMemberId] > 0) {
          const settleAmount = Math.min(
            -totalAmountMap[fromMemberId],
            totalAmountMap[toMemberId]
          );

          if (settleAmount !== 0) {
            settlements.push({
              fromId: fromMemberId,
              fromName: fromMemberName!,
              toId: toMemberId,
              toName: expenses
                .flatMap((expense) => expense.participants)
                .find(
                  (participant) => participant.member.memberId === toMemberId
                )?.member.name!,
              amount: settleAmount,
            });

            totalAmountMap[fromMemberId] += settleAmount;
            totalAmountMap[toMemberId] -= settleAmount;
          }

          if (totalAmountMap[fromMemberId] === 0) {
            return;
          }
        }
      });
    }
  });

  //console.log(settlements);
  //console.log(totalAmountMap);
  await prisma.$disconnect();
  return NextResponse.json({
    settlements,
  });
}
