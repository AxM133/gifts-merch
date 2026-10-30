import { z } from 'zod'
import { callbackSchema, leadSchema, orderSchema, querySchema } from './schemas.js'
import { getProduct, listCategories, listProducts, listSets, priceOrder, similarProducts } from './services.js'

export const ORDER_NUMBER_BASE = 110000

const fieldIssues = (error) => {
  const issues = {}
  for (const issue of error.issues) {
    const key = issue.path.join('.') || '_'
    if (!(key in issues)) issues[key] = issue.message
  }
  return issues
}
const invalid = (error) => ({ status: 422, body: { error: 'validation', issues: fieldIssues(error) } })
const notFound = (message = 'Не найдено') => ({ status: 404, body: { error: 'not_found', message } })

export function createRoutes({ store }) {
  const nextOrderNumber = () => ORDER_NUMBER_BASE + store.count('orders') + 1

  return [
    { method: 'get', path: '/api/health', handler: () => ({ status: 200, body: { ok: true } }) },

    { method: 'get', path: '/api/categories', handler: () => ({ status: 200, body: listCategories() }) },

    {
      method: 'get',
      path: '/api/products',
      handler: ({ query }) => ({ status: 200, body: listProducts(querySchema.parse(query)) }),
    },
    {
      method: 'get',
      path: '/api/products/:id',
      handler: ({ params }) => {
        const product = getProduct(params.id)
        return product ? { status: 200, body: product } : notFound('Товар не найден')
      },
    },
    {
      method: 'get',
      path: '/api/products/:id/similar',
      handler: ({ params, query }) => {
        const product = getProduct(params.id)
        if (!product) return notFound('Товар не найден')
        const limit = z.coerce.number().int().min(1).max(24).catch(8).parse(query.limit)
        return { status: 200, body: similarProducts(product, limit) }
      },
    },
    { method: 'get', path: '/api/sets', handler: () => ({ status: 200, body: listSets() }) },

    {
      method: 'post',
      path: '/api/leads',
      handler: ({ body }) => {
        const parsed = leadSchema.safeParse(body)
        if (!parsed.success) return invalid(parsed.error)
        const lead = store.add('leads', { id: store.count('leads') + 1, ...parsed.data, createdAt: new Date().toISOString() })
        return { status: 201, body: { ok: true, id: lead.id } }
      },
    },

    {
      method: 'post',
      path: '/api/callbacks',
      handler: ({ body }) => {
        const parsed = callbackSchema.safeParse(body)
        if (!parsed.success) return invalid(parsed.error)
        const record = store.add('leads', {
          id: store.count('leads') + 1,
          type: 'callback',
          ...parsed.data,
          createdAt: new Date().toISOString(),
        })
        return { status: 201, body: { ok: true, id: record.id } }
      },
    },

    { method: 'get', path: '/api/orders/next-number', handler: () => ({ status: 200, body: { orderNumber: nextOrderNumber() } }) },
    {
      method: 'post',
      path: '/api/orders',
      handler: ({ body }) => {
        const parsed = orderSchema.safeParse(body)
        if (!parsed.success) return invalid(parsed.error)
        const priced = priceOrder(parsed.data.items)
        if (!priced.ok) return { status: 422, body: { error: 'invalid_items', issues: priced.issues } }
        const order = store.add('orders', {
          orderNumber: nextOrderNumber(),
          customer: parsed.data.customer,
          items: priced.lines,
          total: priced.total,
          createdAt: new Date().toISOString(),
        })
        return { status: 201, body: order }
      },
    },
  ]
}
