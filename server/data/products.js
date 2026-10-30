import { PLAN } from './catalog.js'

const TITLE = 'EL003 Elleven Checkpoint-Friendly Compu-Backpack'
const DESCRIPTION =
  'This exclusive design has a designated laptop-only section that unfolds to lay flat on the X-ray belt to increase your speed, convenience and security. (Pens, Laptop and other devices shown are not included)'

const COLORS = [
  { name: 'Фиолетовый', hex: '#4a3b85' },
  { name: 'Зелёный', hex: '#2aa588' },
  { name: 'Белый', hex: '#eeeeee' },
]

const SPECS = [
  { label: 'Материал', value: '100% хлопок' },
  { label: 'Нанесение', value: 'вышивка, термопечать' },
  { label: 'Торговая марка', value: '100% хлопок' },
  { label: 'Плотность, г/м', value: '150' },
]

const SIZES = ['XS', 'S', 'M', 'L', 'XXL']
const SUBCATEGORIES = ['hudi-na-zamke', 'hudi-klassicheskie', 'hudi-oversaiz']

const hoodie = (n) => `/images/hoodie-${((n - 1) % 8) + 1}.jpg`

function buildProducts() {
  const items = []
  let n = 0
  for (const [category, count] of PLAN) {
    for (let i = 0; i < count; i += 1) {
      n += 1
      const num = String(n).padStart(2, '0')
      items.push({
        id: `p-${num}`,
        title: n <= 8 ? TITLE : `EL0${num} ${TITLE.split(' ').slice(1).join(' ')}`,
        subtitle: 'EL003 Elleven Checkpoint-Friendly Compu-Backpack',
        description: DESCRIPTION,
        kind: 'product',
        category,
        subcategory: category === 'tolstovki' ? SUBCATEGORIES[i % SUBCATEGORIES.length] : undefined,
        price: n <= 8 ? 76.43 : Math.round((58 + ((n * 7.3) % 41)) * 100) / 100,
        minQty: 1,
        colors: COLORS,
        sizes: SIZES,
        images: Array.from({ length: 7 }, (_, k) => hoodie(n + k)),
        specs: SPECS,
        featured: n === 2,
      })
    }
  }
  return items
}

function buildSets() {
  return Array.from({ length: 8 }, (_, i) => ({
    id: `s-${String(i + 1).padStart(2, '0')}`,
    title: TITLE,
    subtitle: 'EL003 Elleven Checkpoint-Friendly Compu-Backpack',
    description: DESCRIPTION,
    kind: 'set',
    category: 'sets',
    price: 76.43,
    minQty: 1,
    colors: COLORS,
    sizes: [],
    images: Array.from({ length: 4 }, (_, k) => `/images/set-${((i + k) % 4) + 1}.jpg`),
    specs: SPECS,
    featured: false,
  }))
}

export const products = buildProducts()
export const sets = buildSets()
export const allProducts = [...products, ...sets]
