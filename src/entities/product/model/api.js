import { z } from 'zod'
import { http } from '@/shared/api'
import { productListSchema, productSchema } from './schema'

const pageSchema = z.object({
  items: productListSchema,
  page: z.number().int().min(1),
  pageCount: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
})

export const productApi = {

  async list(params, signal) {
    const { data } = await http.get('/products', { params, signal })
    return pageSchema.parse(data)
  },
  async get(id, signal) {
    const { data } = await http.get(`/products/${encodeURIComponent(id)}`, { signal })
    return productSchema.parse(data)
  },
  async similar(id, signal) {
    const { data } = await http.get(`/products/${encodeURIComponent(id)}/similar`, { signal })
    return productListSchema.parse(data)
  },
  async sets(signal) {
    const { data } = await http.get('/sets', { signal })
    return productListSchema.parse(data)
  },
}
