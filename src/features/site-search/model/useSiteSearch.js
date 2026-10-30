import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { ROUTES } from '@/shared/config'

export function useSiteSearch() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')

  const submit = (event) => {
    event.preventDefault()
    const q = query.trim()
    navigate(q ? `${ROUTES.products}?q=${encodeURIComponent(q)}` : ROUTES.products)
  }

  return { query, setQuery, submit }
}
