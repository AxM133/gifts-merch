import { useEffect } from 'react'
import { useLocation } from 'react-router'

export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.slice(1))

      const frame = requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return () => cancelAnimationFrame(frame)
    }
    window.scrollTo(0, 0)
    return undefined
  }, [pathname, hash])

  return null
}
