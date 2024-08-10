import { notFound } from 'next/navigation';

import { getIssueDetail } from '@/app/actions/task';

import IssueDetail from './IssueDetail';

type Props = {
  params: {
    id: string;
  };
};

const ViewTaskPage = async ({ params }: Props) => {
  const issue = await getIssueDetail(Number(params.id));

  if (!issue) return notFound();

  return <IssueDetail issue={issue} />;
};

export default ViewTaskPage;
