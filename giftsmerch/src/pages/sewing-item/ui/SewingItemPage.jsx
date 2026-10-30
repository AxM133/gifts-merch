import { Navigate } from 'react-router'
import { LeadBanner } from '@/widgets/lead-banner'
import { ROUTES } from '@/shared/config'
import { usePageTitle } from '@/shared/lib'
import { pageMeta } from '../model/meta'
import { useSewingItem } from '../model/useSewingItem'
import { ProductDetails } from '../sections/details'
import { SewingItemHero } from '../sections/hero'

export function SewingItemPage() {
  const item = useSewingItem()
  usePageTitle(item ? `${pageMeta.title}: ${item.title}` : pageMeta.title)
  if (!item) return <Navigate to={ROUTES.sewing} replace />
  return (
    <>
      <SewingItemHero item={item} />
      <ProductDetails subject={item.subject} />
      <LeadBanner id="request" />
    </>
  )
}
