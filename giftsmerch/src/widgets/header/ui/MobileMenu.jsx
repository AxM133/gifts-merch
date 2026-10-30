import { NavLink } from 'react-router'
import { SearchField } from '@/features/site-search'
import { LanguageSwitch } from '@/features/language-switch'
import { CloseIcon } from '@/shared/ui'
import { cn, usePresence } from '@/shared/lib'
import { contactPhone, navItems } from '../model/nav'

export function MobileMenu({ open, onToggle, onClose }) {
  const { mounted, visible } = usePresence(open, 300)
  return (
    <>
      <button
        type="button"
        aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
        aria-expanded={open}
        onClick={onToggle}
        className="ml-auto grid size-11 place-items-center rounded-full border-[3px] border-ink text-ink transition active:scale-90 lg:hidden"
      >
        {open ? (
          <CloseIcon className="size-5" />
        ) : (
          <span className="flex flex-col gap-1">
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
            <span className="block h-0.5 w-5 bg-ink" />
          </span>
        )}
      </button>
      {mounted && (
        <div
          className={cn(
            'absolute inset-x-0 top-full z-50 bg-white/95 px-5 pt-4 pb-6 shadow-xl backdrop-blur transition duration-300 ease-out-expo lg:hidden',
            visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0',
          )}
        >
          <SearchField className="mb-4" />
          <nav aria-label="Мобильная навигация" className="flex flex-col">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.to}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'rounded-xl px-4 py-3 text-[1.05rem] font-medium transition-colors',
                    isActive ? 'bg-ink text-white' : 'hover:bg-mist',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-4 flex items-center justify-between px-4">
            <a href={contactPhone.href} className="rounded-full bg-mint px-5 py-2.5 text-sm font-medium text-white">
              {contactPhone.label}
            </a>
            <LanguageSwitch />
          </div>
        </div>
      )}
    </>
  )
}
