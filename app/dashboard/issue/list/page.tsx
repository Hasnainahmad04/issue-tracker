import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { DataTable } from "./data-table/DataTable";
import { columns } from "./data-table/columns";
import { Issue } from "@prisma/client";
import { getIssues } from "@/services/issue";

const IssuesRoute = async () => {
  const issues = await getIssues();

  return (
    <div className="px-6 mt-6">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-semibold text-primary">Issues</h2>
        <Link
          href="/dashboard/issue/new"
          className={buttonVariants({
            variant: "default",
            size: "default",
            className: "bg-primary hover:bg-primary-dark",
          })}
        >
          Create new
        </Link>
      </div>
      <DataTable columns={columns} data={issues} />
    </div>
  );
};

export default IssuesRoute;
