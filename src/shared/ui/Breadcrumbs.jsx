import { Link } from 'react-router'
import { cn } from '../lib'

export function Breadcrumbs({ items, className }) {
  return (
    <nav aria-label="Хлебные крошки" className={cn('text-[0.7rem] leading-snug text-muted', className)}>
      <ol className="flex flex-wrap items-center gap-x-1">
        {items.map((item, i) => {
          const last = i === items.length - 1
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-1">
              {item.to && !last ? (
                <Link to={item.to} className="transition-colors hover:text-violet">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined} className={last ? 'text-ink' : undefined}>
                  {item.label}
                </span>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
