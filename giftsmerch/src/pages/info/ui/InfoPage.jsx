import { usePageTitle } from '@/shared/lib'
import { pageMeta } from '../model/meta'
import { AboutText } from '../sections/about'
import { ContactsSection } from '../sections/contacts'
import { FaqSection } from '../sections/faq'
import { InfoHero } from '../sections/hero'

export function InfoPage() {
  usePageTitle(pageMeta.title)
  return (
    <>
      <InfoHero />
      <AboutText />
      <FaqSection />
      <ContactsSection />
    </>
  )
}
