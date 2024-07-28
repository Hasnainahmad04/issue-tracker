"use client";

import Link, { LinkProps } from "next/link";
import {
  CalendarClock,
  LayoutDashboard,
  LucideIcon,
  ShieldAlertIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type Link = {
  title: string;
  icon: LucideIcon;
  variant: "default" | "ghost";
  href: LinkProps["href"];
};

const links: Link[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    variant: "ghost",
  },
  {
    title: "Issues",
    href: "/dashboard/issues",
    icon: ShieldAlertIcon,
    variant: "ghost",
  },
];

export function Nav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    console.log("Called");
    setIsCollapsed(window.innerWidth < 500);
  };

  return (
    <TooltipProvider>
      <div
        data-collapsed={isCollapsed}
        className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2 border-r h-[calc(100vh-4rem)] md:w-48"
      >
        <nav className="grid gap-2 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((link, index) =>
            isCollapsed ? (
              <Tooltip key={index} delayDuration={0}>
                <TooltipTrigger asChild>
                  <Link
                    href={link.href}
                    className={cn(
                      buttonVariants({ variant: link.variant, size: "icon" }),
                      "h-9 w-9",
                      link.variant === "default" &&
                        "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                      currentPath === link.href &&
                        "bg-primary text-white hover:bg-primary hover:text-white"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
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
                key={index}
                href={link.href}
                className={cn(
                  buttonVariants({ variant: link.variant, size: "sm" }),
                  "justify-start",
                  currentPath === link.href &&
                    "bg-primary text-white hover:bg-primary hover:text-white"
                )}
              >
                <link.icon className="mr-2 h-4 w-4" />
                {link.title}
              </Link>
            )
          )}
        </nav>
      </div>
    </TooltipProvider>
  );
}
