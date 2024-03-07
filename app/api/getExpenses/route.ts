import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const groupId = body.groupId;
  const groupDetails = await prisma.group.findFirst({
    where: {
      groupId,
    },
    select: {
      groupId: true,
      name: true,
    },
  });

  const memberNames = await prisma.member.findMany({
    where: {
      groupId,
    },
    select: {
      name: true,
    },
  });

  const getExpenses = await prisma.expense.findMany({
    where: {
      groupId: groupDetails?.groupId,
    },
    select: {
      expenseId: true,
      name: true,
      amount: true,
      createdAt: true,
    },
  });

  const expenseMemberAmountMapping: any = {};
  const expensesWithParticipants = await Promise.all(
    getExpenses.map(async (expense) => {
      const getExpenseParticipants = await prisma.expenseParticipant.findMany({
        where: {
          expenseId: expense.expenseId,
        },
        select: {
          memberId: true,
          amount: true,
          expenseId: true,
          isLender: true,
        },
      });

      const mappedParticipants = await Promise.all(
        getExpenseParticipants.map(async (participant: any) => {
          const memberDetails = await prisma.member.findUnique({
            where: {
              memberId: participant.memberId,
            },
            select: {
              name: true,
              // add other fields as needed
            },
          });

          if (participant.isLender) {
            return {
              expenseId: expense.expenseId,
              expenseName: expense.name,
              createdAt: expense.createdAt,
              lenderName: memberDetails?.name,
              amount: expense.amount,
            };
          }
        })
      );

      // Clear the array for each expense iteration
      getExpenseParticipants.length = 0;

      expenseMemberAmountMapping[expense.expenseId] =
        mappedParticipants.filter(Boolean);
      return mappedParticipants.filter(Boolean);
    })
  );

  await Promise.all(expensesWithParticipants);

  // Flatten the array
  const flattenedArray = Object.values(expenseMemberAmountMapping).flat();

  console.log("flattenedArray", flattenedArray);
  return NextResponse.json({
    expenses: flattenedArray,
  });
}
