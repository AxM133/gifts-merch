import { z } from 'zod'

export const PHONE_MAX_LENGTH = 15

export const sanitizePhone = (value) => String(value).replace(/\D/g, '').slice(0, PHONE_MAX_LENGTH)

export const phoneSchema = z
  .string()
  .trim()
  .min(1, { error: 'Введите телефон', abort: true })
  .regex(/^\d{9,15}$/, 'Неверный формат')

export const emailSchema = z.string().trim().min(1, { error: 'Введите почту', abort: true }).pipe(z.email('Неверный формат'))

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Введите имя').max(60, 'Слишком длинное имя'),
  email: emailSchema,
  phone: phoneSchema,
})

export const callbackSchema = z.object({ phone: phoneSchema })
