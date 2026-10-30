import { Button, TextField } from '@/shared/ui'
import { cn } from '@/shared/lib'
import { sendRequest } from '../model/api'
import { PHONE_MAX_LENGTH, sanitizePhone } from '../model/schema'
import { useLeadForm } from '../model/useLeadForm'
import { FormSuccess } from './FormSuccess'

export function LeadForm({
  variant = 'row',
  submitLabel = 'Заказать',
  successTitle,
  successText,
  note,
  onSubmit,
  onSuccess,
  source,
  errorText = 'Не удалось отправить заявку. Попробуйте ещё раз.',
  className,
  buttonClassName,
}) {
  const form = useLeadForm({
    onSubmit: async (data) => {
      const result = await (onSubmit ? onSubmit(data) : sendRequest(data, { source }))
      onSuccess?.(result, data)
    },
  })

  if (form.status === 'success') {
    return <FormSuccess title={successTitle} text={successText} className={className} />
  }

  const stack = variant === 'stack'
  const busy = form.status === 'submitting'

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit}
      aria-label="Форма заявки"
      className={cn(
        stack ? 'flex flex-col gap-6' : 'grid items-end gap-x-[4.5rem] gap-y-6 lg:grid-cols-[1fr_1fr_1fr_auto]',
        className,
      )}
    >
      <TextField label="Ваше Имя" name="name" autoComplete="name" value={form.values.name} onChange={form.setField('name')} error={form.errors.name} />
      <TextField label="Ваша електронная почта" name="email" type="email" autoComplete="email" value={form.values.email} onChange={form.setField('email')} error={form.errors.email} />
      <TextField
        label="Ваш номер телефона"
        name="phone"
        type="tel"
        inputMode="numeric"
        maxLength={PHONE_MAX_LENGTH}
        autoComplete="tel-national"
        value={form.values.phone}
        onChange={form.setField('phone', sanitizePhone)}
        error={form.errors.phone}
      />
      <div className={stack ? 'pt-2' : undefined}>
        <Button
          type="submit"
          variant="mint"
          disabled={busy}
          className={cn(stack ? 'w-full max-w-[17rem] py-[1.2rem]' : 'w-full min-w-[17.5rem] py-[1.3rem]', buttonClassName)}
        >
          {busy ? 'Отправляем…' : submitLabel}
        </Button>
      </div>
      {form.status === 'error' && (
        <p role="alert" className="text-sm text-danger lg:col-span-full">
          {errorText}
        </p>
      )}
      {note && <p className="max-w-[22rem] text-[length:max(0.6rem,12px)] leading-snug text-body lg:col-span-full">{note}</p>}
    </form>
  )
}
