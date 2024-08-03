import { createIssueSchema } from "@/lib/validators";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.flatten(), { status: 400 });
  }
  const newIssue = await prisma.issue.create({
    data: validation.data,
  });

  return NextResponse.json(newIssue, { status: 201 });
};

export const GET = async () => {
  const issueList = await prisma.issue.findMany();
  return NextResponse.json(issueList, { status: 200 });
};
