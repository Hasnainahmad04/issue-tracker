import type { Issue } from '@/types';

const KanbanCard = ({ issue }: { issue: Issue }) => {
  return (
    <div className="divide-y rounded-lg border border-neutral-200 bg-white">
      <span className="block p-2 text-sm font-medium text-zinc-900">
        {issue.title}
      </span>
    </div>
  );
};

export default KanbanCard;
