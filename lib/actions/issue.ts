'use server';

import prisma from '@/prisma/client';
import type { SearchFilters } from '@/types';

export const getIssueDetail = async (id: number) => {
  const issue = await prisma.issue.findUnique({
    where: { id },
    include: { assets: true },
  });
  return issue;
};

export const getBoardIssues = async () => {
  const issues = await prisma.issue.findMany({
    include: { assets: true, assignee: true },
  });
  return issues;
};

export const getAllIssues = async (filters: SearchFilters) => {
  const { page = 1, limit = 10, q, orderBy, sort } = filters;
  const offset = (page - 1) * limit;

  const whereClause = {
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
