import { z } from 'zod'

const hex = z.string().regex(/^#[0-9a-f]{6}$/i)

export const productSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string(),
  description: z.string(),
  kind: z.enum(['product', 'set']),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  price: z.number().positive(),
  minQty: z.number().int().positive(),
  colors: z.array(z.object({ name: z.string(), hex })).min(1),
  sizes: z.array(z.string()),
  images: z.array(z.string().min(1)).min(1),
  specs: z.array(z.object({ label: z.string(), value: z.string() })),
  featured: z.boolean(),
})

export const phone = z.string().trim().min(1, 'Введите телефон').regex(/^\d{9,15}$/, 'Неверный формат')
const email = z.string().trim().min(1, 'Введите почту').pipe(z.email('Неверный формат'))
const name = z.string().trim().min(2, 'Введите имя').max(60, 'Слишком длинное имя')

export const customerSchema = z.object({ name, email, phone })

export const callbackSchema = z.object({ phone })

export const leadSchema = customerSchema.extend({
  source: z.string().trim().max(60).optional(),
})

export const orderItemSchema = z.object({
  productId: z.string().min(1),
  color: hex,
  size: z.string().nullable(),
  qty: z.number().int().positive().max(100000),
})

export const orderSchema = z.object({
  customer: customerSchema,
  items: z.array(orderItemSchema).min(1, 'Корзина пуста').max(100),
})

export const querySchema = z.object({
  category: z.string().optional(),
  sub: z.string().optional(),
  q: z.string().max(100).optional(),
  page: z.coerce.number().int().min(1).catch(1),
  pages: z.coerce.number().int().min(1).max(20).catch(1),
  pageSize: z.coerce.number().int().min(1).max(50).catch(8),
})
