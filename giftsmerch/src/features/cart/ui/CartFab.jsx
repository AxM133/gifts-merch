import { useEffect, useState } from 'react'
import { BasketIcon, CloseCircleIcon } from '@/shared/ui'
import { cn, formatPrice, usePresence } from '@/shared/lib'
import { useCart } from '../model/useCart'

export function CartFab() {
  const { count, total, notice, dismissNotice, openCheckout } = useCart()
  const popover = usePresence(Boolean(notice), 300)

  const [last, setLast] = useState(null)
  if (notice && notice !== last) setLast(notice)

  useEffect(() => {
    if (!notice) return undefined
    const id = setTimeout(dismissNotice, 6000)
    return () => clearTimeout(id)
  }, [notice, dismissNotice])

  if (count === 0) return null

  return (
    <div className="fixed right-5 bottom-5 z-[60] flex items-end gap-3 sm:right-8 sm:bottom-8">
      {popover.mounted && last && (
        <div
          role="status"
          className={cn(
            'relative mb-9 w-[min(360px,calc(100vw-7rem))] rounded-2xl bg-white px-5 py-4 text-[14px] shadow-[0_18px_40px_-14px_rgb(0_0_0/0.35)] transition duration-300 ease-out-expo',
            popover.visible ? 'translate-x-0 opacity-100' : 'translate-x-6 opacity-0',
          )}
        >
          <button
            type="button"
            aria-label="Скрыть уведомление"
            onClick={dismissNotice}
            className="absolute -top-3 -right-3 rounded-full bg-white text-ink shadow-sm transition hover:rotate-90"
          >
            <CloseCircleIcon className="size-6" />
          </button>
          <p className="text-[13px] font-medium text-mint-dark">Товар добавлен в корзину</p>
          <p className="mt-1 mb-3 text-[16px] leading-snug font-semibold">
            {last.title}
            <span className="mt-0.5 block text-[14px] font-normal text-body">
              {[last.color, last.size].filter(Boolean).join(', ')} · {last.qty} шт.
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 whitespace-nowrap">
            <button type="button" onClick={dismissNotice} className="underline underline-offset-2 hover:text-brand">
              Продолжить покупки
            </button>
            <button type="button" onClick={openCheckout} className="text-mint underline underline-offset-2 hover:text-mint-dark">
              В корзину
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center gap-1">
        <button
          type="button"
          onClick={openCheckout}
          aria-label={`Корзина, товаров: ${count}`}
          className={cn(
            'relative grid size-[3.7rem] place-items-center rounded-full bg-mint text-white shadow-soft ring-[0.5rem] ring-mint/25 transition duration-300 hover:scale-110 active:scale-95',
            notice && 'animate-pulse-ring',
          )}
        >
          <BasketIcon className="size-7" />
          <span
            key={count}
            data-testid="cart-count"
            className="absolute -top-1 -right-1 grid min-w-6 animate-pop place-items-center rounded-full bg-ink px-1 text-[13px] leading-6 font-semibold"
          >
            {count}
          </span>
        </button>
        <span className="rounded-full bg-white px-2.5 py-0.5 text-[14px] font-semibold text-ink shadow-sm">
          {formatPrice(total)}
        </span>
      </div>
    </div>
  )
}
