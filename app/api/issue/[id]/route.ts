import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createIssueSchema } from '@/lib/validators';
import prisma from '@/prisma/client';

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.flatten(), { status: 400 });
  }
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { assets, ...issue } = validation.data;
  const updatedIssue = await prisma.issue.update({
    where: { id: Number(params.id) },
    data: issue,
  });

  return NextResponse.json(updatedIssue, { status: 200 });
};

export const DELETE = async (
  _req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    await prisma.issue.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
};
