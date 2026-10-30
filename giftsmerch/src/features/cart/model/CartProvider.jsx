import { useEffect, useMemo, useReducer } from 'react'
import { CartContext } from './CartContext'
import { cartReducer, createCartItem, initialCartState, selectCount, selectTotal } from './cartReducer'
import { loadCart, saveCart } from './storage'

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState, (initial) => ({
    ...initial,
    items: loadCart(),
  }))

  useEffect(() => {
    saveCart(state.items)
  }, [state.items])

  const actions = useMemo(
    () => ({
      addProduct: (product, options) => dispatch({ type: 'add', item: createCartItem(product, options) }),
      remove: (id) => dispatch({ type: 'remove', id }),
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      clear: () => dispatch({ type: 'clear' }),
      openCheckout: () => dispatch({ type: 'openCheckout' }),
      closeCheckout: () => dispatch({ type: 'closeCheckout' }),
      dismissNotice: () => dispatch({ type: 'dismissNotice' }),
    }),
    [],
  )

  const value = useMemo(
    () => ({
      ...actions,
      items: state.items,
      count: selectCount(state.items),
      total: selectTotal(state.items),
      checkoutOpen: state.checkoutOpen,
      notice: state.notice,
    }),
    [actions, state],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
