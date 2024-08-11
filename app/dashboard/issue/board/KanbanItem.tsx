import type { UseDraggableArguments } from '@dnd-kit/core';
import { DragOverlay, useDraggable } from '@dnd-kit/core';

interface Props {
  id: string;
  data?: UseDraggableArguments['data'];
}

const KanbanItem = ({ children, id, data }: React.PropsWithChildren<Props>) => {
  const { attributes, listeners, setNodeRef, active } = useDraggable({
    id,
    data,
  });

  return (
    <div className="relative">
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        className="relative cursor-grab rounded-lg"
        style={{ opacity: active && active.id !== id ? 0.5 : 1 }}
      >
        {active?.id === id && (
          <DragOverlay zIndex={1000}>
            <div
              className="cursor-grabbing rounded-lg"
              style={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}
            >
              {children}
            </div>
          </DragOverlay>
        )}
        {children}
      </div>
    </div>
  );
};

export default KanbanItem;
