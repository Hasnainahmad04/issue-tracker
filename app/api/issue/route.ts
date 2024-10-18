import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createIssueSchema } from '@/lib/validators';
import prisma from '@/prisma/client';

export const dynamic = 'force-dynamic';

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.flatten(), { status: 400 });
  }
  const { assets, ...issue } = validation.data;
  const newIssue = await prisma.issue.create({
    data: {
      ...issue,
      assets: { createMany: { data: assets } },
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
};
