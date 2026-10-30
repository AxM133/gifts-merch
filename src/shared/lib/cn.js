import { twMerge } from 'tailwind-merge'

export function cn(...parts) {
  return twMerge(parts.flat(Infinity).filter(Boolean).join(' '))
}
