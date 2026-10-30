import { useCallback, useEffect, useRef, useState } from 'react'

export function useCatalogMenu({ closeDelay = 180 } = {}) {
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState(null)
  const timer = useRef(null)

  const cancel = () => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
  }

  const show = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
    setOpen(true)
  }, [])

  const hide = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setOpen(false)
      setActiveId(null)
    }, closeDelay)
  }, [closeDelay])

  const closeNow = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
    setOpen(false)
    setActiveId(null)
  }, [])

  useEffect(() => cancel, [])

  return { open, activeId, setActiveId, show, hide, closeNow }
}
