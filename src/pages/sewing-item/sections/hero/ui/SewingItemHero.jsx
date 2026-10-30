import { PageHero } from '@/widgets/page-hero'
import { SewingItemActions } from './SewingItemActions'
import { SewingVariants } from './SewingVariants'

export function SewingItemHero({ item }) {
  return (
    <PageHero
      breadcrumbs={item.breadcrumbs}
      title={item.title}
      text={
        <>
          {item.text}
          <SewingVariants variants={item.variants} />
        </>
      }
      actions={<SewingItemActions item={item} />}
      media={item.media}
    />
  )
}
