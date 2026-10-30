import { NavLink } from 'react-router'
import { cn } from '@/shared/lib'
import { navItems } from '../model/nav'
import { useCatalogMenu } from '../model/useCatalogMenu'
import { CatalogMenu } from './CatalogMenu'

function NavItem({ item }) {
  return (
    <NavLink
      to={item.to}
      className={({ isActive }) =>
        cn(
          'group relative flex h-full items-center px-[2.6rem] text-[1.05rem] font-semibold transition-colors duration-300',
          isActive ? 'bg-ink text-white' : 'text-ink hover:text-violet',
        )
      }
    >
      {({ isActive }) => (
        <>
          <span className="relative">
            {item.label}
            {!isActive && (
              <span className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-violet transition-transform duration-300 ease-out-expo group-hover:scale-x-100" />
            )}
          </span>
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-x-0 -bottom-2 h-2 origin-top rounded-b-md bg-ink transition-transform duration-300 ease-out-expo',
              isActive ? 'scale-y-100' : 'scale-y-0',
            )}
          />
        </>
      )}
    </NavLink>
  )
}

export function MainNav() {
  const menu = useCatalogMenu()
  return (
    <nav aria-label="Основная навигация" className="-ml-[2.6rem] flex h-full items-stretch">
      {navItems.map((item) =>
        item.hasMenu ? (
          <div
            key={item.id}
            className="relative flex h-full"
            onMouseEnter={menu.show}
            onMouseLeave={menu.hide}
            onFocus={menu.show}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) menu.hide()
            }}
            onKeyDown={(e) => e.key === 'Escape' && menu.closeNow()}
          >
            <NavItem item={item} />
            <CatalogMenu open={menu.open} activeId={menu.activeId} onActive={menu.setActiveId} onNavigate={menu.closeNow} />
          </div>
        ) : (
          <NavItem key={item.id} item={item} />
        ),
      )}
    </nav>
  )
}
