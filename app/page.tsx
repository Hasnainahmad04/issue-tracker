import Image from 'next/image';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-50">
      <header className="flex w-full items-center justify-between border-b px-6 py-2">
        <span className="text-2xl font-bold text-primary">Fixit</span>
        <Link href="/sign-in" className={buttonVariants()}>
          Sign in
        </Link>
      </header>

      <div className="mt-10 flex w-full max-w-7xl flex-col-reverse items-center justify-between gap-10 px-10 lg:flex-row">
        <div className="space-y-4 text-center lg:w-3/5 lg:text-left">
          <h1 className="text-pretty text-4xl font-bold text-gray-800 lg:text-6xl">
            <span className="text-blue-500">Transform</span> Your Task
            Management
          </h1>
          <p className="text-lg text-gray-600">
            Organize, prioritize, and achieve your goals more efficiently.
            Simplify your workflow and focus on what matters most.
          </p>
          <Link href="/sign-in" className={buttonVariants()}>
            Get Started
          </Link>
        </div>

        <div className="flex justify-center lg:w-1/2 lg:justify-end">
          <Image
            src="/hero_icon.svg"
            width={500}
            height={500}
            alt="hero"
            className="aspect-square max-w-sm lg:max-w-full"
          />
        </div>
      </div>
    </main>
  );
}
