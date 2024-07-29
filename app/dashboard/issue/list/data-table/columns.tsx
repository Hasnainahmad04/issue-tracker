"use client";

import { formatDate } from "@/lib/utils";
import { Issue } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./ColumnHeader";

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader title="Task" column={column} />
    ),
    cell({ getValue }) {
      return <span>{`TASK-${getValue()}`}</span>;
    },
    enableHiding: true,
    enableSorting: true,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader title="Title" column={column} />
    ),
    enableHiding: true,
    enableSorting: true,
  },

  {
    accessorKey: "priority",
    header: ({ column }) => (
      <DataTableColumnHeader title="Priority" column={column} />
    ),
    enableSorting: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader title="Created At" column={column} />
    ),
    cell({ getValue }) {
      return <span>{formatDate(getValue() as string, "en-US")}</span>;
    },
    enableHiding: true,
    enableSorting: true,
  },
];
