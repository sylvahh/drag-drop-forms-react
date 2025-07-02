import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getQueryKeys = (namespace: string) => ({
  create: `${namespace}/create`,
  read: ` ${namespace}/read`,
  readOne: `${namespace}/read-one`,
  update: `${namespace}/update`,
  patch: `${namespace}/patch`,
  put: `${namespace}/put`,
  delete: `${namespace}/delete`,
});

export type FromArray<T extends readonly string[]> = T[number];
