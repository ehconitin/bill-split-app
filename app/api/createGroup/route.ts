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
  const groupId = createGroup.groupId;
  return NextResponse.json({
    groupId,
  });
}
