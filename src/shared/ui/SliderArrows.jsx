import { cn } from '../lib'
import { ChevronIcon } from './icons'

export function SliderArrows({ onPrev, onNext, current, total, className, label = 'слайд', tone = 'text-brand' }) {
  const btn =
    'grid size-7 place-items-center rounded-full transition duration-200 hover:scale-125 hover:bg-white/60 active:scale-95'
  return (
    <div className={cn('flex items-center gap-1.5', tone, className)}>
      <button type="button" aria-label={`Предыдущий ${label}`} onClick={onPrev} className={btn}>
        <ChevronIcon direction="left" className="size-5" />
      </button>
      {total ? (
        <span className="min-w-8 text-center text-[0.65rem] text-muted tabular-nums" aria-live="polite">
          {current + 1}/{total}
        </span>
      ) : null}
      <button type="button" aria-label={`Следующий ${label}`} onClick={onNext} className={btn}>
        <ChevronIcon direction="right" className="size-5" />
      </button>
    </div>
  )
}
