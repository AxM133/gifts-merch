import { z } from 'zod'

export const subcategorySchema = z.object({ id: z.string(), label: z.string() })

export const tabSchema = z.object({
  id: z.string(),
  label: z.string(),
  subcategories: z.array(subcategorySchema).default([]),
})

export const catalogNodeSchema = z.object({
  id: z.string(),
  label: z.string(),
  category: z.string().optional(),
  children: z
    .array(z.object({ id: z.string(), label: z.string(), category: z.string().optional() }))
    .default([]),
})

export const sewingCategorySchema = z.object({
  slug: z.string(),
  label: z.string(),
})
