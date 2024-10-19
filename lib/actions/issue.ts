'use server';

import { auth } from '@/auth';
import prisma from '@/prisma/client';
import type { SearchFilters } from '@/types';

export const getIssueDetail = async (id: number) => {
  const issue = await prisma.issue.findUnique({
    where: { id },
    include: { assets: true, assignee: true },
  });
  return issue;
};

export const getBoardIssues = async () => {
  const session = await auth();
  if (!session?.user?.id) throw new Error('User not authenticated');

  const issues = await prisma.issue.findMany({
    include: { assignee: true },
    where: { createdBy: { equals: session.user.id } },
  });
  return issues;
};

export const getAllIssues = async (filters: SearchFilters) => {
  const session = await auth();
  if (!session?.user?.id) throw new Error('User not authenticated');
  const { page = 1, limit = 10, q, orderBy, sort } = filters;
  const offset = (page - 1) * limit;

  const whereClause = {
    createdBy: { equals: session.user.id },
    OR: q
      ? [{ title: { contains: q } }, { description: { contains: q } }]
      : undefined,
  };

  const [total, issues] = await prisma.$transaction([
    prisma.issue.count({ where: whereClause }),
    prisma.issue.findMany({
      include: { assignee: true },
      skip: offset,
      take: limit,
      where: whereClause,
      orderBy: orderBy && sort ? { [orderBy]: sort } : { createdAt: 'desc' },
    }),
  ]);
  return { data: issues, metadata: { page, limit, total } };
};
