import { CategoryGrid } from '@/widgets/category-grid'
import { TermsColumns } from '@/widgets/terms-columns'
import { usePageTitle } from '@/shared/lib'
import { pageMeta } from '../model/meta'
import { ProductionHero, productionContent } from '../sections/hero'

export function ProductionPage() {
  usePageTitle(pageMeta.title)
  return (
    <>
      <ProductionHero />
      <CategoryGrid title={productionContent.grid.title} subtitle={productionContent.grid.subtitle} />
      <TermsColumns />
    </>
  )
}
