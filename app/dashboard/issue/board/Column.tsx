import type { UseDroppableArguments } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import type { Status } from '@prisma/client';

import { cn } from '@/lib/utils';

type Props = {
  id: string;
  title: Status;
  data?: UseDroppableArguments['data'];
};

const statusMetadata: Record<Status, { title: string; background: string }> = {
  TODO: { background: 'bg-neutral-100 text-neutral-800', title: 'Todo' },
  IN_PROGRESS: { background: 'bg-sky-100 text-sky-800', title: 'In Progress' },
  CANCELLED: { background: 'bg-red-100 text-red-800', title: 'Cancelled' },
  DONE: { background: 'bg-green-100 text-green-800', title: 'Done' },
  BACKLOG: { background: 'bg-yellow-100 text-yellow-800', title: 'Backlog' },
};

const Column = ({
  id,
  title,
  data,
  children,
}: React.PropsWithChildren<Props>) => {
  const { isOver, setNodeRef, active } = useDroppable({ id, data });

  return (
    <div ref={setNodeRef} className="flex w-96 flex-col px-4">
      <div
        className={cn(
          'flex w-full items-center justify-between rounded-lg px-3 py-2',
          statusMetadata[title].background,
        )}
      >
        <span className="truncate text-xs font-bold uppercase" title={title}>
          {statusMetadata[title].title}
        </span>
      </div>
      <div
        style={{ overflowY: active ? 'unset' : 'auto' }}
        className={`column-scrollbar flex h-screen flex-col gap-2 rounded-md border-2 border-dashed p-1 ${isOver ? 'border-gray-500' : 'border-transparent'}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Column;
