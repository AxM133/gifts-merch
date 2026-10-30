import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Accordion, Modal, Pagination, Reveal, TextField } from '.'

describe('<Accordion />', () => {
  const items = [
    { id: 'a', title: 'Материал', content: 'Хлопок' },
    { id: 'b', title: 'Уход', content: 'Стирка 30°C' },
  ]

  it('toggles a panel and updates aria-expanded', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} />)
    const button = screen.getByRole('button', { name: 'Материал' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })

  it('opens defaultOpen panels', () => {
    render(<Accordion items={items} defaultOpen={['b']} />)
    expect(screen.getByRole('button', { name: 'Уход' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Материал' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('closes the other panel when not `multiple`', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} defaultOpen={['a']} />)
    await user.click(screen.getByRole('button', { name: 'Уход' }))
    expect(screen.getByRole('button', { name: 'Материал' })).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByRole('button', { name: 'Уход' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('keeps several panels open when `multiple`', async () => {
    const user = userEvent.setup()
    render(<Accordion items={items} multiple defaultOpen={['a']} />)
    await user.click(screen.getByRole('button', { name: 'Уход' }))
    expect(screen.getByRole('button', { name: 'Материал' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Уход' })).toHaveAttribute('aria-expanded', 'true')
  })

  it('hides collapsed content from assistive tech', () => {
    render(<Accordion items={items} />)
    expect(screen.queryByText('Хлопок')).toBeInTheDocument()
    expect(screen.queryByRole('region', { name: 'Материал' })).not.toBeInTheDocument()
  })
})

describe('<Modal />', () => {
  it('renders nothing while closed', () => {
    render(<Modal open={false} onClose={() => {}} label="Окно">контент</Modal>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders an accessible dialog, closes on Escape, close button and backdrop', async () => {
    const onClose = vi.fn()
    const user = userEvent.setup()
    render(<Modal open onClose={onClose} label="Окно">контент</Modal>)
    expect(screen.getByRole('dialog', { name: 'Окно' })).toHaveAttribute('aria-modal', 'true')

    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledTimes(1)
    await user.click(screen.getByRole('button', { name: 'Закрыть' }))
    expect(onClose).toHaveBeenCalledTimes(2)
    await user.click(screen.getByTestId('modal-backdrop'))
    expect(onClose).toHaveBeenCalledTimes(3)
  })

  it('does not steal focus from a control the user already focused inside', async () => {
    render(
      <Modal open onClose={() => {}} label="Окно">
        <input aria-label="поле" />
      </Modal>,
    )
    const input = screen.getByLabelText('поле')
    input.focus()
    await new Promise((r) => setTimeout(r, 120))
    expect(document.activeElement).toBe(input)
  })

  it('locks page scroll while open and restores it afterwards', () => {
    const { rerender } = render(<Modal open onClose={() => {}} label="Окно">x</Modal>)
    expect(document.body.style.overflow).toBe('hidden')
    rerender(<Modal open={false} onClose={() => {}} label="Окно">x</Modal>)
    expect(document.body.style.overflow).not.toBe('hidden')
  })

  it('keeps the dialog mounted for the exit animation, then removes it', async () => {
    const { rerender } = render(<Modal open onClose={() => {}} label="Окно">x</Modal>)
    rerender(<Modal open={false} onClose={() => {}} label="Окно">x</Modal>)
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument(), { timeout: 1500 })
  })
})

describe('<Pagination />', () => {
  it('marks the current page and calls onChange', async () => {
    const onChange = vi.fn()
    const user = userEvent.setup()
    render(<Pagination page={2} pageCount={5} onChange={onChange} />)
    expect(screen.getByRole('button', { name: 'Страница 2' })).toHaveAttribute('aria-current', 'page')
    await user.click(screen.getByRole('button', { name: 'Страница 4' }))
    expect(onChange).toHaveBeenLastCalledWith(4)
    await user.click(screen.getByRole('button', { name: 'Следующая страница' }))
    expect(onChange).toHaveBeenLastCalledWith(3)
    await user.click(screen.getByRole('button', { name: 'Предыдущая страница' }))
    expect(onChange).toHaveBeenLastCalledWith(1)
  })

  it('disables the arrows at the edges', () => {
    const { rerender } = render(<Pagination page={1} pageCount={3} onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Предыдущая страница' })).toBeDisabled()
    rerender(<Pagination page={3} pageCount={3} onChange={() => {}} />)
    expect(screen.getByRole('button', { name: 'Следующая страница' })).toBeDisabled()
  })
})

describe('<Reveal />', () => {
  it('becomes visible once it intersects the viewport', async () => {
    render(<Reveal>контент</Reveal>)
    await waitFor(() => expect(screen.getByText('контент')).toHaveAttribute('data-reveal', 'visible'))
  })

  it('stays hidden until the observer reports an intersection', async () => {
    const original = globalThis.IntersectionObserver
    let trigger
    globalThis.IntersectionObserver = class {
      constructor(cb) {
        trigger = () => cb([{ isIntersecting: true }])
      }
      observe() {}
      disconnect() {}
    }
    render(<Reveal>контент</Reveal>)
    expect(screen.getByText('контент')).toHaveAttribute('data-reveal', 'hidden')
    act(() => trigger())
    expect(screen.getByText('контент')).toHaveAttribute('data-reveal', 'visible')
    globalThis.IntersectionObserver = original
  })
})

describe('<TextField />', () => {
  it('links the label, and exposes the error with role=alert', () => {
    render(<TextField label="Ваше Имя" error="Введите имя" />)
    const input = screen.getByLabelText('Ваше Имя')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByRole('alert')).toHaveTextContent('Введите имя')
    expect(input).toHaveAccessibleDescription('Введите имя')
  })

  it('has no alert without an error', () => {
    render(<TextField label="Ваше Имя" />)
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })
})
