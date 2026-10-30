import { Button } from '@/shared/ui'
import { setsContent as c } from '../model/content'

export function SetsHeroActions() {
  return (
    <>
      <Button href={c.primary.href} variant="brand" className="min-w-[15rem] py-[1.15rem]">
        {c.primary.label}
      </Button>
      <a href={c.secondary.href} className="underline-draw text-[0.95rem] transition-colors hover:text-violet">
        {c.secondary.label}
      </a>
    </>
  )
}
