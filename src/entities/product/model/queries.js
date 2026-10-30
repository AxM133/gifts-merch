import { useQuery } from '@/shared/lib'
import { productApi } from './api'

export const PRODUCT_PAGE_SIZE = 8

export function useProducts(params) {
  const key = ['products', params.category, params.sub, params.q, params.page, params.pages].join('|')
  return useQuery(key, (signal) => productApi.list({ pageSize: PRODUCT_PAGE_SIZE, ...params }, signal), {
    keepPrevious: true,
  })
}

export function useProduct(id) {
  return useQuery(`product|${id}`, (signal) => productApi.get(id, signal), { enabled: Boolean(id) })
}

export function useSimilarProducts(id) {
  return useQuery(`similar|${id}`, (signal) => productApi.similar(id, signal), { enabled: Boolean(id) })
}

export function useSets() {
  return useQuery('sets', (signal) => productApi.sets(signal))
}
