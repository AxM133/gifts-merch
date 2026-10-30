import { useState } from 'react'
import { isNotFound } from '@/shared/api'
import { useProduct, useQuickView } from '@/entities/product'

export function useQuickViewProduct() {
  const { viewId, close } = useQuickView()
  const query = useProduct(viewId)
  const [last, setLast] = useState(null)
  if (query.data && query.data !== last) setLast(query.data)

  return {
    open: Boolean(viewId),
    product: viewId ? query.data : last,
    isLoading: Boolean(viewId) && query.isLoading,
    error: viewId ? query.error : null,
    notFound: isNotFound(query.error),
    refetch: query.refetch,
    close,
  }
}
