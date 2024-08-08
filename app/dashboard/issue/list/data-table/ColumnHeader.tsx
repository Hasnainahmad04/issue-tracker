'use client';

import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  column: string;
  title: string;
}

const sortFields = ['title', 'createdAt'];

export function DataTableColumnHeader({ column, title, className }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentSortOrder = searchParams.get('sort') as 'asc' | 'desc' | null;
  const currentOrderBy = searchParams.get('orderBy');

  if (!sortFields.includes(column)) {
    return <div className={cn(className)}>{title}</div>;
  }

  const handleSort = (sort: 'asc' | 'desc') => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('orderBy', column);
    newSearchParams.set('sort', sort);

    const search = newSearchParams.toString();
    router.push(`${pathname}?${search || ''}`);
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="data-[state=open]:bg-accent -ml-3 h-8"
          >
            <span>{title}</span>
            {!currentSortOrder && (
              <ChevronsUpDownIcon className="ml-2 size-4" />
            )}
            {currentOrderBy === column && currentSortOrder === 'desc' && (
              <ArrowDownIcon className="ml-2 size-4" />
            )}
            {currentOrderBy === column && currentSortOrder === 'asc' && (
              <ArrowUpIcon className="ml-2 size-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => handleSort('asc')}>
            <ArrowUpIcon className="text-muted-foreground/70 mr-2 size-3.5" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort('desc')}>
            <ArrowDownIcon className="text-muted-foreground/70 mr-2 size-3.5" />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
