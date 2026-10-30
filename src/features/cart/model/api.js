import { z } from 'zod'
import { http } from '@/shared/api'

const orderSchema = z.object({
  orderNumber: z.number().int(),
  total: z.number(),
  createdAt: z.string(),
  items: z.array(z.object({ productId: z.string(), title: z.string(), qty: z.number(), lineTotal: z.number() }).passthrough()),
})

export async function createOrder({ customer, items }) {
  const payload = {
    customer,
    items: items.map((i) => ({ productId: i.productId, color: i.color.hex, size: i.size, qty: i.qty })),
  }
  const { data } = await http.post('/orders', payload)
  return orderSchema.parse(data)
}

export async function fetchNextOrderNumber(signal) {
  const { data } = await http.get('/orders/next-number', { signal })
  return z.object({ orderNumber: z.number().int() }).parse(data).orderNumber
}
