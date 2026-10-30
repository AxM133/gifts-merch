import { useId, useState } from 'react'
import { cn } from '../lib'
import { ChevronIcon } from './icons'

export function ExpandableText({ children, collapsedHeight = '9.4rem', className }) {
  const id = useId()
  const [open, setOpen] = useState(false)
  return (
    <div className={className}>
      <div
        id={id}
        style={{ maxHeight: open ? '60rem' : collapsedHeight }}
        className={cn('overflow-hidden transition-[max-height] duration-700 ease-out-expo')}
      >
        {children}
      </div>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="group mt-3 flex items-center gap-3 text-[0.7rem] text-ink transition-colors hover:text-violet"
      >
        {open ? 'Свернуть' : 'Показать еще'}
        <ChevronIcon direction={open ? 'up' : 'down'} className="size-5 text-white transition-transform duration-300 group-hover:translate-y-0.5" />
      </button>
    </div>
  )
}
