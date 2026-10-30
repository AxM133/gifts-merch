import { ColorDots, SizeSelector } from '@/entities/product'
import { usePurchase } from '@/features/cart'
import { SizeChartTable, SizeGuideButton } from '@/features/size-guide'
import { Accordion, Breadcrumbs, Button } from '@/shared/ui'
import { formatPrice } from '@/shared/lib'
import { modalBreadcrumbs } from '../model/content'

export function ModalInfo({ product, onClose }) {
  const purchase = usePurchase(product, { onOrdered: onClose })
  const hasSizes = product.sizes.length > 0

  return (
    <div className="min-w-0">
      <Breadcrumbs items={modalBreadcrumbs(product)} className="max-w-[34rem] pr-12 text-[0.6rem]" />
      <h2 className="mt-4 max-w-[28rem] text-[1.85rem] leading-[1.15] font-bold uppercase">{product.title}</h2>
      <ColorDots
        colors={product.colors}
        selected={purchase.color.hex}
        onSelect={(hex) => purchase.setColor(product.colors.find((c) => c.hex === hex))}
        size="lg"
        className="mt-5"
      />
      <p className="mt-8 text-[1.3rem] font-medium">From Price {formatPrice(product.price)}</p>
      <p className="mt-2 max-w-[22rem] text-[0.8rem] leading-snug text-body">{product.description}</p>

      <div className="mt-9 grid gap-8 md:grid-cols-[1fr_1fr]">
        <div className="space-y-4">
          {hasSizes && (
            <>
              <SizeSelector sizes={product.sizes} value={purchase.size} onChange={purchase.setSize} />
              <SizeGuideButton />
            </>
          )}
          <Button variant="brand" onClick={purchase.order} className="mt-2 min-w-[14rem] py-[1.1rem]">
            Заказать
          </Button>
        </div>
        <Accordion
          defaultOpen={['specs']}
          items={[
            {
              id: 'specs',
              title: 'Характеристики',
              content: (
                <dl className="text-[0.75rem]">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="grid grid-cols-[1fr_1fr] border-b border-brand/70 py-2 last:border-0">
                      <dt className="text-body">{spec.label}</dt>
                      <dd className="text-body">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              ),
            },
          ]}
          size="sm"
        />
      </div>

      {hasSizes && (
        <div className="mt-6 max-w-[30rem]">
          <SizeChartTable />
        </div>
      )}
    </div>
  )
}
