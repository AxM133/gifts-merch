import { CreativeBanner } from '@/widgets/creative-banner'
import { LeadBanner } from '@/widgets/lead-banner'
import { usePageTitle } from '@/shared/lib'
import { pageMeta } from '../model/meta'
import { CustomProduction } from '../sections/custom-production'
import { HomeHero } from '../sections/hero'
import { Partners } from '../sections/partners'
import { PopularProducts } from '../sections/popular-products'

export function HomePage() {
  usePageTitle(pageMeta.title)
  return (
    <>
      <HomeHero />
      <PopularProducts />
      <CreativeBanner />
      <CustomProduction />
      <LeadBanner />
      <Partners />
    </>
  )
}
