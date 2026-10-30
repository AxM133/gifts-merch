import { BoltIcon, PhoneWavesIcon, StarIcon } from '@/shared/ui'

export const homeContent = {
  title: ['Свежее дыхание в', 'корпоративной жизни'],
  text: 'Ми вдосконалили процес замовлення продукції для того, щоб Ви і Ваша компанія сконцентрувались на основних задачах і досягали поставлених цілей.',
  media: { preset: 'girls', src: '/images/hero-girls.jpg', alt: 'Команда в вязаных шапках с логотипом' },
  features: [
    { id: 'quality', label: 'Высокое качество', accent: 'ONLY', Icon: StarIcon },
    { id: 'support', label: 'Поддержка менеджера 24/7', Icon: PhoneWavesIcon },
    { id: 'turbo', label: 'Выполнение заказа в', accent: 'TURBO-режиме', Icon: BoltIcon },
  ],
}
