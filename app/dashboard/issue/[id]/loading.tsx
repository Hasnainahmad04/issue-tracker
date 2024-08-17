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

        <Skeleton className="mb-4 aspect-video h-72 w-full rounded-md" />

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
