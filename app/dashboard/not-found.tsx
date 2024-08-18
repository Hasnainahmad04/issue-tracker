'use client';

import Image from 'next/image';

export default function NotFound() {
  return (
    <main className="prose mx-auto mt-10 flex min-h-screen w-full flex-col items-center">
      <h1>Kiya Dhoond Ra hai ??</h1>
      <Image
        src="/not-found.gif"
        width={500}
        height={500}
        alt="server_error"
        className="aspect-video"
        unoptimized
      />
    </main>
  );
}
