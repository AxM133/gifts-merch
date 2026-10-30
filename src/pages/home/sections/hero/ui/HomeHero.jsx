import { PageHero } from '@/widgets/page-hero'
import { homeContent as c } from '../model/content'
import { HeroFeatures } from './HeroFeatures'

export function HomeHero() {
  return (
    <PageHero
      title={
        <>
          {c.title[0]}
          <br />
          {c.title[1]}
        </>
      }
      text={c.text}
      media={c.media}
      extra={<HeroFeatures items={c.features} />}
      waveClassName="text-mist"
    />
  )
}
