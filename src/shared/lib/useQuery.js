import { useCallback, useEffect, useRef, useState } from 'react'

export function useQuery(key, fetcher, { enabled = true, keepPrevious = false } = {}) {
  const [attempt, setAttempt] = useState(0)
  const [state, setState] = useState({ key: null, data: undefined, error: null })
  const fetcherRef = useRef(fetcher)
  useEffect(() => {
    fetcherRef.current = fetcher
  })

  const fullKey = enabled ? `${key}#${attempt}` : null

  useEffect(() => {
    if (!fullKey) return undefined
    const controller = new AbortController()
    fetcherRef
      .current(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ key: fullKey, data, error: null })
      })
      .catch((error) => {
        if (!controller.signal.aborted) setState({ key: fullKey, data: undefined, error })
      })
    return () => controller.abort()
  }, [fullKey])

  const settled = fullKey !== null && state.key === fullKey
  const hasData = state.data !== undefined && !state.error
  const data = settled || keepPrevious ? state.data : undefined
  const refetch = useCallback(() => setAttempt((n) => n + 1), [])

  return {
    data: fullKey === null ? undefined : data,
    error: settled ? state.error : null,

    isLoading: fullKey !== null && !settled,

    isInitialLoading: fullKey !== null && !settled && !(keepPrevious && hasData),
    refetch,
  }
}
