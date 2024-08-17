import { getAllIssues } from '@/app/actions/issue';

import Board from './Board';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const data = await getAllIssues();

  return <Board data={data} />;
}
