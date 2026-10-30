import { useParams } from 'react-router'
import { productTabs } from '@/entities/category'
import { useProduct, useSimilarProducts } from '@/entities/product'
import { isNotFound } from '@/shared/api'
import { ROUTES } from '@/shared/config'

export function useProductPage() {
  const { id } = useParams()
  const productQuery = useProduct(id)
  const similarQuery = useSimilarProducts(id)
  const product = productQuery.data

  let status = 'ready'
  if (productQuery.error) status = isNotFound(productQuery.error) ? 'notFound' : 'error'
  else if (!product) status = 'loading'

  let breadcrumbs = []
  if (product) {
    const tab = productTabs.find((t) => t.id === product.category)
    breadcrumbs = [
      { label: 'Главная', to: ROUTES.home },
      product.kind === 'set' ? { label: 'Наборы', to: ROUTES.sets } : { label: 'Все товары', to: ROUTES.products },
      ...(tab && tab.id !== 'all' ? [{ label: tab.label, to: `${ROUTES.products}?category=${tab.id}` }] : []),
      { label: product.title },
    ]
  }

  return {
    status,
    product,
    breadcrumbs,
    similar: similarQuery.data,
    similarLoading: similarQuery.isLoading,
    similarError: similarQuery.error,
    refetch: () => {
      productQuery.refetch()
      similarQuery.refetch()
    },
  }
}
