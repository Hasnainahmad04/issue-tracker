import { Suspense } from 'react';

import { getAllIssues } from '@/lib/actions/issue';
import { INITIAL_LIMIT } from '@/lib/constants';
import type { SearchFilters } from '@/types';

import { columns } from './data-table/columns';
import { DataTable } from './data-table/DataTable';
import Loading from './loading';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const IssuesRoute = async ({
  searchParams: { limit = INITIAL_LIMIT, page = 1, orderBy, sort, q },
}: {
  searchParams: SearchFilters;
}) => {
  const issues = await getAllIssues({ page, limit, orderBy, sort, q });

  if (!issues) return;

  console.log(JSON.stringify(issues, null, 4), 'list');

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-8">
        <DataTable columns={columns} {...issues} />
      </div>
    </Suspense>
  );
};

export default IssuesRoute;
