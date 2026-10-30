import { z } from 'zod'
import { catalogNodeSchema, sewingCategorySchema, tabSchema } from './schema'

export const productTabs = z.array(tabSchema).parse([
  { id: 'all', label: 'Все товары' },
  {
    id: 'tolstovki',
    label: 'Толстовки',
    subcategories: [
      { id: 'hudi-na-zamke', label: 'Худи на замке' },
      { id: 'hudi-klassicheskie', label: 'Худи классические' },
      { id: 'hudi-oversaiz', label: 'Худи оверсайз' },
    ],
  },
  { id: 'svitshoty', label: 'Свитшоты' },
  { id: 'futbolki', label: 'Футболки' },
  { id: 'polo', label: 'Поло' },
  { id: 'zhilety', label: 'Жилетки' },
  { id: 'ryukzaki', label: 'Рюкзаки' },
  { id: 'bananki', label: 'Бананки' },
  { id: 'shopery', label: 'Эко-сумки/Шопперы' },
  { id: 'pledy', label: 'Пледы' },
  { id: 'noski', label: 'Носки' },
  { id: 'maski', label: 'Маски' },
])

export const catalogTree = z.array(catalogNodeSchema).parse([
  {
    id: 'clothes',
    label: 'Одежда',
    children: [
      { id: 'hoodie', label: 'Толстовки', category: 'tolstovki' },
      { id: 'sweatshirt', label: 'Свитшоты', category: 'svitshoty' },
      { id: 'tshirt', label: 'Футболки', category: 'futbolki' },
      { id: 'polo', label: 'Поло', category: 'polo' },
      { id: 'vest', label: 'Жилетки', category: 'zhilety' },
    ],
  },
  {
    id: 'bags',
    label: 'Сумки и аксессуары',
    children: [
      { id: 'backpack', label: 'Рюкзак', category: 'ryukzaki' },
      { id: 'tote', label: 'Сумка/Экосумка', category: 'shopery' },
      { id: 'banana', label: 'Бананка', category: 'bananki' },
      { id: 'beanie', label: 'Шапка' },
      { id: 'cap', label: 'Кепка' },
      { id: 'sleep-mask', label: 'Маска для сна', category: 'maski' },
      { id: 'face-mask', label: 'Защитная маска', category: 'maski' },
      { id: 'pins', label: 'Значки/Пины' },
      { id: 'keychains', label: 'Брелки' },
      { id: 'cardholders', label: 'Обложка на паспорт/тревелкейс/кардхолдер' },
    ],
  },
  { id: 'office', label: 'Для офиса' },
  { id: 'dishes', label: 'Посуда' },
  { id: 'leisure', label: 'Отдых', children: [{ id: 'plaids', label: 'Пледы', category: 'pledy' }] },
  { id: 'food', label: 'Вкусности' },
  { id: 'electronics', label: 'Электроника' },
])

export const sewingCategories = z.array(sewingCategorySchema).parse([
  { slug: 'hats', label: 'Шапки' },
  { slug: 'hoodie', label: 'Худи' },
  { slug: 'sweatshirt', label: 'Свитшоты' },
  { slug: 'tshirt', label: 'Футболки' },
  { slug: 'polo', label: 'Поло' },
  { slug: 'vest', label: 'Жилетки' },
  { slug: 'backpack', label: 'Рюкзаки' },
  { slug: 'tote', label: 'Шопперы' },
])
