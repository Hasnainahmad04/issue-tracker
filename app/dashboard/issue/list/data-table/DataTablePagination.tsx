import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MetaData } from "@/types";
import { useSearchParams, useRouter } from "next/navigation";
import { INITIAL_LIMIT } from "@/lib/constants";

interface DataTablePaginationProps<TData> {
  metadata: MetaData;
}

export function DataTablePagination<TData>({
  metadata,
}: DataTablePaginationProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePagination = ({
    page,
    limit,
  }: {
    page: number;
    limit: number;
  }) => {
    const newSearchParams = new URLSearchParams(
      Array.from(searchParams.entries())
    );
    newSearchParams.set("page", page.toString());
    newSearchParams.set("limit", limit.toString());

    router.push(`?${newSearchParams.toString()}`);
  };

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentLimit = Number(searchParams.get("limit")) || INITIAL_LIMIT;
  const pageCount = Math.ceil(metadata.total / currentLimit);

  const start = INITIAL_LIMIT * (currentPage - 1);
  const end = INITIAL_LIMIT * currentPage;

  return (
    <div className="flex items-center justify-between px-2 my-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Showing{" "}
        <span className="font-semibold">
          {start + 1} to {Math.min(end, metadata.total)}
        </span>
        of {metadata.total} item(s)
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${currentLimit}`}
            onValueChange={(value: any) => {
              updatePagination({ limit: Number(value), page: 1 });
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={searchParams.get("limit") || 10} />
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
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => updatePagination({ page: 1, limit: currentLimit })}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              updatePagination({ page: currentPage - 1, limit: currentLimit })
            }
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              updatePagination({ page: currentPage + 1, limit: currentLimit })
            }
            disabled={currentPage === pageCount}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              updatePagination({ page: pageCount, limit: currentLimit })
            }
            disabled={currentPage === pageCount}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
