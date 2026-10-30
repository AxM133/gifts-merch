import { ROUTES } from '@/shared/config'

export const popularHeader = {
  title: 'Самое популярное',
  subtitle: 'товары, которые наиболее часто заказывают наши клиенты',
  allLabel: 'Все товары',
  allTo: ROUTES.products,
}

const shop = (category) => `${ROUTES.products}?category=${category}`

export const popularTiles = [
  { id: 'tote', label: 'Шопперы', image: '/images/tote.jpg', to: shop('shopery'), area: 'big' },
  { id: 'mugs', label: 'Кружки', image: '/images/mugs.jpg', to: ROUTES.products, area: 'wide' },
  { id: 'thermos', label: 'Термокружки', image: '/images/thermos.jpg', to: ROUTES.products, area: 'small' },
  { id: 'tshirt', label: 'Футболки', image: '/images/tshirt.jpg', to: shop('futbolki'), area: 'small' },
]
