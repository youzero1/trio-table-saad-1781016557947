import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]): string {
  return clsx(...inputs);
}

export function generateId(): number {
  return Date.now() + Math.floor(Math.random() * 1000);
}
