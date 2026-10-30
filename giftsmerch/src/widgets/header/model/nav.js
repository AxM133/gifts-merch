import { ROUTES } from '@/shared/config'

export const navItems = [
  { id: 'sets', label: 'Наборы', to: ROUTES.sets },
  { id: 'products', label: 'Все товары', to: ROUTES.products, hasMenu: true },
  { id: 'sewing', label: 'Пошив', to: ROUTES.sewing },
  { id: 'production', label: 'Производство', to: ROUTES.production },
  { id: 'info', label: 'Информация', to: ROUTES.info },
]

export const contactPhone = { label: '+380 630 130 103', href: 'tel:+380630130103' }

export const promo = {
  text: 'Шопперы со скидкой - 25%',
  image: '/images/nav-tote.jpg',
  to: `${ROUTES.products}?category=shopery`,
}

export function catalogHref(category) {
  return category ? `${ROUTES.products}?category=${category}` : ROUTES.products
}
