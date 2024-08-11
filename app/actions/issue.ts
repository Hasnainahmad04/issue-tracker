import prisma from '@/prisma/client';

export const getIssueDetail = async (id: number) => {
  const issue = await prisma.issue.findUnique({ where: { id } });
  return issue;
};

export const getAllIssues = async () => {
  const issues = await prisma.issue.findMany();
  return issues;
};
