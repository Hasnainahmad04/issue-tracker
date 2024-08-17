import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';

import { TableSkeleton } from './skeletons';

const Loading = () => {
  return (
    <div className="p-8">
      <div className="my-2 flex w-full items-center justify-between">
        <Skeleton className="h-10 w-72 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-lg" />
      </div>
      <div className="rounded-lg border">
        <TableSkeleton />
      </div>
    </div>
  );
};

export default Loading;
