import type { Metadata } from "next";
import { Nav } from "./SideNav";
import { CalendarClock } from "lucide-react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <header className="border-b h-16">
        <span className="inline-flex gap-2 text-3xl items-center font-medium px-2 my-4">
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
