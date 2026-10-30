import { sewingCategories } from '@/entities/category'
import { ROUTES } from '@/shared/config'

const DEFAULT_TEXT =
  'Стоимость производства брендированной продукции на заказ расчитывается индивидуально. Цена зависит от сложности работы, брендирования, материалов, тиража и срочности.'

const SPECIAL = {
  hoodie: {
    title: 'Худи классическое',
    subject: 'толстовок',
    variants: ['Худи оверсайз', 'Худи на замке'],
  },
}

export function getSewingItem(slug) {
  const category = sewingCategories.find((c) => c.slug === slug)
  if (!category) return null
  const special = SPECIAL[slug]
  return {
    slug,
    title: special?.title ?? category.label,
    subject: special?.subject ?? 'изделий',
    variants: special?.variants ?? [],
    text: DEFAULT_TEXT,
    sizes: ['XS', 'S', 'M', 'L', 'XXL'],
    minQty: 'Минимальное кол-во: 25',
    breadcrumbs: [
      { label: 'Главная', to: ROUTES.home },
      { label: 'Пошив', to: ROUTES.sewing },
      { label: category.label },
    ],
    media: { preset: 'hoodies', src: '/images/hero-hoodies.jpg', alt: category.label },
  }
}
