import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  const groupId = body.groupId;
  console.log("id", groupId);
  try {
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
    console.log(groupDetails);
    await prisma.$disconnect();
    if (groupDetails == null) {
      return NextResponse.json({
        valid: false,
      });
    } else {
      return NextResponse.json({
        groupDetails,
        memberNames,
        valid: true,
      });
    }
  } catch (error) {
    console.log("error from getgroup");
  }
}
