import { CalendarClock } from 'lucide-react';

import { Nav } from './SideNav';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <header className="h-16 border-b">
        <span className="my-4 inline-flex items-center gap-2 px-2 text-2xl font-medium">
          <CalendarClock className="size-8" />
          FixIt
        </span>
      </header>
      <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
        <Nav />
        <div className="w-full overflow-y-scroll">{children}</div>
      </div>
    </main>
  );
}
