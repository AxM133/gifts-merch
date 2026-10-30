import { useState } from 'react'
import { CloseCircleIcon, MinusIcon, PlusIcon } from '@/shared/ui'
import { cn, digitsOnly, formatPrice } from '@/shared/lib'
import { MAX_QTY } from '../model/cartReducer'
import { useCart } from '../model/useCart'

function QtyInput({ item, onCommit }) {
  const [draft, setDraft] = useState(String(item.qty))
  const commit = () => {
    const value = Math.min(MAX_QTY, Math.max(item.minQty, Number(draft) || item.minQty))
    onCommit(value)
    setDraft(String(value))
  }
  return (
    <input
      data-testid="qty"
      aria-label={`Количество: ${item.title}`}
      inputMode="numeric"
      maxLength={String(MAX_QTY).length}
      value={draft}
      onChange={(e) => setDraft(digitsOnly(e.target.value))}
      onBlur={commit}
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
      className="h-10 w-[4.25rem] border-x border-ink/15 bg-white text-center text-[17px] font-semibold text-ink outline-none transition-colors focus:bg-mint/10"
    />
  )
}

function QtyStepper({ item, onChange }) {
  const btn =
    'grid size-10 place-items-center text-ink transition hover:bg-ink hover:text-white active:scale-90 disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-ink'
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center overflow-hidden rounded-xl border border-ink/25 bg-white">
        <button type="button" aria-label="Уменьшить количество" className={btn} disabled={item.qty <= item.minQty} onClick={() => onChange(item.qty - 1)}>
          <MinusIcon className="size-4" />
        </button>

        <QtyInput key={item.qty} item={item} onCommit={onChange} />
        <button type="button" aria-label="Увеличить количество" className={btn} disabled={item.qty >= MAX_QTY} onClick={() => onChange(item.qty + 1)}>
          <PlusIcon className="size-4" />
        </button>
      </div>
      <span className="text-[15px] text-body">шт.</span>
      {item.minQty > 1 && <span className="text-[13px] text-body">мин. {item.minQty}</span>}
    </div>
  )
}

function Meta({ children, className }) {
  return <span className={cn('inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-mist px-3 py-1 text-[14px] leading-none text-ink', className)}>{children}</span>
}

export function CartLines({ className }) {
  const { items, remove, setQty } = useCart()
  return (
    <ul className={cn('flex flex-col gap-4', className)}>
      {items.map((item) => (
        <li
          key={item.id}
          className="grid animate-fade-up grid-cols-[5.5rem_minmax(0,1fr)_auto] gap-x-4 gap-y-3 rounded-2xl border border-ink/15 bg-white p-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:gap-x-5 sm:p-5"
        >
          <img src={item.image} alt="" className="size-[5.5rem] rounded-xl bg-mist object-cover sm:size-[7rem]" />

          <div className="min-w-0">
            <p className="text-[17px] leading-snug font-semibold text-ink sm:text-[18px]">{item.title}</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <Meta>
                <span className="size-3.5 rounded-full ring-1 ring-ink/25" style={{ backgroundColor: item.color.hex }} />
                {item.color.name}
              </Meta>
              {item.size && <Meta>Размер: {item.size}</Meta>}
            </div>
            <p className="mt-2.5 text-[14px] text-body">{formatPrice(item.price)} за шт.</p>
          </div>

          <div className="flex flex-col items-end justify-between">
            <button
              type="button"
              aria-label={`Удалить: ${item.title}`}
              title="Удалить из корзины"
              onClick={() => remove(item.id)}
              className="text-ink/70 transition duration-300 hover:rotate-90 hover:text-danger"
            >
              <CloseCircleIcon className="size-7" />
            </button>
            <p className="text-[22px] leading-none font-bold text-ink" aria-label={`Сумма: ${formatPrice(item.price * item.qty)}`}>
              {formatPrice(item.price * item.qty)}
            </p>
          </div>

          <div className="col-span-3 border-t border-ink/10 pt-3 sm:col-span-2 sm:col-start-2">
            <QtyStepper item={item} onChange={(qty) => setQty(item.id, qty)} />
          </div>
        </li>
      ))}
    </ul>
  )
}
