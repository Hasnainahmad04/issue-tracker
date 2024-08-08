'use client';

import type { LucideIcon } from 'lucide-react';
import { LayoutDashboard, ShieldAlertIcon } from 'lucide-react';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

type NavItem = {
  title: string;
  icon: LucideIcon;
  variant: 'default' | 'ghost';
  href: LinkProps['href'];
};

const links: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    variant: 'ghost',
  },
  {
    title: 'Issues',
    href: '/dashboard/issue/list',
    icon: ShieldAlertIcon,
    variant: 'ghost',
  },
];

export function Nav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentPath = usePathname();

  const handleResize = () => {
    setIsCollapsed(window.innerWidth < 500);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex h-[calc(100vh-4rem)] flex-col gap-4 border-r py-2 data-[collapsed=true]:py-2 md:w-48"
      >
        <nav className="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link) =>
            isCollapsed ? (
              <Tooltip key={`nav-${link.title}`} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: 'icon' }),
                      'h-9 w-9',
                      link.variant === 'default' &&
                        'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                      currentPath === link.href &&
                        'bg-primary text-white hover:bg-primary hover:text-white',
                    )}
                  >
                    <link.icon className="size-4" />
                    <span className="sr-only">{link.title}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="flex items-center gap-4"
                >
                  {link.title}
                </TooltipContent>
              </Tooltip>
            ) : (
              <Link
                key={`nav-${link.title}`}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: link.variant, size: 'sm' }),
                  'justify-start',
                  currentPath === link.href &&
                    'bg-primary text-white hover:bg-primary hover:text-white',
                )}
              >
                <link.icon className="mr-2 size-4" />
                {link.title}
              </Link>
            ),
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}
