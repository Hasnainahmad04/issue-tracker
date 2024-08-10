import prisma from '@/prisma/client';

export const getTaskDetail = async (id: number) => {
  const task = await prisma.issue.findUnique({ where: { id } });
  return task;
};
