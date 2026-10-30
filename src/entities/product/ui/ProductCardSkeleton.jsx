import { Skeleton } from '@/shared/ui'

export function ProductCardSkeleton() {
  return (
    <div data-testid="product-skeleton" className="flex w-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-card">
      <Skeleton className="aspect-[377/390] rounded-none" />
      <div className="space-y-3 px-[1.1rem] pt-4 pb-[1.4rem]">
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-3 w-2/3" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="mt-6 h-8 w-1/2" />
      </div>
    </div>
  )
}
