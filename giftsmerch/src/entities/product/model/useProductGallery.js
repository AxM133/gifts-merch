import { useCycle } from '@/shared/lib'

export function useProductGallery(product) {
  const cycle = useCycle(product.images.length)
  return { ...cycle, image: product.images[cycle.index], total: product.images.length }
}
