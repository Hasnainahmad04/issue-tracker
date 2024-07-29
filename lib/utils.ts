import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, locales?: Intl.LocalesArgument) {
  return new Date(dateString).toLocaleDateString(locales);
}
