import { Button } from '@/shared/ui'
import { sewingContent as c } from '../model/content'

export function SewingHeroActions() {
  return (
    <div className="flex flex-col items-start gap-3">
      <Button to={c.cta.to} variant="brand" className="min-w-[15rem] py-[1.15rem]">
        {c.cta.label}
      </Button>
      <span className="pl-6 text-[0.8rem] text-body">{c.minQty}</span>
    </div>
  )
}
