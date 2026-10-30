import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CallbackForm } from './CallbackForm'
import { LeadForm } from './LeadForm'

const fill = async (user) => {
  await user.type(screen.getByLabelText('Ваше Имя'), 'Максим')
  await user.type(screen.getByLabelText('Ваша електронная почта'), 'example@gmail.com')
  await user.type(screen.getByLabelText('Ваш номер телефона'), '380909099090')
}

describe('<LeadForm />', () => {
  it('shows validation errors and does not submit empty data', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<LeadForm onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: 'Заказать' }))

    expect(await screen.findByText('Введите имя')).toBeInTheDocument()
    expect(screen.getByText('Введите почту')).toBeInTheDocument()
    expect(screen.getByText('Введите телефон')).toBeInTheDocument()
    expect(screen.getByLabelText('Ваше Имя')).toHaveAttribute('aria-invalid', 'true')
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('shows "Неверный формат" for a bad e-mail and clears it once fixed', async () => {
    const user = userEvent.setup()
    render(<LeadForm onSubmit={vi.fn()} />)
    await user.type(screen.getByLabelText('Ваше Имя'), 'Мак')
    await user.type(screen.getByLabelText('Ваша електронная почта'), 'examplegmail.com')
    await user.type(screen.getByLabelText('Ваш номер телефона'), '380909099090')
    await user.click(screen.getByRole('button', { name: 'Заказать' }))

    expect(await screen.findByText('Неверный формат')).toBeInTheDocument()

    await user.type(screen.getByLabelText('Ваша електронная почта'), '{Backspace>14}@gmail.com')
    await waitFor(() => expect(screen.queryByText('Неверный формат')).not.toBeInTheDocument())
  })

  it('submits parsed values and then shows the success message', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    const onSuccess = vi.fn()
    const user = userEvent.setup()
    render(<LeadForm onSubmit={onSubmit} onSuccess={onSuccess} successText="Скоро позвоним" />)
    await fill(user)
    await user.click(screen.getByRole('button', { name: 'Заказать' }))

    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Скоро позвоним'))
    expect(onSubmit).toHaveBeenCalledWith({ name: 'Максим', email: 'example@gmail.com', phone: '380909099090' })
    expect(onSuccess).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('button', { name: 'Заказать' })).not.toBeInTheDocument()
  })

  it('shows an error when the request fails and allows retrying', async () => {
    const onSubmit = vi.fn().mockRejectedValueOnce(new Error('network')).mockResolvedValue(undefined)
    const user = userEvent.setup()
    render(<LeadForm onSubmit={onSubmit} />)
    await fill(user)
    await user.click(screen.getByRole('button', { name: 'Заказать' }))
    expect(await screen.findByText(/Не удалось отправить заявку/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Заказать' }))
    await waitFor(() => expect(screen.getByRole('status')).toBeInTheDocument())
  })
})

describe('phone inputs accept digits only', () => {
  it('LeadForm drops letters, plus, spaces and punctuation while typing', async () => {
    const user = userEvent.setup()
    render(<LeadForm onSubmit={vi.fn()} />)
    const phone = screen.getByLabelText('Ваш номер телефона')
    await user.type(phone, '+38 (063)-abc 013.01/03')
    expect(phone).toHaveValue('380630130103')
    expect(phone).toHaveAttribute('inputmode', 'numeric')
  })

  it('sanitises pasted text and limits the length to 15 digits', async () => {
    const user = userEvent.setup()
    render(<LeadForm onSubmit={vi.fn()} />)
    const phone = screen.getByLabelText('Ваш номер телефона')
    await user.click(phone)
    await user.paste('+38 (063) 013-01-03 ext. 99')
    expect(phone).toHaveValue('38063013010399')
    await user.clear(phone)
    await user.type(phone, '12345678901234567890')
    expect(phone).toHaveValue('123456789012345')
  })

  it('CallbackForm strips non-digits too', async () => {
    const user = userEvent.setup()
    render(<CallbackForm />)
    const phone = screen.getByLabelText('Номер телефона')
    await user.type(phone, 'tel: +380-63')
    expect(phone).toHaveValue('38063')
  })
})

describe('<CallbackForm />', () => {
  it('validates the phone and confirms after a valid submit', async () => {
    const user = userEvent.setup()
    render(<CallbackForm />)
    await user.type(screen.getByLabelText('Номер телефона'), '12')
    await user.click(screen.getByRole('button', { name: 'Отправить номер телефона' }))
    expect(await screen.findByText('Неверный формат')).toBeInTheDocument()

    await user.clear(screen.getByLabelText('Номер телефона'))
    await user.type(screen.getByLabelText('Номер телефона'), '380630130103')
    await user.click(screen.getByRole('button', { name: 'Отправить номер телефона' }))
    expect(await screen.findByRole('status', {}, { timeout: 3000 })).toHaveTextContent('Спасибо!')
  })
})
