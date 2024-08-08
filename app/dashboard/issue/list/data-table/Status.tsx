import type { Issue } from '@prisma/client';
import {
  CircleCheckBigIcon,
  CircleDashedIcon,
  CircleEllipsisIcon,
  CircleSlashIcon,
} from 'lucide-react';
import type { ReactNode } from 'react';
import React from 'react';

import { capitalize } from '@/lib/utils';

const icons: Record<Issue['status'], ReactNode> = {
  CANCELLED: <CircleSlashIcon className="size-5 text-red-500" />,
  DONE: <CircleCheckBigIcon className="size-5 text-green-500" />,
  IN_PROGRESS: <CircleDashedIcon className="size-5 text-blue-500" />,
  TODO: <CircleEllipsisIcon className="size-5 text-neutral-600" />,
};

const Status = ({ status }: { status: Issue['status'] }) => {
  return (
    <span className="inline-flex gap-2 text-zinc-800">
      {icons[status]}
      {capitalize(status)}
    </span>
  );
};

export default Status;
