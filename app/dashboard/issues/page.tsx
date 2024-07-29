import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const IssuesRoute = () => {
  return (
    <div className="px-6 mt-6">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-2xl font-semibold text-primary">Issues</h2>
        <Link
          href="/dashboard/create-issue"
          className={buttonVariants({
            variant: "default",
            size: "default",
            className: "bg-primary hover:bg-primary-dark",
          })}
        >
          Create new
        </Link>
      </div>
    </div>
  );
};

export default IssuesRoute;
