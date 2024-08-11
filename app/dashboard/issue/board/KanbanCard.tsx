import type { Issue } from '@prisma/client';

const KanbanCard = ({ issue }: { issue: Issue }) => {
  return (
    <div className="flex rounded-lg border border-gray-500 bg-white p-3 shadow-md">
      <span className="text-lg font-semibold text-black">{issue.title}</span>
    </div>
  );
};

export default KanbanCard;
