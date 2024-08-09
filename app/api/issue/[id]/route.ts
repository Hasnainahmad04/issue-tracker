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
  const updatedIssue = await prisma.issue.update({
    where: { id: Number(params.id) },
    data: validation.data,
  });

  return NextResponse.json(updatedIssue, { status: 200 });
};
