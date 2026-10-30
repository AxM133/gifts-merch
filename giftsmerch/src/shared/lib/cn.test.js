import { describe, expect, it } from 'vitest'
import { cn } from './cn'

describe('cn (tailwind-merge)', () => {
  it('lets the caller override conflicting utilities', () => {
    expect(cn('text-[3rem] py-[1rem]', 'text-[1.25rem] py-[2rem]')).toBe('text-[1.25rem] py-[2rem]')
    expect(cn('size-6', 'size-3')).toBe('size-3')
    expect(cn('bg-ink text-white', 'bg-mint')).toBe('text-white bg-mint')
  })

  it('keeps unrelated utilities and ignores falsy parts', () => {
    expect(cn('flex', false, null, undefined, 'gap-2')).toBe('flex gap-2')
  })
})
