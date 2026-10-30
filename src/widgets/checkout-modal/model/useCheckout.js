import { useState } from 'react'
import { createOrder, fetchNextOrderNumber, useCart } from '@/features/cart'
import { useQuery } from '@/shared/lib'

export function useCheckout() {
  const cart = useCart()
  const [placed, setPlaced] = useState(null)

  const next = useQuery(`next-order|${cart.items.length}`, (signal) => fetchNextOrderNumber(signal), {
    enabled: cart.checkoutOpen && !placed && cart.items.length > 0,
    keepPrevious: true,
  })

  const submitOrder = (customer) => createOrder({ customer, items: cart.items })

  const onPlaced = (order) => {
    setPlaced(order)
    cart.clear()
  }

  const close = () => {
    cart.closeCheckout()

    setTimeout(() => setPlaced(null), 350)
  }

  return {
    ...cart,
    placed,
    orderNumber: next.data,
    submitOrder,
    onPlaced,
    close,
    isEmpty: cart.items.length === 0,
    pieces: cart.items.reduce((sum, i) => sum + i.qty, 0),
  }
}
