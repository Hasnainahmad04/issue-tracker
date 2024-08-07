import { capitalize } from "@/lib/utils";
import { Issue } from "@prisma/client";
import {
  MinusCircleIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from "lucide-react";
import { ReactNode } from "react";

const icons: Record<Issue["priority"], ReactNode> = {
  HIGH: <TrendingUpIcon className="size-5 text-red-600" />,
  LOW: <TrendingDownIcon className="size-5 text-green-500" />,
  MEDIUM: <MinusCircleIcon className="size-5 text-blue-500" />,
};

const Priority = ({ priority }: { priority: Issue["priority"] }) => {
  return (
    <span className="inline-flex gap-2">
      {icons[priority]}
      {capitalize(priority)}
    </span>
  );
};

export default Priority;
