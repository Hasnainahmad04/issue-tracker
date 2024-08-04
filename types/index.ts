import { Issue } from "@prisma/client";

export type QueryParams = {
  sort?: "asc" | "desc";
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

export type IssueResponse = {
  data: Issue[];
  metadata: MetaData;
};
