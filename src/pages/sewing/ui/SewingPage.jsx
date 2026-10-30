import { CategoryGrid } from '@/widgets/category-grid'
import { TermsColumns } from '@/widgets/terms-columns'
import { usePageTitle } from '@/shared/lib'
import { pageMeta } from '../model/meta'
import { SewingHero, sewingContent } from '../sections/hero'

export function SewingPage() {
  usePageTitle(pageMeta.title)
  return (
    <>
      <SewingHero />
      <CategoryGrid title={sewingContent.grid.title} subtitle={sewingContent.grid.subtitle} />
      <TermsColumns />
    </>
  )
}
