'use client';

import type { DragEndEvent } from '@dnd-kit/core';
import type { Issue, Status } from '@prisma/client';
import React, { useState } from 'react';

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
    BACKLOG: [],
    IN_PROGRESS: [],
    DONE: [],
    CANCELLED: [],
  };
  const [taskStages, setTaskStages] = useState({
    ...initialState,
    ...Object.groupBy(data, (item) => item.status),
  });

  const handleOnDragEnd = (event: DragEndEvent) => {
    const currStatus = event.over?.id as undefined | Status | null;
    const taskId = event.active.id as string;
    const issue = event.active.data.current?.issue as Issue;
    const prevStatus = event.active.data.current?.prevStatus as Status;

    if (currStatus) {
      const state = { ...taskStages };
      const prevStatusState = [...state[prevStatus]];
      const updatedPrevState = prevStatusState.filter(
        (item) => item.id !== Number(taskId),
      );
      state[currStatus].push(issue);
      taskStages[prevStatus] = updatedPrevState;

      setTaskStages(state);
    }
  };

  return (
    <KanbanBoardContainer>
      <KanbanBoard onDragEnd={handleOnDragEnd}>
        {taskStages &&
          Object.entries(taskStages).map(([status, issues]) => (
            <Column key={status} id={status} title={status as Status}>
              {issues.map((issue) => (
                <KanbanItem
                  key={issue.id}
                  id={issue.id.toString()}
                  data={{ issue, prevStatus: status }}
                >
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
