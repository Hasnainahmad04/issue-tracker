'use client';

import type { ColumnDef } from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { MetaData } from '@/types';

import { DataTablePagination } from './DataTablePagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  metadata: MetaData;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  metadata,
}: DataTableProps<TData, TValue>) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPath = usePathname();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    enableMultiSort: false,
    manualFiltering: true,
    manualPagination: true,
    pageCount: Math.ceil(metadata.total / metadata.limit),
  });

  const debounced = useDebouncedCallback((val) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    val ? params.set('q', val) : params.delete('q');
    router.replace(`${currentPath}?${params.toString()}`);
  }, 500);

  return (
    <>
      <div className="my-2 flex w-full items-center justify-between">
        <Input
          placeholder="Filter ...."
          className="w-72"
          defaultValue={searchParams.get('q') || ''}
          onChange={(e) => debounced(e.target.value)}
        />
        <Link
          href="/dashboard/issue/new"
          className={buttonVariants({
            variant: 'default',
            size: 'default',
            className: 'bg-primary hover:bg-primary-dark',
          })}
        >
          Create new
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination metadata={metadata} />
    </>
  );
}
