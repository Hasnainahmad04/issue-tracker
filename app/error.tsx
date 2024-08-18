'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="prose mx-auto flex min-h-screen w-full flex-col items-center justify-center text-center">
      <Image
        src="/server-error.svg"
        width={500}
        height={500}
        alt="server_error"
        className="size-80"
      />
      <h2>Something went wrong!</h2>
      <p className="text-lg">
        We encountered an unexpected error. Please try refreshing the page or
        come back later. If the problem persists, contact support for
        assistance.
      </p>
      <Button variant="destructive" onClick={() => reset()} className="mt-6">
        Try again
      </Button>
    </main>
  );
}
