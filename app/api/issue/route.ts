import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { createIssueSchema, searchParamsSchema } from '@/lib/validators';
import prisma from '@/prisma/client';

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

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const { data, error } = searchParamsSchema.safeParse(
    Object.fromEntries(searchParams),
  );
  if (error) {
    return NextResponse.json({ error: error.flatten() }, { status: 422 });
  }

  const { page = 1, limit = 10, q, orderBy, sort } = data;

  const [total, issues] = await prisma.$transaction([
    prisma.issue.count({
      where: {
        OR: q
          ? [{ title: { contains: q } }, { description: { contains: q } }]
          : undefined,
      },
    }),
    prisma.issue.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        OR: q
          ? [{ title: { contains: q } }, { description: { contains: q } }]
          : undefined,
      },
      orderBy: orderBy && sort ? { [orderBy]: sort } : { createdAt: 'desc' },
    }),
  ]);
  return NextResponse.json(
    { data: issues, metadata: { page, limit, total } },
    { status: 200 },
  );
};
