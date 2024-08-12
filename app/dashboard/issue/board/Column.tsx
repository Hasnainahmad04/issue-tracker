import type { UseDroppableArguments } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import type { Status } from '@prisma/client';

import { cn } from '@/lib/utils';

type Props = {
  id: string;
  title: Status;
  count: number;
  data?: UseDroppableArguments['data'];
};

const statusMetadata: Record<Status, { title: string; background: string }> = {
  TODO: { background: 'bg-green-400', title: 'Todo' },
  IN_PROGRESS: { background: 'bg-sky-500', title: 'In Progress' },
  CANCELLED: { background: 'bg-red-500', title: 'Cancelled' },
  DONE: { background: 'bg-slate-300', title: 'Done' },
};

const Column = ({
  id,
  title,
  count,
  data,
  children,
}: React.PropsWithChildren<Props>) => {
  const { isOver, setNodeRef, active } = useDroppable({ id, data });

  return (
    <div ref={setNodeRef} className="flex flex-col px-4">
      <div
        className={cn(
          'flex w-full items-center justify-between rounded-lg px-3 py-2',
          statusMetadata[title].background,
        )}
      >
        <span
          className="truncate text-xs font-bold uppercase text-white"
          title={title}
        >
          {statusMetadata[title].title}
        </span>
        {Boolean(count) && (
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-neutral-100 text-xs text-zinc-800">
            {count}
          </span>
        )}
      </div>
      <div
        style={{ overflowY: active ? 'unset' : 'auto' }}
        className={`column-scrollbar flex-1 rounded-md border-2 border-dashed ${isOver ? 'border-gray-500' : 'border-transparent'}`}
      >
        <div className="mt-3 flex flex-col gap-2 p-1">{children}</div>
      </div>
    </div>
  );
};

export default Column;