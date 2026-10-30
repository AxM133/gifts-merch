import { ColorDots, SizeSelector } from '@/entities/product'
import { usePurchase } from '@/features/cart'
import { SizeGuideButton } from '@/features/size-guide'
import { Button } from '@/shared/ui'
import { formatPrice } from '@/shared/lib'
import { productHero as h } from '../model/content'

export function ProductHeroActions({ product }) {
  const purchase = usePurchase(product)
  const hasSizes = product.sizes.length > 0
  return (
    <div>
      <p className="text-[2.3rem] leading-[1.05] font-medium">
        {h.priceLabel}
        <br />
        {formatPrice(product.price)}
      </p>
      <div className="mt-6 flex flex-wrap items-start gap-x-[3.5rem] gap-y-5">
        <ColorDots
          colors={product.colors}
          selected={purchase.color.hex}
          onSelect={(hex) => purchase.setColor(product.colors.find((c) => c.hex === hex))}
          size="lg"
          className="mt-1"
        />
        {hasSizes && (
          <>
            <SizeSelector sizes={product.sizes} value={purchase.size} onChange={purchase.setSize} />
            <SizeGuideButton className="mt-6" />
          </>
        )}
      </div>
      <div className="mt-6 flex flex-col items-start gap-3">
        <Button variant="brand" onClick={purchase.order} className="min-w-[15rem] py-[1.15rem]">
          {h.orderLabel}
        </Button>
        <span className="pl-6 text-[0.8rem] text-body">
          {h.minQtyLabel}: {product.minQty}
        </span>
      </div>
    </div>
  )
}
