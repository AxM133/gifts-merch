import { act, renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { usePagedList } from './usePagedList'

const items = Array.from({ length: 20 }, (_, i) => i + 1)

describe('usePagedList', () => {
  it('starts on page 1 with one page of items', () => {
    const { result } = renderHook(() => usePagedList(items, 8))
    expect(result.current.items).toHaveLength(8)
    expect(result.current.pageCount).toBe(3)
    expect(result.current.hasMore).toBe(true)
  })

  it('"show more" appends the next page, and the last page has nothing more', () => {
    const { result } = renderHook(() => usePagedList(items, 8))
    act(() => result.current.showMore())
    expect(result.current.items).toHaveLength(16)
    act(() => result.current.showMore())
    expect(result.current.items).toHaveLength(20)
    expect(result.current.hasMore).toBe(false)
  })

  it('goTo switches page and drops the extra loaded pages', () => {
    const { result } = renderHook(() => usePagedList(items, 8))
    act(() => result.current.showMore())
    act(() => result.current.goTo(3))
    expect(result.current.page).toBe(3)
    expect(result.current.items).toEqual([17, 18, 19, 20])
  })

  it('supports a controlled page', () => {
    const onPageChange = vi.fn()
    const { result } = renderHook(() => usePagedList(items, 8, { page: 2, onPageChange }))
    expect(result.current.items[0]).toBe(9)
    act(() => result.current.goTo(3))
    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('resets "show more" when resetKey changes', () => {
    const { result, rerender } = renderHook(({ k }) => usePagedList(items, 8, { resetKey: k }), {
      initialProps: { k: 'a' },
    })
    act(() => result.current.showMore())
    expect(result.current.items).toHaveLength(16)
    rerender({ k: 'b' })
    expect(result.current.items).toHaveLength(8)
  })
})
