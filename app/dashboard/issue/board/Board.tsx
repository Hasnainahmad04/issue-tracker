'use client';

import type { DragEndEvent } from '@dnd-kit/core';
import type { Status } from '@prisma/client';
import React, { useState } from 'react';

import useUpdateIssue from '@/hooks/issue/useUpdateIssue';
import { groupBy } from '@/lib/utils';
import type { IssueList } from '@/types';

import Column from './Column';
import { KanbanBoard, KanbanBoardContainer } from './Kanban';
import KanbanCard from './KanbanCard';
import KanbanItem from './KanbanItem';

type Props = {
  data: IssueList[];
};

const Board = ({ data }: React.PropsWithChildren<Props>) => {
  const initialState: Record<Status, IssueList[]> = {
    TODO: [],
    BACKLOG: [],
    IN_PROGRESS: [],
    DONE: [],
    CANCELLED: [],
  };
  const { mutate: updateIssueStatus } = useUpdateIssue();
  const [taskStages, setTaskStages] = useState({
    ...initialState,
    ...groupBy<IssueList, 'status'>(data, (item) => item.status),
  });

  const handleOnDragEnd = (event: DragEndEvent) => {
    const status = event.over?.id as undefined | Status | null;
    const taskId = event.active.id as string;
    const issue = event.active.data.current?.issue as IssueList;
    const prevStatus = event.active.data.current?.prevStatus as Status;

    if (status) {
      const state = { ...taskStages };
      const prevStatusState = [...state[prevStatus]];
      const updatedPrevState = prevStatusState.filter(
        (item) => item.id !== Number(taskId),
      );
      state[prevStatus] = updatedPrevState;
      state[status].push({ ...issue, status });

      setTaskStages(state);
      updateIssueStatus(
        { id: Number(taskId), data: { ...issue, status } },

        {
          onSuccess: () => {
            alert('Status Updated');
          },
          onError: () => {
            setTaskStages(taskStages);
          },
        },
      );
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
