import { cn } from '../lib'
import { ChevronIcon } from './icons'

export function Pagination({ page, pageCount, onChange, className }) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1)
  const arrow =
    'grid size-11 place-items-center rounded-full bg-[#e7e3f6] text-brand transition duration-200 hover:bg-[#d8d1f1] active:scale-90 disabled:pointer-events-none disabled:opacity-40'
  return (
    <nav aria-label="Постраничная навигация" className={cn('flex items-center gap-5', className)}>
      <button type="button" className={arrow} aria-label="Предыдущая страница" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        <ChevronIcon direction="left" className="size-5" />
      </button>
      <ul className="flex items-center gap-4">
        {pages.map((p) => (
          <li key={p}>
            <button
              type="button"
              aria-label={`Страница ${p}`}
              aria-current={p === page ? 'page' : undefined}
              onClick={() => onChange(p)}
              className={cn(
                'grid place-items-center rounded-full font-semibold transition duration-300 ease-out-expo',
                p === page
                  ? 'size-11 scale-100 bg-brand text-[1.3rem] text-white shadow-soft'
                  : 'size-9 text-[1rem] text-brand/80 hover:scale-110 hover:text-violet',
              )}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className={arrow} aria-label="Следующая страница" disabled={page >= pageCount} onClick={() => onChange(page + 1)}>
        <ChevronIcon direction="right" className="size-5" />
      </button>
    </nav>
  )
}
