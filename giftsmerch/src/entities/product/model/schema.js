import { z } from 'zod'

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const colorSchema = z.object({
  name: z.string().min(1),
  hex: z.string().regex(/^#[0-9a-f]{6}$/i, 'HEX-цвет вида #aabbcc'),
})

export const productSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string(),
  description: z.string(),
  kind: z.enum(['product', 'set']).default('product'),
  category: z.string().min(1),
  subcategory: z.string().optional(),
  price: z.number().positive(),
  minQty: z.number().int().positive(),
  colors: z.array(colorSchema).min(1),
  sizes: z.array(z.enum(SIZES)),
  images: z.array(z.string().min(1)).min(1),
  specs: z.array(z.object({ label: z.string(), value: z.string() })),
  featured: z.boolean().default(false),
})

export const productListSchema = z.array(productSchema)
