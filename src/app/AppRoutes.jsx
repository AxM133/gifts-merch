import { Route, Routes } from 'react-router'
import { HomePage } from '@/pages/home'
import { InfoPage } from '@/pages/info'
import { NotFoundPage } from '@/pages/not-found'
import { ProductPage } from '@/pages/product'
import { ProductionPage } from '@/pages/production'
import { ProductsPage } from '@/pages/products'
import { SetsPage } from '@/pages/sets'
import { SewingItemPage } from '@/pages/sewing-item'
import { SewingPage } from '@/pages/sewing'
import { RootLayout } from './layouts/RootLayout'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="sets" element={<SetsPage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductPage />} />
        <Route path="sewing" element={<SewingPage />} />
        <Route path="sewing/:slug" element={<SewingItemPage />} />
        <Route path="production" element={<ProductionPage />} />
        <Route path="info" element={<InfoPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
