import { beforeEach, describe, expect, it } from 'vitest'
import { categories } from './data/catalog.js'
import { allProducts, products, sets } from './data/products.js'
import { matchRoute } from './match.js'
import { ORDER_NUMBER_BASE, createRoutes } from './routes.js'
import { productSchema } from './schemas.js'
import { createMemoryStore } from './store.js'

let store
let routes
const call = async (method, path, { query = {}, body } = {}) => {
  const found = matchRoute(routes, method, path)
  if (!found) return { status: 404, body: { error: 'no route' } }
  return found.route.handler({ params: found.params, query, body })
}

beforeEach(() => {
  store = createMemoryStore()
  routes = createRoutes({ store })
})

const customer = { name: 'Максим', email: 'example@gmail.com', phone: '380909099090' }
const line = { productId: 'p-01', color: '#4a3b85', size: 'S', qty: 5 }

describe('catalogue data', () => {
  it('products and sets satisfy the schema and have unique ids', () => {
    expect(allProducts.every((p) => productSchema.safeParse(p).success)).toBe(true)
    expect(new Set(allProducts.map((p) => p.id)).size).toBe(allProducts.length)
  })

  it('every product category / subcategory is declared in the taxonomy', () => {
    const byId = new Map(categories.map((c) => [c.id, c]))
    for (const p of products) {
      expect(byId.has(p.category), p.category).toBe(true)
      if (p.subcategory) expect(byId.get(p.category).subcategories.some((s) => s.id === p.subcategory)).toBe(true)
    }
    expect(sets.every((s) => s.kind === 'set')).toBe(true)
  })
})

describe('GET /api/products', () => {
  it('returns the first page of 8 with paging info', async () => {
    const { status, body } = await call('get', '/api/products')
    expect(status).toBe(200)
    expect(body).toMatchObject({ page: 1, pageSize: 8, total: products.length, pageCount: Math.ceil(products.length / 8) })
    expect(body.items).toHaveLength(8)
  })

  it('filters by category and subcategory', async () => {
    const hoodies = (await call('get', '/api/products', { query: { category: 'tolstovki' } })).body
    expect(hoodies.total).toBe(16)
    const zip = (await call('get', '/api/products', { query: { category: 'tolstovki', sub: 'hudi-na-zamke' } })).body
    expect(zip.items.every((p) => p.subcategory === 'hudi-na-zamke')).toBe(true)
    expect(zip.total).toBeLessThan(hoodies.total)
  })

  it('searches the title case-insensitively', async () => {
    expect((await call('get', '/api/products', { query: { q: 'el012' } })).body.items.map((p) => p.id)).toEqual(['p-12'])
    expect((await call('get', '/api/products', { query: { q: 'zzzzz' } })).body).toMatchObject({ items: [], total: 0, pageCount: 1 })
  })

  it('"pages" loads several consecutive pages for "show more"', async () => {
    const { body } = await call('get', '/api/products', { query: { page: '1', pages: '2' } })
    expect(body.items).toHaveLength(16)
    expect(body.items[8].id).toBe('p-09')
  })

  it('clamps bad paging values', async () => {
    expect((await call('get', '/api/products', { query: { page: '999' } })).body.page).toBe(Math.ceil(products.length / 8))
    expect((await call('get', '/api/products', { query: { page: 'abc', pageSize: '-3' } })).body).toMatchObject({ page: 1, pageSize: 8 })
    expect((await call('get', '/api/products', { query: { pageSize: '5000' } })).body.pageSize).toBe(8)
  })
})

describe('products by id / similar / sets / categories', () => {
  it('returns a product, 404 for unknown ids', async () => {
    expect((await call('get', '/api/products/p-02')).body.id).toBe('p-02')
    expect((await call('get', '/api/products/s-01')).body.kind).toBe('set')
    expect((await call('get', '/api/products/nope')).status).toBe(404)
  })

  it('similar excludes the product, keeps the kind and prefers the same category', async () => {
    const { body } = await call('get', '/api/products/p-02/similar')
    expect(body).toHaveLength(8)
    expect(body.some((p) => p.id === 'p-02')).toBe(false)
    expect(body.every((p) => p.kind === 'product')).toBe(true)
    expect(body[0].category).toBe('tolstovki')
    expect((await call('get', '/api/products/nope/similar')).status).toBe(404)
  })

  it('lists sets and categories', async () => {
    expect((await call('get', '/api/sets')).body).toHaveLength(sets.length)
    expect((await call('get', '/api/categories')).body.map((c) => c.id)).toContain('tolstovki')
  })
})

