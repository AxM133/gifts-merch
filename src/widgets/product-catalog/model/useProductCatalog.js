import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { productTabs } from '@/entities/category'
import { PRODUCT_PAGE_SIZE, useProducts } from '@/entities/product'

export function useProductCatalog() {
  const [params, setParams] = useSearchParams()
  const category = productTabs.some((t) => t.id === params.get('category')) ? params.get('category') : 'all'
  const tab = productTabs.find((t) => t.id === category)
  const subRaw = params.get('sub')
  const sub = tab.subcategories.some((s) => s.id === subRaw) ? subRaw : null
  const query = params.get('q') ?? ''
  const page = Number(params.get('page')) || 1

  const resetKey = `${category}|${sub}|${query}|${page}`
  const [more, setMore] = useState({ key: '', extra: 0 })
  const extra = more.key === resetKey ? more.extra : 0

  const result = useProducts({ category, sub: sub ?? undefined, q: query || undefined, page, pages: extra + 1 })
  const data = result.data

  const update = (patch) =>
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        for (const [key, value] of Object.entries(patch)) {
          if (value === null || value === undefined || value === '' || value === 'all' || (key === 'page' && value === 1)) next.delete(key)
          else next.set(key, String(value))
        }
        return next
      },
      { preventScrollReset: true },
    )

  const currentPage = data?.page ?? page
  const pageCount = data?.pageCount ?? 1

  return {
    tabs: productTabs,
    category,
    subcategory: sub,
    query,
    list: {
      items: data?.items ?? [],
      page: currentPage,
      pageCount,
      total: data?.total ?? 0,
      pageSize: PRODUCT_PAGE_SIZE,
      hasMore: Boolean(data) && currentPage + extra < pageCount,
      showMore: () => setMore({ key: resetKey, extra: extra + 1 }),
      goTo: (next) => update({ page: Math.min(Math.max(1, next), pageCount) }),
      isLoading: result.isLoading,
      isInitialLoading: result.isInitialLoading,
      error: result.error,
      refetch: result.refetch,
    },
    selectCategory: (id) => update({ category: id, sub: null, page: 1 }),
    selectSubcategory: (categoryId, id) => update({ category: categoryId, sub: id, page: 1 }),
    clearQuery: () => update({ q: null, page: 1 }),
  }
}
