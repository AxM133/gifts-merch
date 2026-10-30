import { useCallback } from 'react'
import { useSearchParams } from 'react-router'

export function useQuickView() {
  const [params, setParams] = useSearchParams()
  const viewId = params.get('view')

  const open = useCallback(
    (id) =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.set('view', id)
          return next
        },
        { preventScrollReset: true },
      ),
    [setParams],
  )

  const close = useCallback(
    () =>
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.delete('view')
          return next
        },
        { preventScrollReset: true },
      ),
    [setParams],
  )

  return { viewId, open, close }
}
