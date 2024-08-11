'use client';

import type { DragEndEvent } from '@dnd-kit/core';
import type { Issue } from '@prisma/client';
import React from 'react';

import Column from './Column';
import { KanbanBoard, KanbanBoardContainer } from './Kanban';
import KanbanCard from './KanbanCard';
import KanbanItem from './KanbanItem';

type Props = {
  data: Issue[];
};

const Board = ({ children, data }: React.PropsWithChildren<Props>) => {
  const taskStages = Object.groupBy(data, (item) => item.status);
  const handleOnDragEnd = (event: DragEndEvent) => {
    const status = event.over?.id as undefined | string | null;
    const taskId = event.active.id as string;
    const card = event.active.data.current;

    console.log({ status, taskId, card });
  };

  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard onDragEnd={handleOnDragEnd}>
          {Object.entries(taskStages).map(([status, issues]) => (
            <Column
              key={status}
              id={status}
              title={status}
              count={issues.length}
            >
              {issues.map((issue) => (
                <KanbanItem
                  key={issue.id}
                  id={issue.id.toString()}
                  data={issue}
                >
                  <KanbanCard issue={issue} />
                </KanbanItem>
              ))}
            </Column>
          ))}
        </KanbanBoard>
      </KanbanBoardContainer>
      {children}
    </>
  );
};

export default Board;
