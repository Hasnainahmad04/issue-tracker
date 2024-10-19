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

export function groupBy<Type, Key extends keyof Type>(
  list: Type[],
  keyGetter: (item: Type) => Type[Key],
): Record<Key, Type[]> {
  const map = new Map<Type[Key], Type[]>();

  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });

  return Object.fromEntries(map);
}

export const getInitials = (s: string) => {
  return s
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase())
    .join('');
};
