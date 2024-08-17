import { Skeleton } from '@/components/ui/skeleton';

function IssuePageSkeleton() {
  return (
    <div className="p-8">
      <div className="prose mx-auto">
        <div className="mb-8 flex w-full justify-between">
          <div>
            <Skeleton className="mb-2 h-10 w-80" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex">
            <Skeleton className="mr-2 size-8" />
            <Skeleton className="size-8" />
          </div>
        </div>

        <Skeleton className="mb-4 flex aspect-video h-72 items-center justify-center rounded-md text-center">
          <svg
            className="size-36 text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
        </Skeleton>

        <div className="flex gap-4 overflow-x-auto">
          <Skeleton className="h-24 w-36 rounded-md" />
          <Skeleton className="h-24 w-36 rounded-md" />
          <Skeleton className="h-24 w-36 rounded-md" />
        </div>

        {/* Markdown content */}
        <div className="mt-8">
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="mb-2 h-4 w-3/4" />
          <Skeleton className="mb-2 h-4 w-1/2" />
          <Skeleton className="mb-2 h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  );
}

export default IssuePageSkeleton;
