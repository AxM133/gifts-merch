import { PageHero } from '@/widgets/page-hero'
import { infoContent as c } from '../model/content'
import { InfoHeroLinks } from './InfoHeroLinks'

export function InfoHero() {
  return (
    <PageHero
      breadcrumbs={c.breadcrumbs}
      title={c.title}
      text={c.text.map((p) => (
        <p key={p.slice(0, 20)}>{p}</p>
      ))}
      actions={<InfoHeroLinks />}
      media={c.media}
    />
  )
}
