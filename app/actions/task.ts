import prisma from '@/prisma/client';

export const getIssueDetail = async (id: number) => {
  const task = await prisma.issue.findUnique({ where: { id } });
  return task;
};
