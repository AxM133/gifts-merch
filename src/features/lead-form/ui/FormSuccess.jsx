import { CheckIcon } from '@/shared/ui'
import { cn } from '@/shared/lib'

export function FormSuccess({ title = 'Спасибо! Заявка отправлена', text = 'Менеджер свяжется с вами в ближайшее время.', className }) {
  return (
    <div role="status" className={cn('flex animate-pop items-center gap-4', className)}>
      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-mint text-white shadow-soft">
        <CheckIcon className="size-7" />
      </span>
      <p className="text-[1.15rem] font-semibold text-ink">
        {title}
        <span className="mt-1 block text-[0.9rem] font-normal text-body">{text}</span>
      </p>
    </div>
  )
}
