import React from "react";
import { DataTable } from "./data-table/DataTable";
import { columns } from "./data-table/columns";
import { getIssues } from "@/services/issue";
import { QueryParams } from "@/types";
import { INITIAL_LIMIT } from "@/lib/constants";

const IssuesRoute = async ({
  searchParams: { limit = INITIAL_LIMIT, page = 1, orderBy, sort, q },
}: {
  searchParams: QueryParams;
}) => {
  const issues = await getIssues({ page, limit, orderBy, sort, q });

  return (
    <div className="px-6 mt-6">
      <DataTable columns={columns} {...issues} />
    </div>
  );
};

export default IssuesRoute;
