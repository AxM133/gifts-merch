import { beforeEach, describe, expect, it } from 'vitest'
import { products } from '@/test/fixtures'
import { MAX_QTY, cartReducer, createCartItem, initialCartState, selectCount, selectTotal } from './cartReducer'
import { CART_STORAGE_KEY, loadCart, saveCart } from './storage'

const [p1, p2] = products

describe('createCartItem', () => {
  it('uses the first colour/size and the minimum quantity by default', () => {
    const item = createCartItem(p1)
    expect(item).toMatchObject({ productId: p1.id, color: p1.colors[0], size: p1.sizes[0], qty: p1.minQty, price: p1.price })
  })

  it('never goes below the minimum quantity', () => {
    expect(createCartItem(p1, { qty: 1 }).qty).toBe(p1.minQty)
    expect(createCartItem(p1, { qty: 12 }).qty).toBe(12)
  })

  it('gives different lines for different colours and sizes', () => {
    const a = createCartItem(p1, { color: p1.colors[0], size: 'S' })
    const b = createCartItem(p1, { color: p1.colors[1], size: 'S' })
    const c = createCartItem(p1, { color: p1.colors[0], size: 'M' })
    expect(new Set([a.id, b.id, c.id]).size).toBe(3)
  })

  it('supports products without sizes', () => {
    expect(createCartItem({ ...p1, sizes: [] }).size).toBeNull()
  })
})

describe('cartReducer', () => {
  const add = (state, product, opts) => cartReducer(state, { type: 'add', item: createCartItem(product, opts) })

  it('adds an item at the minimum quantity and raises a notice describing the position', () => {
    const state = add(initialCartState, p1)
    expect(state.items).toHaveLength(1)
    expect(state.items[0].qty).toBe(p1.minQty)
    expect(state.notice).toEqual({ title: p1.title, color: p1.colors[0].name, size: p1.sizes[0], qty: p1.minQty })
  })

  it('RULE: adding the same position again adds exactly 1 piece', () => {
    let state = add(initialCartState, p1)
    state = add(state, p1)
    state = add(state, p1)
    expect(state.items).toHaveLength(1)
    expect(state.items[0].qty).toBe(p1.minQty + 2)
    expect(state.notice.qty).toBe(p1.minQty + 2)
  })

  it('a different colour or size is a separate position that starts at the minimum', () => {
    const state = add(add(initialCartState, p1, { color: p1.colors[0] }), p1, { color: p1.colors[1] })
    expect(state.items.map((i) => i.qty)).toEqual([p1.minQty, p1.minQty])
  })

  it('never exceeds MAX_QTY', () => {
    const base = add(initialCartState, p1)
    const maxed = cartReducer(base, { type: 'setQty', id: base.items[0].id, qty: 10 ** 9 })
    expect(maxed.items[0].qty).toBe(MAX_QTY)
    expect(add(maxed, p1).items[0].qty).toBe(MAX_QTY)
  })

  it('keeps different products as separate lines', () => {
    expect(add(add(initialCartState, p1), p2).items).toHaveLength(2)
  })

  it('setQty respects the minimum and rounds', () => {
    const state = add(initialCartState, p1)
    const id = state.items[0].id
    expect(cartReducer(state, { type: 'setQty', id, qty: 9 }).items[0].qty).toBe(9)
    expect(cartReducer(state, { type: 'setQty', id, qty: 1 }).items[0].qty).toBe(p1.minQty)
    expect(cartReducer(state, { type: 'setQty', id, qty: Number.NaN }).items[0].qty).toBe(p1.minQty)
  })

  it('removes and clears', () => {
    const state = add(add(initialCartState, p1), p2)
    expect(cartReducer(state, { type: 'remove', id: state.items[0].id }).items).toHaveLength(1)
    expect(cartReducer(state, { type: 'clear' }).items).toEqual([])
  })

  it('opening checkout dismisses the notice; closing keeps the items', () => {
    const state = cartReducer(add(initialCartState, p1), { type: 'openCheckout' })
    expect(state).toMatchObject({ checkoutOpen: true, notice: null })
    const closed = cartReducer(state, { type: 'closeCheckout' })
    expect(closed.checkoutOpen).toBe(false)
    expect(closed.items).toHaveLength(1)
  })

  it('ignores unknown actions', () => {
    expect(cartReducer(initialCartState, { type: 'whatever' })).toBe(initialCartState)
  })
})

describe('selectors', () => {
  it('count is the number of positions, total sums price x qty', () => {
    const items = [createCartItem(p1, { qty: 5 }), createCartItem(p2, { qty: 10 })]
    expect(selectCount(items)).toBe(2)
    expect(selectTotal(items)).toBeCloseTo(p1.price * 5 + p2.price * 10, 2)
  })
})

describe('cart storage', () => {
  beforeEach(() => localStorage.clear())

  it('round-trips a cart', () => {
    const items = [createCartItem(p1)]
    saveCart(items)
    expect(loadCart()).toEqual(items)
  })

  it('ignores corrupted JSON and data that fails the zod schema', () => {
    localStorage.setItem(CART_STORAGE_KEY, '{oops')
    expect(loadCart()).toEqual([])
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([{ id: 'x', qty: -1 }]))
    expect(loadCart()).toEqual([])
  })

  it('returns an empty cart when nothing is stored', () => {
    expect(loadCart()).toEqual([])
  })

  it('survives a storage that throws', () => {
    const broken = {
      getItem: () => {
        throw new Error('denied')
      },
      setItem: () => {
        throw new Error('denied')
      },
    }
    expect(loadCart(broken)).toEqual([])
    expect(() => saveCart([], broken)).not.toThrow()
  })
})
