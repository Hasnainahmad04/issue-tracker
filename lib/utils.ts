import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { DATE_FORMAT } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, locales?: Intl.LocalesArgument) {
  return new Date(dateString).toLocaleString(locales, DATE_FORMAT);
}

export function capitalize(label: string) {
  return label.charAt(0).toUpperCase().concat(label.slice(1).toLowerCase());
}
