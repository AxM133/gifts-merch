import { Outlet, useLocation } from 'react-router'
import { CartFab } from '@/features/cart'
import { CheckoutModal } from '@/widgets/checkout-modal'
import { Footer } from '@/widgets/footer'
import { Header } from '@/widgets/header'
import { ProductModal } from '@/widgets/product-modal'
import { ScrollManager } from './ScrollManager'

export function RootLayout() {
  const { pathname } = useLocation()
  return (
    <div className="relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
      >
        К содержимому
      </a>
      <Header />
      <main id="main" key={pathname} className="animate-fade-in">
        <Outlet />
      </main>
      <Footer />
      <ProductModal />
      <CheckoutModal />
      <CartFab />
      <ScrollManager />
    </div>
  )
}
