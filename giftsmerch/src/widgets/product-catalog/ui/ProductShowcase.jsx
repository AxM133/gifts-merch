import { Container, Reveal, StateMessage } from '@/shared/ui'
import { useShowcase } from '../model/useShowcase'
import { PagerBar } from './PagerBar'
import { ProductGrid } from './ProductGrid'

export function ProductShowcase({ title, subtitle, items, loading = false, error = null, onRetry, pageSize = 4, id }) {
  const list = useShowcase(items ?? [], pageSize, title)
  const titleId = `${id ?? 'showcase'}-title`
  return (
    <section id={id} aria-labelledby={titleId} className="pt-2 pb-8">
      <Container>
        <Reveal>
          <h2 id={titleId} className="text-[2rem] font-semibold lg:text-[2.7rem]">
            {title}
          </h2>
          {subtitle && <p className="mt-2 text-[0.85rem] text-body">{subtitle}</p>}
        </Reveal>
        <div className="mt-8">
          {error ? (
            <StateMessage tone="error" title="Не удалось загрузить товары" onRetry={onRetry} />
          ) : (
            <>
              <div key={list.page} className="animate-fade-in">
                <ProductGrid products={list.items} loading={loading} skeletons={pageSize} />
              </div>
              {!loading && <PagerBar list={list} />}
            </>
          )}
        </div>
      </Container>
    </section>
  )
}
