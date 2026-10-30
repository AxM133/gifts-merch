import { PageHero } from '@/widgets/page-hero'
import { setsContent as c } from '../model/content'
import { SetsHeroActions } from './SetsHeroActions'

export function SetsHero() {
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
      actions={<SetsHeroActions />}
      media={c.media}
    />
  )
}
