import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <ul className="flex gap-4">
        <li>
          <Link href="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/dashboard/issue/list">list</Link>
        </li>
        <li>
          <Link href="/dashboard/issue/board">Board</Link>
        </li>
      </ul>
    </main>
  );
}
