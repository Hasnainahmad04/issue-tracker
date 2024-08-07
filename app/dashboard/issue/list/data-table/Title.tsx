import { capitalize } from "@/lib/utils";
import { Issue } from "@prisma/client";
import React from "react";

const Title = ({ label, title }: Pick<Issue, "title" | "label">) => {
  return (
    <div className="inline-flex gap-1 items-center">
      <span className="px-2 text-sm border rounded-lg font-semibold">
        {capitalize(label)}
      </span>
      {title}
    </div>
  );
};

export default Title;
