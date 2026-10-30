import { cn } from '../lib'

export function Skeleton({ className }) {
  return <div aria-hidden="true" className={cn('animate-pulse rounded-lg bg-ink/10', className)} />
}
