import { sewingCategories } from '@/entities/category'
import { ROUTES } from '@/shared/config'

export function useCategoryTiles() {
  return sewingCategories.map((c) => ({
    id: c.slug,
    label: c.label,
    to: ROUTES.sewingItem(c.slug),
    image: '/images/mugs.jpg',
  }))
}
