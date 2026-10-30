import { PageHero } from '@/widgets/page-hero'
import { sewingContent as c } from '../model/content'
import { SewingHeroActions } from './SewingHeroActions'

export function SewingHero() {
  return (
    <PageHero
      breadcrumbs={c.breadcrumbs}
      title={
        <>
          {c.title[0]}
          <br />
          {c.title[1]}
        </>
      }
      text={c.text}
      actions={<SewingHeroActions />}
      media={c.media}
    />
  )
}
