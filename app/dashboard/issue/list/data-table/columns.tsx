"use client";

import { formatDate } from "@/lib/utils";
import { Issue } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./ColumnHeader";
import Status from "./Status";
import Priority from "./Priority";
import Title from "./Title";

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader title="Task" column={column.id} />
    ),
    cell({ getValue }) {
      return <span>{`TASK-${getValue()}`}</span>;
    },
    enableSorting: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader title="Title" column={column.id} />
    ),
    cell({ row }) {
      return <Title title={row.original.title} label={row.original.label} />;
    },
    enableSorting: true,
  },

  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader title="Status" column={column.id} />
    ),
    cell({ row }) {
      return <Status status={row.original.status} />;
    },
    enableSorting: false,
  },

  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader title="Priority" column={column.id} />
    ),
    cell({ row }) {
      return <Priority priority={row.original.priority} />;
    },
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader title="Created At" column={column.id} />
    ),
    cell({ getValue }) {
      return <span>{formatDate(getValue() as string, "en-US")}</span>;
    },
    enableSorting: true,
  },
];
