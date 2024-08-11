import type { UseDroppableArguments } from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';

type Props = {
  id: string;
  title: string;
  description?: React.ReactNode;
  count: number;
  data?: UseDroppableArguments['data'];
};

const Column = ({
  id,
  title,
  description,
  count,
  data,
  children,
}: React.PropsWithChildren<Props>) => {
  const { isOver, setNodeRef, active } = useDroppable({ id, data });

  return (
    <div ref={setNodeRef} className="flex flex-col px-4">
      <div className="p-3">
        <div className="flex w-full justify-between">
          <div className="flex items-center">
            <span
              className="truncate text-xs font-bold uppercase"
              title={title}
            >
              {title}
            </span>
            {!!count && (
              <span className="ml-2 rounded-full bg-cyan-500 px-2 py-1 text-xs text-white">
                {count}
              </span>
            )}
          </div>
        </div>
        {description}
      </div>
      <div
        style={{ overflowY: active ? 'unset' : 'auto' }}
        className={`column-scrollbar flex-1 rounded-md border-2 border-dashed ${isOver ? 'border-black' : 'border-transparent'}`}
      >
        <div className="mt-3 flex flex-col gap-2 p-1">{children}</div>
      </div>
    </div>
  );
};

export default Column;
