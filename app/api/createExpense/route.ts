import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

interface MemberMap {
  [key: string]: string;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const expenseName = body.expenseName;
  const expenseAmount = parseInt(body.expenseAmount);
  const expenseLender = body.expenseLender;
  const expenseBorrower = body.expenseBorrower;
  const groupId = body.groupId;

  /* console.log(body); */
  const getMemberIds = await prisma.member.findMany({
    where: {
      groupId,
    },
    select: {
      name: true,
      memberId: true,
    },
  });
  const memberMap: MemberMap = getMemberIds.reduce((acc, member) => {
    return { ...acc, [member.name]: member.memberId };
  }, {});
  /* console.log(memberMap, expenseAmount); */
  const expense = await prisma.expense.create({
    data: {
      name: expenseName,
      groupId: groupId,
      amount: expenseAmount,
    },
    select: {
      expenseId: true,
    },
  });
  const noOfBorrowers = expenseBorrower.length;
  const dividedAmount = expenseAmount / noOfBorrowers;
  let isLenderAlsoBorrower = false;
  expenseBorrower.map((borrower: string) => {
    if (expenseLender == borrower) {
      isLenderAlsoBorrower = true;
    }
  });
  let lenderAmount = expenseAmount;
  if (isLenderAlsoBorrower) {
    lenderAmount = expenseAmount - dividedAmount;
  }

  /* console.log(dividedAmount, noOfBorrowers, isLenderAlsoBorrower, lenderAmount);*/
  console.log(expense);

  const createLender = await prisma.expenseParticipant.create({
    data: {
      expenseId: expense.expenseId,
      amount: lenderAmount,
      memberId: memberMap[expenseLender],
      isLender: true,
    },
    select: {
      id: true,
      expenseId: true,
      memberId: true,
      isLender: true,
      amount: true,
    },
  });
  console.log(createLender);
  const createPromises = expenseBorrower.map(async (borrower: string) => {
    if (expenseLender == borrower) {
    } else {
      const createBorrower = await prisma.expenseParticipant.create({
        data: {
          expenseId: expense.expenseId,
          amount: -dividedAmount,
          memberId: memberMap[borrower],
        },
        select: {
          id: true,
          expenseId: true,
          memberId: true,
          isLender: true,
          amount: true,
        },
      });
    }
  });
  await Promise.all(createPromises);

  return NextResponse.json({
    message: "Expense created",
  });
}
