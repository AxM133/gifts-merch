import { ROUTES } from '@/shared/config'

export const infoContent = {
  breadcrumbs: [{ label: 'Главная', to: ROUTES.home }, { label: 'Информация' }],
  title: 'Кто такие Gifts & Merch?',
  text: [
    'Merchy - это команда гуру творчества, со своей экспертностью в корпоративном сегменте.',
    'Мы знаем как волнителен, чаще стрессовый бывает заказ брендированной продукции и корпоративных подарков, потому, что были по обе стороны заказа. Это нам позволило изучить проблематики бизнесов и представить лучшие и современные решения для наших клиентов',
  ],
  links: [
    { label: 'Часто задаваемые вопросы', href: '#faq' },
    { label: 'Контакты', href: '#contacts' },
    { label: 'Связаться с нами', href: '#contacts' },
  ],
  media: { preset: 'team', src: '/images/team.jpg', alt: 'Команда Gifts & Merch' },
}
