import { useState } from 'react'
import { SizeSelector } from '@/entities/product'
import { SizeGuideButton } from '@/features/size-guide'
import { Button } from '@/shared/ui'
import { sewingItemHero as h } from '../model/content'

export function SewingItemActions({ item }) {
  const [size, setSize] = useState(item.sizes[0])
  return (
    <div className="flex flex-wrap items-start gap-x-[4rem] gap-y-6">
      <div className="flex flex-col items-start gap-3">
        <Button href={h.anchor} variant="brand" className="min-w-[15rem] py-[1.15rem]">
          {h.orderLabel}
        </Button>
        <span className="pl-6 text-[0.8rem] text-body">{item.minQty}</span>
      </div>
      <SizeSelector sizes={item.sizes} value={size} onChange={setSize} />
      <SizeGuideButton className="mt-6" />
    </div>
  )
}
