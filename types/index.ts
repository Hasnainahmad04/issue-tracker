import type { Label, Priority, Status, User } from '@prisma/client';
import type { z } from 'zod';

import type { createIssueSchema, filtersSchema } from '@/lib/validators';

export type MetaData = {
  page: number;
  limit: number;
  total: number;
};

export type Issue = {
  id: number;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
  priority: Priority;
  label: Label;
  assets: Asset[];
  description: string;
  assignee: User;
  createdBy: string;
};

export type Asset = {
  id: number;
  issueId: number;
  type: string;
  url: string;
  createdAt: Date;
};

export type IssueList = Omit<Issue, 'assets'>;

export type SearchFilters = z.infer<typeof filtersSchema>;
export type IssuePayload = z.infer<typeof createIssueSchema>;
