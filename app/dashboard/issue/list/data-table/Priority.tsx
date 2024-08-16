import type { Issue } from '@prisma/client';
import type { ReactNode } from 'react';

import { capitalize, cn } from '@/lib/utils';

const colors: Record<Issue['priority'], ReactNode> = {
  HIGH: 'bg-red-100 text-red-800',
  LOW: 'bg-green-100 text-green-800',
  MEDIUM: 'bg-yellow-100 text-yellow-800',
};

const Priority = ({ priority }: { priority: Issue['priority'] }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-2 py-0.5 text-xs',
        colors[priority],
      )}
    >
      {capitalize(priority)}
    </span>
  );
};

export default Priority;
