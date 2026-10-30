import { ChevronIcon, Pagination } from '@/shared/ui'

export function PagerBar({ list }) {
  return (
    <div className="mt-7 flex flex-wrap items-center justify-between gap-6">
      {list.hasMore ? (
        <button
          type="button"
          onClick={list.showMore}
          className="group flex items-center gap-3 px-3 text-[1.15rem] font-semibold transition-colors hover:text-brand"
        >
          Показать еще
          <ChevronIcon direction="down" className="size-6 text-brand transition-transform duration-300 group-hover:translate-y-1" />
        </button>
      ) : (
        <span />
      )}
      {list.pageCount > 1 && <Pagination page={list.page} pageCount={list.pageCount} onChange={list.goTo} />}
    </div>
  )
}
