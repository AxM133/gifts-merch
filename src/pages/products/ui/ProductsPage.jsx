import { LeadBanner } from '@/widgets/lead-banner'
import { ProductCatalog } from '@/widgets/product-catalog'
import { usePageTitle } from '@/shared/lib'
import { pageMeta } from '../model/meta'
import { ProductsHero } from '../sections/hero'

export function ProductsPage() {
  usePageTitle(pageMeta.title)
  return (
    <>
      <ProductsHero />
      <ProductCatalog />
      <LeadBanner variant="plain" />
    </>
  )
}
