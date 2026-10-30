import { describe, expect, it } from 'vitest'
import { cn, formatPrice, normalizePhone, paginate } from '.'

describe('cn', () => {
  it('joins truthy values and flattens arrays', () => {
    expect(cn('a', false, null, ['b', undefined, 'c'], 0, 'd')).toBe('a b c d')
  })
})

describe('formatPrice', () => {
  it('formats with a dollar sign and two decimals', () => {
    expect(formatPrice(76.4)).toBe('$76.40')
    expect(formatPrice(235.8)).toBe('$235.80')
  })
})

describe('normalizePhone', () => {
  it('keeps digits and a leading plus only', () => {
    expect(normalizePhone(' +380 (63) 013-01-03 ')).toBe('+380630130103')
    expect(normalizePhone('063 013 01 03')).toBe('0630130103')
  })
})

describe('paginate', () => {
  const list = Array.from({ length: 19 }, (_, i) => i + 1)

  it('slices the requested page', () => {
    const result = paginate(list, 2, 8)
    expect(result.items).toEqual([9, 10, 11, 12, 13, 14, 15, 16])
    expect(result).toMatchObject({ page: 2, pageCount: 3, total: 19 })
  })

  it('clamps out-of-range and invalid pages', () => {
    expect(paginate(list, 99, 8).page).toBe(3)
    expect(paginate(list, 0, 8).page).toBe(1)
    expect(paginate(list, 'abc', 8).page).toBe(1)
  })

  it('always has at least one page', () => {
    expect(paginate([], 1, 8)).toMatchObject({ items: [], pageCount: 1, page: 1 })
  })
})
