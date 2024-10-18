import { notFound } from 'next/navigation';

import { getIssueDetail } from '@/lib/actions/issue';

import IssueDetail from './IssueDetail';

type Props = {
  params: {
    id: string;
  };
};

const ViewTaskPage = async ({ params }: Props) => {
  const issue = await getIssueDetail(Number(params.id));

  if (!issue) return notFound();

  return (
    <div className="p-8">
      <IssueDetail issue={issue} />
    </div>
  );
};

export default ViewTaskPage;
