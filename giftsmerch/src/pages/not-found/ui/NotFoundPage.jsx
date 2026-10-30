import { usePageTitle } from '@/shared/lib'
import { pageMeta } from '../model/meta'
import { NotFoundHero } from '../sections/hero'

export function NotFoundPage() {
  usePageTitle(pageMeta.title)
  return <NotFoundHero />
}
