import { useEffect } from 'react'

const BASE = 'Gifts & Merch'

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} — ${BASE}` : BASE
  }, [title])
}
