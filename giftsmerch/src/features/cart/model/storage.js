import { cartItemsSchema } from './schema'

export const CART_STORAGE_KEY = 'gifts-merch:cart:v2'

export function loadCart(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = cartItemsSchema.safeParse(JSON.parse(raw))
    return parsed.success ? parsed.data : []
  } catch {
    return []
  }
}

export function saveCart(items, storage = globalThis.localStorage) {
  try {
    storage?.setItem(CART_STORAGE_KEY, JSON.stringify(items))
  } catch {}
}
