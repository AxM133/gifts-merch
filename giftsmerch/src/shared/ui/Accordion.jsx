import { useId, useState } from 'react'
import { cn } from '../lib'
import { ChevronIcon } from './icons'

export function Accordion({ items, multiple = false, defaultOpen = [], size = 'md', className }) {
  const uid = useId()
  const [open, setOpen] = useState(() => new Set(defaultOpen))

  const toggle = (id) =>
    setOpen((prev) => {
      const next = new Set(multiple ? prev : [])
      if (!prev.has(id)) next.add(id)
      else if (multiple) next.delete(id)
      return next
    })

  return (
    <div className={cn('w-full', className)}>
      {items.map((item) => {
        const isOpen = open.has(item.id)
        const panelId = `${uid}-${item.id}-panel`
        const buttonId = `${uid}-${item.id}-button`
        return (
          <div key={item.id} className="border-b-[0.4rem] border-mist">
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span
                  className={cn(
                    'font-medium transition-colors duration-300',
                    size === 'lg' ? 'text-[1.9rem]' : 'text-[1.6rem]',
                    isOpen ? 'text-violet' : 'text-ink group-hover:text-violet',
                  )}
                >
                  {item.title}
                </span>
                <ChevronIcon
                  direction={isOpen ? 'up' : 'down'}
                  className="size-6 shrink-0 text-brand/80 transition-transform duration-300 group-hover:scale-110"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
            >
              <div className="overflow-hidden">
                <div className="pb-6 text-[0.95rem] leading-relaxed text-body">{item.content}</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
