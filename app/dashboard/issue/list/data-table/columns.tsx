'use client';

/* eslint-disable react-hooks/rules-of-hooks */

import type { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import DeleteDialog from '@/components/DeleteDialog';
import { AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useDeleteIssue from '@/hooks/issue/useDeleteIssue';
import { formatDate } from '@/lib/utils';
import type { Issue } from '@/types';

import { DataTableColumnHeader } from './ColumnHeader';
import Priority from './Priority';
import Status from './Status';
import Title from './Title';

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader title="Task" column={column.id} />
    ),
    cell({ row }) {
      return (
        <Link
          href={`/dashboard/issue/${row.original.id}`}
        >{`TASK-${row.original.id}`}</Link>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader title="Title" column={column.id} />
    ),
    cell({ row }) {
      return (
        <Link href={`/dashboard/issue/${row.original.id}`}>
          <Title title={row.original.title} label={row.original.label} />
        </Link>
      );
    },
    enableSorting: true,
  },

  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader title="Status" column={column.id} />
    ),
    cell({ row }) {
      return <Status status={row.original.status} />;
    },
    enableSorting: false,
  },

  {
    accessorKey: 'priority',
    header: ({ column }) => (
      <DataTableColumnHeader title="Priority" column={column.id} />
    ),
    cell({ row }) {
      return <Priority priority={row.original.priority} />;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader title="Created At" column={column.id} />
    ),
    cell({ getValue }) {
      return <span>{formatDate(getValue() as string, 'en-US')}</span>;
    },
    enableSorting: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const issue = row.original;
      const { mutateAsync: deleteIssue, isPending } = useDeleteIssue();
      const router = useRouter();
      const [open, setOpen] = useState(false);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/dashboard/issue/edit/${issue.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <DeleteDialog
                title={<AlertDialogTrigger>Delete</AlertDialogTrigger>}
                onOpenChange={setOpen}
                open={open}
                issue={issue}
                loading={isPending}
                onDelete={() => {
                  deleteIssue(issue.id, {
                    onSuccess: () => {
                      setOpen(false);
                      router.refresh();
                    },
                  });
                }}
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
