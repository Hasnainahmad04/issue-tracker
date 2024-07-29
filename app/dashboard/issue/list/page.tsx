import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { DataTable } from "./data-table/DataTable";
import { columns } from "./data-table/columns";
import { Issue } from "@prisma/client";

const data: Issue[] = [
  {
    id: 1,
    title: "Login page error",
    description:
      "# Login Page\n\n**Users** are unable to log in using their credentials. The login button does not respond when clicked.",
    status: "TODO",
    priority: "LOW",
    label: "BUG",
    createdAt: new Date("2024-07-29T07:26:10.017Z"),
    updatedAt: new Date("2024-07-29T07:26:10.017Z"),
  },
  {
    id: 2,
    title: "Broken link on homepage",
    description:
      "The 'Contact Us' link on the homepage redirects to a 404 page",
    status: "TODO",
    priority: "LOW",
    label: "BUG",
    createdAt: new Date("2024-07-29T07:26:10.017Z"),
    updatedAt: new Date("2024-07-29T07:26:10.017Z"),
  },
];

const IssuesRoute = () => {
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
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default IssuesRoute;
