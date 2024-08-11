import type { DragEndEvent } from '@dnd-kit/core';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import React from 'react';

export const KanbanBoardContainer = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="flex h-[100vh-64px] w-full flex-col">
      <div className="flex size-full overflow-auto p-8">{children}</div>
    </div>
  );
};

type Props = {
  onDragEnd: (event: DragEndEvent) => void;
};

export const KanbanBoard = ({
  children,
  onDragEnd,
}: React.PropsWithChildren<Props>) => {
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext onDragEnd={onDragEnd} sensors={sensors}>
      {children}
    </DndContext>
  );
};
