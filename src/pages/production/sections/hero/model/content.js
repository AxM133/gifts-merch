import { ROUTES } from '@/shared/config'

export const productionContent = {
  breadcrumbs: [{ label: 'Главная', to: ROUTES.home }, { label: 'Производство' }],
  title: ['Нужно создать', 'уникальный продукт', 'для вашей компании?'],
  text: 'Почему? Потому что это ощутимо и это волнует. Это вовлекает, повышает осведомленность и вызывает эмоции.',
  cta: { label: 'Написать менеджеру', to: `${ROUTES.info}#contacts` },
  media: { preset: 'woman', src: '/images/production.jpg', alt: 'Швея с катушками ниток', rounded: true },
  grid: { title: 'Мы можем создать', subtitle: 'товары, которые наиболее часто заказывают наши клиенты' },
}
