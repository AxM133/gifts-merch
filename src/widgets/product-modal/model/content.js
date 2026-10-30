import { productTabs } from '@/entities/category'
import { ROUTES } from '@/shared/config'

export function modalBreadcrumbs(product) {
  const tab = productTabs.find((t) => t.id === product.category)
  const crumbs = [
    { label: 'Главная', to: ROUTES.home },
    { label: 'Все товары', to: ROUTES.products },
  ]
  if (tab && tab.id !== 'all') crumbs.push({ label: tab.label, to: `${ROUTES.products}?category=${tab.id}` })
  crumbs.push({ label: product.title })
  return crumbs
}
