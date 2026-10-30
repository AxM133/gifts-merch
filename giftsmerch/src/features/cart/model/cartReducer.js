export const initialCartState = { items: [], checkoutOpen: false, notice: null }

export const MAX_QTY = 100000

export function createCartItem(product, { color, size, qty } = {}) {
  const chosenColor = color ?? product.colors[0]
  const chosenSize = size === undefined ? (product.sizes?.[0] ?? null) : size
  return {
    id: [product.id, chosenColor.hex, chosenSize ?? '-'].join('|'),
    productId: product.id,
    title: product.title,
    image: product.images[0],
    color: chosenColor,
    size: chosenSize,
    price: product.price,
    qty: Math.max(qty ?? product.minQty, product.minQty),
    minQty: product.minQty,
  }
}

export function cartReducer(state, action) {
  switch (action.type) {

    case 'add': {
      const incoming = action.item
      const existing = state.items.find((i) => i.id === incoming.id)
      const line = existing ? { ...existing, qty: Math.min(existing.qty + 1, MAX_QTY) } : incoming
      const items = existing ? state.items.map((i) => (i.id === line.id ? line : i)) : [...state.items, line]
      return { ...state, items, notice: { title: line.title, color: line.color.name, size: line.size, qty: line.qty } }
    }
    case 'remove':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) }
    case 'setQty':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: Math.min(MAX_QTY, Math.max(i.minQty, Math.round(action.qty) || i.minQty)) } : i,
        ),
      }
    case 'clear':
      return { ...state, items: [] }
    case 'openCheckout':
      return { ...state, checkoutOpen: true, notice: null }
    case 'closeCheckout':
      return { ...state, checkoutOpen: false }
    case 'dismissNotice':
      return { ...state, notice: null }
    default:
      return state
  }
}

export const selectCount = (items) => items.length
export const selectTotal = (items) =>
  Math.round(items.reduce((sum, i) => sum + i.price * i.qty, 0) * 100) / 100
