import { Link } from 'react-router'
import { catalogTree } from '@/entities/category'
import { cn } from '@/shared/lib'
import { catalogHref } from '../model/nav'

const row =
  'block px-[1.25rem] py-[0.8rem] text-[0.95rem] leading-tight transition-colors duration-200 outline-none'

export function CatalogMenu({ open, activeId, onActive, onNavigate }) {
  const active = catalogTree.find((n) => n.id === activeId)
  return (
    <div
      role="menu"
      aria-label="Каталог"
      className={cn(
        'absolute top-full left-0 z-50 mt-[0.9rem] flex origin-top items-start transition duration-300 ease-out-expo',
        open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
      )}
    >
      <ul className="w-[12rem] bg-ink py-[0.9rem] text-white shadow-[0_24px_40px_-18px_rgb(0_0_0/0.55)]">
        {catalogTree.map((node) => (
          <li key={node.id} onMouseEnter={() => onActive(node.id)}>
            <Link
              role="menuitem"
              to={catalogHref(node.category)}
              onClick={onNavigate}
              onFocus={() => onActive(node.id)}
              className={cn(
                row,
                'hover:bg-white hover:font-semibold hover:text-violet focus-visible:bg-white focus-visible:text-violet',
                node.id === activeId && 'bg-white font-semibold text-violet',
              )}
            >
              {node.label}
            </Link>
          </li>
        ))}
      </ul>
      {active?.children?.length > 0 && (
        <ul
          key={active.id}
          className="mt-[3rem] w-[12rem] animate-slide-next bg-ink py-[0.9rem] text-white shadow-[0_24px_40px_-18px_rgb(0_0_0/0.55)] [animation-duration:250ms]"
        >
          {active.children.map((child) => (
            <li key={child.id}>
              <Link
                role="menuitem"
                to={catalogHref(child.category)}
                onClick={onNavigate}
                className={cn(row, 'hover:bg-white hover:font-semibold hover:text-violet focus-visible:bg-white focus-visible:text-violet')}
              >
                -{child.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
