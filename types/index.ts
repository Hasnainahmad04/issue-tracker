import type { Label, Priority, Status } from '@prisma/client';

export type QueryParams = {
  sort?: 'asc' | 'desc';
  orderBy?: string;
  page?: number;
  limit?: number;
  q?: string;
};

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
};

export type Asset = {
  id: number;
  issueId: number;
  type: string;
  url: string;
  createdAt: Date;
};

export type IssueResponse = {
  data: Issue[];
  metadata: MetaData;
};
