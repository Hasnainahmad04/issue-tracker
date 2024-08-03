import { Issue } from "@prisma/client";
import { AngryIcon, MehIcon, SmileIcon } from "lucide-react";
import React, { ReactNode } from "react";

const icons: Record<Issue["priority"], ReactNode> = {
  HIGH: <AngryIcon className="size-5 text-red-600" />,
  LOW: <SmileIcon className="size-5 text-green-500" />,
  MEDIUM: <MehIcon className="size-5 text-purple-600" />,
};

const Priority = ({ priority }: { priority: Issue["priority"] }) => {
  return (
    <span className="inline-flex gap-2">
      {icons[priority]}
      {priority}
    </span>
  );
};

export default Priority;
