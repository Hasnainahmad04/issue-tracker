import type { Issue } from '@prisma/client';
import type { ReactNode } from 'react';

import { capitalize, cn } from '@/lib/utils';

const colors: Record<Issue['priority'], ReactNode> = {
  HIGH: 'bg-red-500',
  LOW: 'bg-green-500',
  MEDIUM: 'bg-yellow-500',
};

const Priority = ({ priority }: { priority: Issue['priority'] }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs text-white',
        colors[priority],
      )}
    >
      {capitalize(priority)}
    </span>
  );
};

export default Priority;
