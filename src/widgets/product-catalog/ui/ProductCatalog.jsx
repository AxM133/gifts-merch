import { Container, StateMessage } from '@/shared/ui'
import { useProductCatalog } from '../model/useProductCatalog'
import { CategoryTabs } from './CategoryTabs'
import { PagerBar } from './PagerBar'
import { ProductGrid } from './ProductGrid'

export function ProductCatalog() {
  const catalog = useProductCatalog()
  const { list } = catalog
  return (
    <section aria-label="Каталог товаров" className="pb-6">
      <CategoryTabs
        tabs={catalog.tabs}
        category={catalog.category}
        subcategory={catalog.subcategory}
        onSelect={catalog.selectCategory}
        onSelectSub={catalog.selectSubcategory}
      />
      <Container className="mt-7">
        {catalog.query && (
          <p className="mb-5 flex flex-wrap items-center gap-3 text-[0.95rem] text-body">
            Результаты поиска: <strong className="text-ink">«{catalog.query}»</strong>
            <button type="button" onClick={catalog.clearQuery} className="text-brand underline underline-offset-2 hover:text-violet">
              Сбросить
            </button>
          </p>
        )}
        {list.error ? (
          <StateMessage
            tone="error"
            title="Не удалось загрузить товары"
            text="Проверьте, что локальный сервер запущен (npm run dev), и попробуйте ещё раз."
            onRetry={list.refetch}
          />
        ) : (
          <>
            <ProductGrid products={list.items} loading={list.isInitialLoading} busy={list.isLoading} />
            {!list.isInitialLoading && <PagerBar list={list} />}
          </>
        )}
      </Container>
    </section>
  )
}
