import { usePagedList } from '@/shared/lib'

export function useShowcase(items, pageSize, resetKey) {
  return usePagedList(items, pageSize, { resetKey })
}
