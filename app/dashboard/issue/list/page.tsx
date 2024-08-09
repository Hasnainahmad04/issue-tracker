import React from 'react';

import { INITIAL_LIMIT } from '@/lib/constants';
import { getIssues } from '@/services/issue';
import type { QueryParams } from '@/types';

import { columns } from './data-table/columns';
import { DataTable } from './data-table/DataTable';

const IssuesRoute = async ({
  searchParams: { limit = INITIAL_LIMIT, page = 1, orderBy, sort, q },
}: {
  searchParams: QueryParams;
}) => {
  const issues = await getIssues({ page, limit, orderBy, sort, q });

  return <DataTable columns={columns} {...issues} />;
};

export default IssuesRoute;
