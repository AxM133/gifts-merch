import { allProducts, products, sets } from './data/products.js'
import { categories } from './data/catalog.js'

const matches = (product, { category, sub, q }) => {
  if (category && category !== 'all' && product.category !== category) return false
  if (sub && product.subcategory !== sub) return false
  const needle = q?.trim().toLowerCase()
  if (needle && !`${product.title} ${product.subtitle} ${product.description}`.toLowerCase().includes(needle)) return false
  return true
}

export function listProducts({ category, sub, q, page, pages, pageSize }) {
  const filtered = products.filter((p) => matches(p, { category, sub, q }))
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const current = Math.min(page, pageCount)
  const start = (current - 1) * pageSize
  return {
    items: filtered.slice(start, start + pageSize * pages),
    page: current,
    pageCount,
    pageSize,
    total: filtered.length,
  }
}

export const getProduct = (id) => allProducts.find((p) => p.id === id)

export function similarProducts(product, limit = 8) {
  const sameKind = allProducts.filter((p) => p.id !== product.id && p.kind === product.kind)
  const same = sameKind.filter((p) => p.category === product.category)
  const rest = sameKind.filter((p) => p.category !== product.category)
  return [...same, ...rest].slice(0, limit)
}

export const listSets = () => sets
export const listCategories = () => categories

export function priceOrder(items) {
  const issues = []
  const lines = items.map((item, i) => {
    const product = getProduct(item.productId)
    if (!product) {
      issues.push({ index: i, message: `Товар не найден: ${item.productId}` })
      return null
    }
    const color = product.colors.find((c) => c.hex.toLowerCase() === item.color.toLowerCase())
    if (!color) issues.push({ index: i, message: 'Недоступный цвет' })
    if (product.sizes.length === 0 ? item.size !== null : !product.sizes.includes(item.size))
      issues.push({ index: i, message: 'Недоступный размер' })
    if (item.qty < product.minQty) issues.push({ index: i, message: `Минимальное количество: ${product.minQty}` })
    return {
      productId: product.id,
      title: product.title,
      color,
      size: item.size,
      qty: item.qty,
      price: product.price,
      lineTotal: Math.round(product.price * item.qty * 100) / 100,
    }
  })
  if (issues.length) return { ok: false, issues }
  const total = Math.round(lines.reduce((sum, l) => sum + l.lineTotal, 0) * 100) / 100
  return { ok: true, lines, total }
}
