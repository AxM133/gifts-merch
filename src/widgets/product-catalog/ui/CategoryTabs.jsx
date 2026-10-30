import { useState } from 'react'
import { Container } from '@/shared/ui'
import { cn } from '@/shared/lib'

export function CategoryTabs({ tabs, category, subcategory, onSelect, onSelectSub }) {
  const [hovered, setHovered] = useState(null)
  return (
    <Container className="relative z-10 pt-3">
      <div className="relative pt-[1.1rem] pb-2">
        <div aria-hidden="true" className="absolute inset-x-0 top-[1.1rem] h-[0.4rem] rounded-full bg-mist" />
        <div role="tablist" aria-label="Категории товаров" className="relative flex flex-wrap gap-1 xl:flex-nowrap xl:justify-between">
          {tabs.map((tab) => {
            const active = tab.id === category
            const hasSub = tab.subcategories.length > 0
            const open = hasSub && hovered === tab.id
            return (
              <div
                key={tab.id}
                className="relative"
                onMouseEnter={() => hasSub && setHovered(tab.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => hasSub && setHovered(tab.id)}
                onBlur={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setHovered(null)
                }}
                onKeyDown={(e) => e.key === 'Escape' && setHovered(null)}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute -top-[0.7rem] left-0 h-[0.4rem] w-full origin-left rounded-full bg-ink transition-transform duration-500 ease-out-expo',
                    active ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
                <button
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-haspopup={hasSub ? 'menu' : undefined}
                  aria-expanded={hasSub ? open : undefined}
                  onClick={() => onSelect(tab.id)}
                  className={cn(
                    'mt-[0.3rem] rounded-b-[0.6rem] px-[1.7rem] py-[1.05rem] text-[1.05rem] font-medium whitespace-nowrap transition-colors duration-300',
                    active ? 'bg-ink text-white' : 'text-body hover:text-violet',
                  )}
                >
                  {tab.label}
                </button>
                {hasSub && (
                  <ul
                    role="menu"
                    className={cn(
                      'absolute top-full left-0 z-20 min-w-[11rem] origin-top bg-ink py-2 text-white shadow-[0_24px_40px_-18px_rgb(0_0_0/0.5)] transition duration-300 ease-out-expo',
                      open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-2 opacity-0',
                    )}
                  >
                    {tab.subcategories.map((sub) => (
                      <li key={sub.id} role="none">
                        <button
                          type="button"
                          role="menuitem"
                          onClick={() => {
                            onSelectSub(tab.id, sub.id)
                            setHovered(null)
                          }}
                          className={cn(
                            'block w-full px-4 py-2.5 text-left text-[0.8rem] transition-colors hover:bg-white hover:text-violet',
                            subcategory === sub.id && active && 'bg-white font-semibold text-violet',
                          )}
                        >
                          {sub.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </Container>
  )
}
