'use server';

import { auth } from '@/auth';
import prisma from '@/prisma/client';
import type { IssuePayload, SearchFilters } from '@/types';

export const getIssueDetail = async (id: number) => {
  try {
    const issue = await prisma.issue.findUnique({
      where: { id },
      include: { assets: true, assignee: true },
    });
    return issue;
  } catch (error) {
    console.error('An error occurred while retrieving issue detail', error);
  }
};

export const getBoardIssues = async () => {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error('User not authenticated');

    const issues = await prisma.issue.findMany({
      include: { assignee: true },
      where: { createdBy: { equals: session.user.id } },
    });
    return issues;
  } catch (error) {
    console.error('An error occurred while retrieving board issues', error);
  }
};

export const getAllIssues = async (filters: SearchFilters) => {
  try {
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
  } catch (error) {
    console.error('An error occurred while retrieving all issues', error);
  }
};

export const createNewIssue = async (data: IssuePayload) => {
  try {
    const { assets, ...issue } = data;
    const newIssue = await prisma.issue.create({
      data: {
        ...issue,
        assets: { createMany: { data: assets } },
      },
    });

    return newIssue;
  } catch (error) {
    console.error('An error occurred while creating new issue', error);
  }
};

export const deleteIssue = async (id: number) => {
  try {
    await prisma.issue.delete({ where: { id } });
  } catch (error) {
    console.error('An error occurred while deleting issue', error);
  }
};
