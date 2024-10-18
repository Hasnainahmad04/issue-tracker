import { getBoardIssues } from '@/lib/actions/issue';

import Board from './Board';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const issues = await getBoardIssues();

  console.log('issues', issues);

  return <Board data={issues} />;
}
