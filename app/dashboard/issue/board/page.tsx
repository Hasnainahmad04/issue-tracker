import { getBoardIssues } from '@/lib/actions/issue';

import Board from './Board';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const issues = await getBoardIssues();

  return <Board data={issues || []} />;
}
