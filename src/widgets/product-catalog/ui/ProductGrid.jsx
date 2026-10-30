import { ProductCard, ProductCardSkeleton, useQuickView } from '@/entities/product'
import { useCart } from '@/features/cart'
import { Reveal, StateMessage } from '@/shared/ui'
import { cn } from '@/shared/lib'

const GRID = 'grid grid-cols-1 gap-x-[1.2rem] gap-y-[1.6rem] sm:grid-cols-2 lg:grid-cols-4'

export function ProductGrid({ products, loading = false, busy = false, skeletons = 8, emptyText = 'Ничего не найдено' }) {
  const { addProduct } = useCart()
  const quickView = useQuickView()

  if (loading) {
    return (
      <ul className={GRID} aria-busy="true" aria-label="Загрузка товаров">
        {Array.from({ length: skeletons }, (_, i) => (
          <li key={i} className="flex">
            <ProductCardSkeleton />
          </li>
        ))}
      </ul>
    )
  }

  if (products.length === 0) return <StateMessage title={emptyText} />

  return (
    <ul className={cn(GRID, 'transition-opacity duration-300', busy && 'pointer-events-none opacity-60')} aria-busy={busy}>
      {products.map((product, i) => (
        <Reveal as="li" key={product.id} delay={(i % 4) * 90} className="flex">
          <ProductCard
            product={product}
            onOpen={(p) => quickView.open(p.id)}
            onAdd={(p, options) => addProduct(p, options)}
            className="w-full"
          />
        </Reveal>
      ))}
    </ul>
  )
}
