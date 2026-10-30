import { ROUTES } from '@/shared/config'

export const footerColumns = [
  {
    title: 'Категории',
    links: [
      { label: 'Пошив', to: ROUTES.sewing },
      { label: 'Все товары', to: ROUTES.products },
      { label: 'Наборы', to: ROUTES.sets },
      { label: 'Производство', to: ROUTES.production },
    ],
  },
  {
    title: 'Информация',
    links: [
      { label: 'О нас', to: `${ROUTES.info}#about` },
      { label: 'ЧаВо', to: `${ROUTES.info}#faq` },
      { label: 'Контакты', to: `${ROUTES.info}#contacts` },
    ],
  },
]

export const callbackBlock = {
  title: 'Связаться с менеджером',
  text: 'Есть вопрос на который не нашли ответ? Оставьте контакт и наш менеджер свяжеться с вами',
}

export const legal = {
  copyright: '© 2022 . All rights reserved.',
  policy: 'Политика конфиденциальности',
}
