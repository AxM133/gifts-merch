import { z } from 'zod'

export const cartItemSchema = z.object({
  id: z.string().min(1),
  productId: z.string().min(1),
  title: z.string().min(1),
  image: z.string().min(1),
  color: z.object({ name: z.string(), hex: z.string() }),
  size: z.string().nullable(),
  price: z.number().positive(),
  qty: z.number().int().positive(),
  minQty: z.number().int().positive(),
})

export const cartItemsSchema = z.array(cartItemSchema)
