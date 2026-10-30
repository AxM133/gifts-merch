import { ArrowRightIcon } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { PHONE_MAX_LENGTH, sanitizePhone } from '../model/schema'
import { useCallbackForm } from '../model/useLeadForm'
import { FormSuccess } from './FormSuccess'

export function CallbackForm({ className }) {
  const form = useCallbackForm()

  if (form.status === 'success') {
    return <FormSuccess title="Спасибо!" text="Мы перезвоним вам в течение часа." className={className} />
  }

  return (
    <form noValidate onSubmit={form.handleSubmit} aria-label="Заказать звонок" className={className}>
      <div
        className={cn(
          'flex items-center rounded-[1rem] border-[2.5px] bg-white px-[0.9rem] py-[0.55rem] transition-colors duration-300 focus-within:border-brand',
          form.errors.phone ? 'border-danger' : 'border-ink',
        )}
      >
        <label htmlFor="callback-phone" className="sr-only">
          Номер телефона
        </label>
        <input
          id="callback-phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          maxLength={PHONE_MAX_LENGTH}
          autoComplete="tel-national"
          placeholder="Номер телефона"
          value={form.values.phone}
          onChange={form.setField('phone', sanitizePhone)}
          aria-invalid={form.errors.phone ? 'true' : undefined}
          className="min-w-0 flex-1 bg-transparent text-[0.8rem] outline-none placeholder:text-ink"
        />
        <button
          type="submit"
          aria-label="Отправить номер телефона"
          disabled={form.status === 'submitting'}
          className="grid size-9 shrink-0 place-items-center rounded-full bg-brand text-white transition duration-300 hover:scale-110 hover:bg-violet active:scale-90 disabled:opacity-60"
        >
          <ArrowRightIcon className="size-4" />
        </button>
      </div>
      <p role="alert" className={cn('mt-1.5 h-4 text-[0.65rem] text-danger transition-opacity', form.errors.phone ? 'opacity-100' : 'opacity-0')}>
        {form.errors.phone}
      </p>
    </form>
  )
}
