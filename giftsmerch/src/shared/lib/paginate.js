export function paginate(list, page, pageSize) {
  const pageCount = Math.max(1, Math.ceil(list.length / pageSize))
  const current = Math.min(Math.max(1, Number(page) || 1), pageCount)
  const start = (current - 1) * pageSize
  return { items: list.slice(start, start + pageSize), page: current, pageCount, total: list.length }
}
