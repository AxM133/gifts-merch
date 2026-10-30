import { ROUTES } from '@/shared/config'

export const notFoundContent = {
  title: 'Страница не найдена',
  text: 'Такой страницы нет или она переехала. Вернитесь на главную или загляните в каталог.',
  home: { label: 'На главную', to: ROUTES.home },
  catalog: { label: 'В каталог', to: ROUTES.products },
}
