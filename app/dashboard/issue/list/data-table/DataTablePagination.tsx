import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { INITIAL_LIMIT } from '@/lib/constants';
import type { MetaData } from '@/types';

interface DataTablePaginationProps {
  metadata: MetaData;
}

export function DataTablePagination({ metadata }: DataTablePaginationProps) {
  const router = useRouter();
  const currentPath = usePathname();
  const searchParams = useSearchParams();

  const updatePagination = ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => {
    const newSearchParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    );
    newSearchParams.set('page', page.toString());
    newSearchParams.set('limit', limit.toString());

    router.push(`${currentPath}?${newSearchParams.toString()}`, {
      scroll: false,
    });
  };

  const currentPage = Number(searchParams.get('page')) || 1;
  const currentLimit = Number(searchParams.get('limit')) || INITIAL_LIMIT;
  const pageCount = Math.ceil(metadata.total / currentLimit);

  const start = currentLimit * (currentPage - 1);
  const end = currentLimit * currentPage;

  return (
    <div className="my-2 flex flex-col justify-between px-2 md:flex-row md:items-center">
      <div className="flex-1 text-sm">
        Showing{' '}
        <span className="font-semibold">
          {start + 1} to {Math.min(end, metadata.total)}
        </span>{' '}
        of {metadata.total} item(s)
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Limit</p>
          <Select
            value={`${currentLimit}`}
            onValueChange={(value: any) => {
              updatePagination({ limit: Number(value), page: 1 });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={searchParams.get('limit') || 10} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {pageCount}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() => updatePagination({ page: 1, limit: currentLimit })}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() =>
              updatePagination({ page: currentPage - 1, limit: currentLimit })
            }
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() =>
              updatePagination({ page: currentPage + 1, limit: currentLimit })
            }
            disabled={currentPage === pageCount}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="size-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden size-8 p-0 lg:flex"
            onClick={() =>
              updatePagination({ page: pageCount, limit: currentLimit })
            }
            disabled={currentPage === pageCount}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
