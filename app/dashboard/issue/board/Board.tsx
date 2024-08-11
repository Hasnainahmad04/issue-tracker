'use client';

import type { DragEndEvent } from '@dnd-kit/core';
import type { Issue, Status } from '@prisma/client';
import React, { useEffect, useState } from 'react';

import Column from './Column';
import { KanbanBoard, KanbanBoardContainer } from './Kanban';
import KanbanCard from './KanbanCard';
import KanbanItem from './KanbanItem';

type Props = {
  data: Issue[];
};

const Board = ({ data }: React.PropsWithChildren<Props>) => {
  const initialState: Record<Status, Issue[]> = {
    TODO: [],
    CANCELLED: [],
    IN_PROGRESS: [],
    DONE: [],
  };
  const [taskStages, setTaskStages] =
    useState<Record<Status, Issue[]>>(initialState);

  useEffect(() => {
    const stages = data.reduce((prev, curr) => {
      prev[curr.status].push(curr);
      return prev;
    }, initialState);
    setTaskStages(stages);
  }, []);

  const handleOnDragEnd = (event: DragEndEvent) => {
    const status = event.over?.id as undefined | Status | null;
    const taskId = event.active.id as string;
    const card = event.active.data.current;

    console.log({ status, taskId, card });
  };

  return (
    <KanbanBoardContainer>
      <KanbanBoard onDragEnd={handleOnDragEnd}>
        {Object.entries(taskStages).map(([status, issues]) => (
          <Column
            key={status}
            id={status}
            title={status as Status}
            count={issues.length}
          >
            {issues.map((issue) => (
              <KanbanItem key={issue.id} id={issue.id.toString()} data={issue}>
                <KanbanCard issue={issue} />
              </KanbanItem>
            ))}
          </Column>
        ))}
      </KanbanBoard>
    </KanbanBoardContainer>
  );
};

export default Board;
