import { useState } from 'react'
import { paginate } from './paginate'

export function usePagedList(items, pageSize, { page: controlledPage, onPageChange, resetKey = '' } = {}) {
  const [localPage, setLocalPage] = useState(1)
  const [more, setMore] = useState({ key: '', extra: 0 })

  const requested = controlledPage ?? localPage
  const base = paginate(items, requested, pageSize)
  const key = `${resetKey}|${base.page}`
  const extra = more.key === key ? more.extra : 0

  const lastLoaded = Math.min(base.page + extra, base.pageCount)
  const visible = items.slice((base.page - 1) * pageSize, lastLoaded * pageSize)

  const goTo = (next) => {
    const target = Math.min(Math.max(1, next), base.pageCount)
    if (onPageChange) onPageChange(target)
    else setLocalPage(target)
    setMore({ key: '', extra: 0 })
  }

  return {
    items: visible,
    page: base.page,
    pageCount: base.pageCount,
    total: base.total,
    hasMore: lastLoaded < base.pageCount,
    showMore: () => setMore({ key, extra: extra + 1 }),
    goTo,
  }
}
