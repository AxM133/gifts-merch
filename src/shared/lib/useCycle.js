import { useCallback, useState } from 'react'

export function useCycle(length, initial = 0) {
  const [state, setState] = useState({ index: initial, direction: 'next' })

  const next = useCallback(
    () => setState((s) => ({ index: (s.index + 1) % length, direction: 'next' })),
    [length],
  )
  const prev = useCallback(
    () => setState((s) => ({ index: (s.index - 1 + length) % length, direction: 'prev' })),
    [length],
  )

  const goTo = useCallback(
    (index) => setState((s) => ({ index, direction: index >= s.index ? 'next' : 'prev' })),
    [],
  )

  return { index: state.index % Math.max(length, 1), direction: state.direction, next, prev, goTo }
}
