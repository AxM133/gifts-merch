import { ROUTES } from '@/shared/config'

export const creativeContent = {
  cta: {
    title: 'Хотите удивить ваших коллег/партнеров необычными подарками?',
    text: 'Выбирайте готовые подарочные наборы или укажите критерии по которым мы соберем для Вас уникальный бокс.',
    primary: { label: 'Перейти к наборам', to: ROUTES.sets },
    secondary: { label: 'Создать свой', to: `${ROUTES.sets}#custom-box` },
  },
  form: {
    title: 'Как создать бокс по Вашей идее?',
    text: 'У вас своя уникальная идея для бокса или хотите все стилизовать к одному виду?',
    lead: 'Введите свои контактные данные, и наш менеджер свяжется с Вами',
    leadAccent: 'в течении 15 минут',
    successText: 'Менеджер свяжется с вами в течение 15 минут.',
  },
}

export const creativeAssets = {
  logo: '/images/creative-logo.png',
  box: '/images/creative-box.png',
}
