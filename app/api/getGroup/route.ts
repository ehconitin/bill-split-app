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

  return NextResponse.json({
    groupDetails,
    memberNames,
  });
}
