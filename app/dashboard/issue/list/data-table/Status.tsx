import { Issue } from "@prisma/client";
import {
  CircleCheckBigIcon,
  CircleDashedIcon,
  CircleMinusIcon,
  CircleSlashIcon,
} from "lucide-react";
import React, { ReactNode } from "react";

const icons: Record<Issue["status"], ReactNode> = {
  CANCELLED: <CircleSlashIcon className="size-5 text-red-500" />,
  DONE: <CircleCheckBigIcon className="size-5 text-green-500" />,
  IN_PROGRESS: <CircleDashedIcon className="size-5 text-blue-500" />,
  TODO: <CircleMinusIcon className="size-5 text-gray-500" />,
};

const Status = ({ status }: { status: Issue["status"] }) => {
  return (
    <span className="inline-flex gap-2 text-zinc-800">
      {icons[status]}
      {status}
    </span>
  );
};

export default Status;
