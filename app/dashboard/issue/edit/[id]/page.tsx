import { notFound } from 'next/navigation';

import { getIssueDetail } from '@/lib/actions/issue';
import IssueForm from '@/components/IssueForm';

type Props = {
  params: { id: string };
};

const EditIssueRoute = async ({ params }: Props) => {
  const task = await getIssueDetail(Number(params.id));
  if (!task) return notFound();

  return (
    <div className="mx-auto my-6 flex max-w-screen-sm flex-col justify-center space-y-6 rounded border bg-neutral-50 p-4">
      <h3 className="text-xl font-semibold tracking-tight">Edit Issue</h3>
      <IssueForm issue={task} />
    </div>
  );
};

export default EditIssueRoute;
