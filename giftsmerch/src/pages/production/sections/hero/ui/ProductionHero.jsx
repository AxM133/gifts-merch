import { PageHero } from '@/widgets/page-hero'
import { Button } from '@/shared/ui'
import { productionContent as c } from '../model/content'

export function ProductionHero() {
  return (
    <PageHero
      breadcrumbs={c.breadcrumbs}
      title={c.title.map((line) => (
        <span key={line} className="block">
          {line}
        </span>
      ))}
      text={c.text}
      actions={
        <Button to={c.cta.to} variant="brand" className="min-w-[15rem] py-[1.15rem]">
          {c.cta.label}
        </Button>
      }
      media={c.media}
    />
  )
}
