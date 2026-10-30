import { CreativeBanner } from '@/widgets/creative-banner'
import { ProductShowcase } from '@/widgets/product-catalog'
import { TermsColumns } from '@/widgets/terms-columns'
import { usePageTitle } from '@/shared/lib'
import { pageMeta } from '../model/meta'
import { useSets } from '../model/useSets'
import { SetsHero, setsContent } from '../sections/hero'

export function SetsPage() {
  usePageTitle(pageMeta.title)
  const sets = useSets()
  return (
    <>
      <SetsHero />
      <ProductShowcase
        id="ready-sets"
        title={setsContent.list.title}
        items={sets.data}
        loading={sets.isLoading}
        error={sets.error}
        onRetry={sets.refetch}
        pageSize={4}
      />
      <TermsColumns />
      <CreativeBanner variant="form" id="custom-box" />
    </>
  )
}
