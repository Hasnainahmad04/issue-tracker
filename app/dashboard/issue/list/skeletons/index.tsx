import React from 'react';

import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const TableRowSkeleton = () => {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="h-5 w-16" />
      </TableCell>
      <TableCell>
        <div className="inline-flex items-center gap-2">
          <Skeleton className="h-5 w-12 rounded-lg" />
          <Skeleton className="h-5 w-48 rounded-sm" />
        </div>
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-24 rounded-sm" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-10 rounded-sm" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-5 w-40 rounded-sm" />
      </TableCell>
      <TableCell>
        <Skeleton className="size-10 rounded-full" />
      </TableCell>
    </TableRow>
  );
};

export const TableSkeleton = () => {
  return (
    <Table className="w-full table-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Task</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Assignee</TableHead>
          <TableHead />
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRowSkeleton key={index} />
          ))}
      </TableBody>
    </Table>
  );
};
