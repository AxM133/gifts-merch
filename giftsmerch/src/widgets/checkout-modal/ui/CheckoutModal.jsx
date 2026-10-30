import { CartLines } from '@/features/cart'
import { FormSuccess, LeadForm } from '@/features/lead-form'
import { Button, Modal } from '@/shared/ui'
import { formatPrice } from '@/shared/lib'
import { ROUTES } from '@/shared/config'
import { useCheckout } from '../model/useCheckout'

const CONSENT =
  'Натискаючи "Підтвердити замовлення", Ви даєте згоду на обробку Ваших персональних даних'

function OrderForm({ onSubmit, onPlaced }) {
  return (
    <section aria-labelledby="order-form-title" className="rounded-3xl bg-white p-6 shadow-soft sm:p-8">
      <h2 id="order-form-title" className="text-[26px] leading-tight font-semibold">
        Оформить заказ
      </h2>
      <p className="mt-3 mb-8 text-[15px] leading-relaxed text-body">
        Введите свои контактные данные, и наш менеджер свяжется с Вами в течении 1 часа
      </p>
      <LeadForm
        variant="stack"
        onSubmit={onSubmit}
        onSuccess={onPlaced}
        errorText="Не удалось оформить заказ. Проверьте корзину и попробуйте ещё раз."
        note={CONSENT}
        buttonClassName="w-full max-w-none text-[16px]"
      />
    </section>
  )
}

function Summary({ checkout }) {
  const row = 'flex items-baseline justify-between gap-4 text-[16px]'
  return (
    <div className="mt-6 rounded-2xl bg-white p-5 sm:p-6">
      <dl className="flex flex-col gap-2 text-body">
        <div className={row}>
          <dt>Позиций</dt>
          <dd className="font-semibold text-ink">{checkout.count}</dd>
        </div>
        <div className={row}>
          <dt>Всего штук</dt>
          <dd className="font-semibold text-ink" data-testid="cart-pieces">
            {checkout.pieces}
          </dd>
        </div>
      </dl>
      <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink/15 pt-4">
        <span className="text-[18px] font-semibold">Итого</span>
        <span className="text-[32px] leading-none font-bold" data-testid="cart-total">
          Всего: {formatPrice(checkout.total)}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[14px]">
        <span className="text-body">{checkout.orderNumber ? `Заказ № ${checkout.orderNumber}` : ''}</span>
        <button
          type="button"
          onClick={checkout.clear}
          className="text-body underline underline-offset-4 transition-colors hover:text-danger"
        >
          Очистить корзину
        </button>
      </div>
    </div>
  )
}

function CartPanel({ checkout }) {
  return (
    <section aria-labelledby="cart-title" className="min-w-0">
      <h2 id="cart-title" className="flex flex-wrap items-baseline gap-x-4 text-[32px] leading-tight font-semibold">
        Корзина
        <span className="text-[17px] font-normal text-body">
          {checkout.count} {plural(checkout.count, ['товар', 'товара', 'товаров'])} · {checkout.pieces} шт.
        </span>
      </h2>
      <div className="mt-6">
        <CartLines />
      </div>
      <Summary checkout={checkout} />
    </section>
  )
}

function plural(n, [one, few, many]) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few
  return many
}

function EmptyState({ onClose }) {
  return (
    <div className="mx-auto max-w-md py-8 text-center">
      <h2 className="text-[32px] font-semibold">Корзина пуста</h2>
      <p className="mt-4 text-[17px] text-body">Добавьте товары из каталога, чтобы оформить заказ.</p>
      <Button to={ROUTES.products} onClick={onClose} variant="mint" className="mt-8">
        Перейти в каталог
      </Button>
    </div>
  )
}

function Placed({ placed }) {
  return (
    <div className="mx-auto max-w-lg py-10">
      <FormSuccess
        title={`Заказ № ${placed.orderNumber} оформлен`}
        text={`Сумма заказа — ${formatPrice(placed.total)}. Менеджер свяжется с вами в течение 1 часа.`}
      />
    </div>
  )
}

export function CheckoutModal() {
  const checkout = useCheckout()
  return (
    <Modal
      open={checkout.checkoutOpen}
      onClose={checkout.close}
      label="Оформление заказа"
      panelClassName="max-w-[1120px] bg-mist/60 p-5 pt-16 sm:p-10 sm:pt-16"
    >
      {checkout.placed ? (
        <Placed placed={checkout.placed} />
      ) : checkout.isEmpty ? (
        <EmptyState onClose={checkout.close} />
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
          <CartPanel checkout={checkout} />
          <div className="lg:sticky lg:top-6">
            <OrderForm onSubmit={checkout.submitOrder} onPlaced={checkout.onPlaced} />
          </div>
        </div>
      )}
    </Modal>
  )
}
