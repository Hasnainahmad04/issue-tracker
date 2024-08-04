import { Issue } from "@prisma/client";
import React from "react";

const Title = ({ label, title }: Pick<Issue, "title" | "label">) => {
  const getLabel = (label: string) => {
    return label.charAt(0).toUpperCase().concat(label.slice(1).toLowerCase());
  };
  return (
    <div className="inline-flex gap-1 items-center">
      <span className="px-2 text-sm border rounded-lg font-semibold">
        {getLabel(label)}
      </span>
      {title}
    </div>
  );
};

export default Title;
