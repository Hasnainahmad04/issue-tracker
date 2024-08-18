import Image from 'next/image';
import React from 'react';

const DashboardRoute = async () => {
  return (
    <div className="mt-10 flex w-full flex-col items-center">
      <Image
        src="/coming-soon.svg"
        width={500}
        height={500}
        alt="coming_soon"
        className="aspect-video"
      />
      <h1 className="mt-8 text-5xl font-semibold text-gray-800">
        Under Development
      </h1>
      <p className="mt-4 max-w-md text-center text-gray-600">
        We&apos;re working hard to bring you new features and improvements. Stay
        tuned for updates, and thank you for your patience!
      </p>
    </div>
  );
};

export default DashboardRoute;
