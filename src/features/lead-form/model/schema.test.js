import { describe, expect, it } from 'vitest'
import { callbackSchema, emailSchema, leadSchema, phoneSchema } from './schema'

const ok = { name: 'Максим', email: 'example@gmail.com', phone: '380909099090' }

describe('leadSchema', () => {
  it('accepts valid data and trims the name', () => {
    const result = leadSchema.safeParse({ ...ok, name: '  Максим  ' })
    expect(result.success).toBe(true)
    expect(result.data.name).toBe('Максим')
  })

  it('reports an error per field', () => {
    const result = leadSchema.safeParse({ name: '', email: '', phone: '' })
    expect(result.success).toBe(false)
    const byField = Object.fromEntries(result.error.issues.map((i) => [i.path[0], i.message]))
    expect(byField).toMatchObject({ name: 'Введите имя', email: 'Введите почту', phone: 'Введите телефон' })
  })

  it('uses "Неверный формат" for a malformed e-mail (as in the design)', () => {
    const result = leadSchema.safeParse({ ...ok, email: 'examplegmail.com' })
    expect(result.error.issues[0]).toMatchObject({ path: ['email'], message: 'Неверный формат' })
  })
})

describe('phoneSchema', () => {
  it.each(['380630130103', '0630130103', '123456789', '123456789012345'])('accepts %s', (value) => {
    expect(phoneSchema.safeParse(value).success).toBe(true)
  })

  it.each(['123', 'abcdefghij', '+380630130103', '(063) 013-01-03', '063 013 01 03', '1234567890123456', '12-34'])('rejects %s', (value) => {
    expect(phoneSchema.safeParse(value).success).toBe(false)
  })
})

describe('emailSchema / callbackSchema', () => {
  it('validates e-mail addresses', () => {
    expect(emailSchema.safeParse('a@b.co').success).toBe(true)
    expect(emailSchema.safeParse('a@b').success).toBe(false)
  })

  it('callback form needs only a phone', () => {
    expect(callbackSchema.safeParse({ phone: '380630130103' }).success).toBe(true)
    expect(callbackSchema.safeParse({ phone: '' }).success).toBe(false)
  })
})
