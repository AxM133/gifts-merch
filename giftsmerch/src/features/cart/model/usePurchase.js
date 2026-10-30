import { useState } from 'react'
import { useCart } from './useCart'

export function usePurchase(product, { onOrdered } = {}) {
  const { addProduct, openCheckout } = useCart()
  const [color, setColor] = useState(product.colors[0])
  const [size, setSize] = useState(product.sizes[0] ?? null)

  const order = () => {
    addProduct(product, { color, size })
    openCheckout()
    onOrdered?.()
  }

  const addToCart = () => addProduct(product)

  return { color, setColor, size, setSize, order, addToCart }
}
