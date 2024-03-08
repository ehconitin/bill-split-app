import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const groupName = body.groupName;
  const members = body.members;
  const createGroup = await prisma.group.create({
    data: {
      name: groupName,
    },
    select: {
      groupId: true,
    },
  });
  const createMembersPromises = members.map(async (member: string) => {
    const createMembers = await prisma.member.create({
      data: {
        name: member,
        groupId: createGroup.groupId,
      },
    });
  });
  await Promise.all(createMembersPromises);
  await prisma.$disconnect();
  const groupId = createGroup.groupId;
  return NextResponse.json({
    groupId,
  });
}
export async function PUT(req: NextRequest) {
  const body = await req.json();
  const groupName = body.groupName;
  const members = body.members;
  const groupId = body.groupId;
  const updateGroup = await prisma.group.update({
    where: {
      groupId: groupId,
    },
    data: {
      name: groupName,
    },
    include: {
      members: true,
    },
  });
  const namesinDB: string[] = updateGroup.members.map((name) => {
    return name.name;
  });
  console.log("names in db", namesinDB);
  console.log("names recieved", members);
  const newMembers = members.filter(
    (value: string) => !namesinDB.includes(value)
  );
  const deletedMembers = namesinDB.filter(
    (value: string) => !members.includes(value)
  );
  console.log("newMember", newMembers);
  console.log("deleted members", deletedMembers);
  if (newMembers) {
    const promiseMembercreate = await newMembers.map(async (member: string) => {
      const createNewMembers = await prisma.member.create({
        data: {
          name: member,
          groupId: groupId,
        },
      });
    });
    await Promise.all(promiseMembercreate);
  }
  if (deletedMembers) {
    const promiseGetMemberId = await Promise.all(
      deletedMembers.map(async (member: string) => {
        // Find the member using the name and select memberId
        const existingMember = await prisma.member.findFirst({
          where: {
            name: member,
          },
          select: {
            memberId: true,
          },
        });

        return existingMember?.memberId; // Return memberId or undefined
      })
    );

    // Remove undefined values from the array (in case a member was not found)
    const memberIdsToDelete = promiseGetMemberId.filter(
      (memberId): memberId is string => memberId !== undefined
    );

    const promisegetExpenseId = await Promise.all(
      memberIdsToDelete.map(async (memberid) => {
        const existingParticipants = await prisma.expenseParticipant.findMany({
          where: {
            memberId: memberid,
          },
          select: {
            id: true,
          },
        });
        const expenseIds = existingParticipants.map(
          (participant) => participant.id
        );
        return expenseIds;
      })
    );
    const expenseIdsToDelete = promisegetExpenseId.flat();
    const promiseDeleteExpense = await Promise.all(
      expenseIdsToDelete.map(async (expenseId: string) => {
        await prisma.expenseParticipant.delete({
          where: {
            id: expenseId,
          },
        });
      })
    );
    await Promise.all(promiseDeleteExpense);
    const promiseDeleteMember = await Promise.all(
      memberIdsToDelete.map(async (memberId: string) => {
        // Delete the member using memberId
        await prisma.member.delete({
          where: {
            memberId: memberId,
          },
        });
      })
    );

    // Wait for all deletion promises to complete
    await Promise.all(promiseDeleteMember);
  }

  await prisma.$disconnect();
  return NextResponse.json({
    message: "updated",
    groupId,
  });
}
