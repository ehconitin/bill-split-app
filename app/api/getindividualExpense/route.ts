import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
const prisma = new PrismaClient();
export async function POST(req: NextRequest) {
  const body = await req.json();
  const name = body.memberName;
  const groupId = body.groupId;

  const getMemberId = await prisma.member.findFirst({
    where: {
      name: name,
      groupId: groupId,
    },
    select: {
      memberId: true,
    },
  });

  const getExpense = await prisma.expenseParticipant.findMany({
    where: {
      memberId: getMemberId?.memberId,
    },
    select: {
      amount: true,
    },
  });
  let sum = 0;
  getExpense.map((expense) => {
    console.log(expense.amount);

    sum = sum + parseFloat(expense.amount.toString());
  });
  console.log(sum);
  if (sum == 0) {
    return NextResponse.json({
      settled: true,
    });
  } else {
    return NextResponse.json({
      settled: false,
    });
  }
}
