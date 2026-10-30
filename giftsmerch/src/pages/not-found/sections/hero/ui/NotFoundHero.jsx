import { PageHero } from '@/widgets/page-hero'
import { Button } from '@/shared/ui'
import { notFoundContent as c } from '../model/content'

export function NotFoundHero() {
  return (
    <PageHero
      title={c.title}
      text={c.text}
      actions={
        <>
          <Button to={c.home.to} variant="brand">
            {c.home.label}
          </Button>
          <Button to={c.catalog.to} variant="soft">
            {c.catalog.label}
          </Button>
        </>
      }
    />
  )
}
