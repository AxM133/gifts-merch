import { useEffect, useState } from 'react'

export function usePresence(open, duration = 250) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)

  if (open && !mounted) setMounted(true)

  useEffect(() => {

    const id = setTimeout(() => setVisible(open), open ? 20 : 0)
    return () => clearTimeout(id)
  }, [open])

  useEffect(() => {
    if (open) return undefined
    const id = setTimeout(() => setMounted(false), duration)
    return () => clearTimeout(id)
  }, [open, duration])

  return { mounted, visible: open && visible }
}
