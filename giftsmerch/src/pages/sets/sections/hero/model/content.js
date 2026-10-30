import { ROUTES } from '@/shared/config'

export const setsContent = {
  breadcrumbs: [{ label: 'Главная', to: ROUTES.home }, { label: 'Наборы' }],
  title: ['Подарочные наборы', 'это необычные......'],
  text: 'Почему? Потому что это ощутимо и это волнует. Это вовлекает, повышает осведомленность и вызывает эмоции.',
  primary: { label: 'Выбрать готовый бокс', href: '#ready-sets' },
  secondary: { label: 'Создать свой', href: '#custom-box' },
  media: { preset: 'box', src: '/images/sets-hero.jpg', alt: 'Подарочные боксы' },
  list: { title: 'Готовые наборы' },
}
