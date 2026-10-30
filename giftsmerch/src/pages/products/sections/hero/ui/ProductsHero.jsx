import { PageHero } from '@/widgets/page-hero'
import { ExpandableText } from '@/shared/ui'
import { productsContent as c } from '../model/content'

export function ProductsHero() {
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
      text={
        <ExpandableText>
          <p>{c.intro}</p>
          <p className="mt-4">{c.more}</p>
        </ExpandableText>
      }
      media={c.media}
    />
  )
}