describe('POST /api/leads', () => {
  it('stores a valid lead', async () => {
    const { status, body } = await call('post', '/api/leads', { body: { ...customer, source: 'home' } })
    expect(status).toBe(201)
    expect(body).toMatchObject({ ok: true, id: 1 })
    expect(store.all('leads')[0]).toMatchObject(customer)
  })

  it('rejects invalid data with per-field messages and stores nothing', async () => {
    const { status, body } = await call('post', '/api/leads', { body: { name: '', email: 'examplegmail.com', phone: '+380909099090' } })
    expect(status).toBe(422)
    expect(body.issues).toMatchObject({ name: 'Введите имя', email: 'Неверный формат', phone: 'Неверный формат' })
    expect(store.count('leads')).toBe(0)
  })

  it('rejects a body that is not an object', async () => {
    expect((await call('post', '/api/leads', { body: undefined })).status).toBe(422)
  })
})

describe('POST /api/callbacks', () => {
  it('stores a phone-only callback request (digits only)', async () => {
    expect((await call('post', '/api/callbacks', { body: { phone: '380630130103' } })).status).toBe(201)
    expect(store.all('leads')[0]).toMatchObject({ type: 'callback', phone: '380630130103' })
    const bad = await call('post', '/api/callbacks', { body: { phone: '+380630130103' } })
    expect(bad.status).toBe(422)
    expect(bad.body.issues.phone).toBe('Неверный формат')
  })
})

describe('orders', () => {
  it('the next order number starts at the base and follows the stored orders', async () => {
    expect((await call('get', '/api/orders/next-number')).body.orderNumber).toBe(ORDER_NUMBER_BASE + 1)
    await call('post', '/api/orders', { body: { customer, items: [line] } })
    expect((await call('get', '/api/orders/next-number')).body.orderNumber).toBe(ORDER_NUMBER_BASE + 2)
  })

  it('creates an order priced from the catalogue, ignoring client prices', async () => {
    const { status, body } = await call('post', '/api/orders', {
      body: { customer, items: [{ ...line, price: 0.01 }, { productId: 'p-09', color: '#2aa588', size: 'M', qty: 10 }] },
    })
    expect(status).toBe(201)
    const p9 = products.find((p) => p.id === 'p-09')
    expect(body.orderNumber).toBe(ORDER_NUMBER_BASE + 1)
    expect(body.items[0]).toMatchObject({ price: 76.43, lineTotal: 382.15, size: 'S' })
    expect(body.total).toBeCloseTo(382.15 + p9.price * 10, 2)
    expect(store.count('orders')).toBe(1)
  })

  it.each([
    ['unknown product', { ...line, productId: 'nope' }],
    ['unavailable colour', { ...line, color: '#123456' }],
    ['unavailable size', { ...line, size: 'XXXL' }],
    ['size for a product without sizes', { productId: 's-01', color: '#4a3b85', size: 'M', qty: 5 }],
  ])('rejects %s', async (_, item) => {
    const { status, body } = await call('post', '/api/orders', { body: { customer, items: [item] } })
    expect(status).toBe(422)
    expect(body.error).toBe('invalid_items')
    expect(store.count('orders')).toBe(0)
  })

  it('rejects a zero quantity', async () => {
    const { status } = await call('post', '/api/orders', { body: { customer, items: [{ ...line, qty: 0 }] } })
    expect(status).toBe(422)
    expect(store.count('orders')).toBe(0)
  })

  it('accepts a single piece (the minimum order is 1)', async () => {
    const { status, body } = await call('post', '/api/orders', { body: { customer, items: [{ ...line, qty: 1 }] } })
    expect(status).toBe(201)
    expect(body.items[0]).toMatchObject({ qty: 1, lineTotal: 76.43 })
  })

  it('accepts a set without a size', async () => {
    const { status } = await call('post', '/api/orders', { body: { customer, items: [{ productId: 's-01', color: '#4a3b85', size: null, qty: 5 }] } })
    expect(status).toBe(201)
  })

  it('rejects an empty cart and invalid customer data', async () => {
    expect((await call('post', '/api/orders', { body: { customer, items: [] } })).body.issues['items']).toBe('Корзина пуста')
    const bad = await call('post', '/api/orders', { body: { customer: { ...customer, phone: '12' }, items: [line] } })
    expect(bad.status).toBe(422)
    expect(bad.body.issues['customer.phone']).toBe('Неверный формат')
  })
})
