import { CartProvider } from '@/features/cart'

export function AppProviders({ children }) {
  return <CartProvider>{children}</CartProvider>
}
