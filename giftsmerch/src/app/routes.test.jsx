import { screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderApp } from '@/test/render'

const h1 = async () => {
  let text = ''
  await waitFor(() => {
    text = screen.getByRole('heading', { level: 1 }).textContent.replace(/\s+/g, ' ').trim()
    expect(text).not.toMatch(/^Загрузка/)
  })
  return text
}

describe('routes', () => {
  it.each([
    ['/', /Свежее дыхание в\s*корпоративной жизни/],
    ['/sets', /Подарочные наборы\s*это необычные/],
    ['/products', /Купить чашку с\s*логотипом/],
    ['/products/p-02', /EL003 Elleven Checkpoint-Friendly Compu-Backpack/],
    ['/sewing', /Современный пошив создает\s*современные бренды/],
    ['/sewing/hoodie', /Худи классическое/],
    ['/sewing/tote', /Шопперы/],
    ['/production', /Нужно создать\s*уникальный продукт\s*для вашей компании\?/],
    ['/info', /Кто такие Gifts & Merch\?/],
    ['/no/such/page', /Страница не найдена/],
  ])('%s renders its hero title', async (path, title) => {
    renderApp(path)
    expect(await h1()).toMatch(title)
  })

  it('redirects unknown sewing items to the sewing page', async () => {
    renderApp('/sewing/does-not-exist')
    expect(await h1()).toMatch(/Современный пошив/)
  })

  it('redirects unknown products to the catalogue (only after the API answered 404)', async () => {
    renderApp('/products/unknown-id')
    expect(await h1()).toMatch(/Купить чашку/)
  })

  it('every page has the header, footer and exactly one h1', () => {
    for (const path of ['/', '/sets', '/products', '/sewing', '/production', '/info']) {
      const { unmount } = renderApp(path)
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByRole('contentinfo')).toBeInTheDocument()
      expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
      unmount()
    }
  })

  it('sets the document title per page', () => {
    renderApp('/production')
    expect(document.title).toBe('Производство — Gifts & Merch')
  })

  it('highlights the current section in the main navigation', () => {
    renderApp('/products')
    const nav = screen.getByRole('navigation', { name: 'Основная навигация' })
    expect(within(nav).getByRole('link', { name: 'Все товары' })).toHaveAttribute('aria-current', 'page')
    expect(within(nav).getByRole('link', { name: 'Пошив' })).not.toHaveAttribute('aria-current')
  })

  it('highlights the catalogue for a product page too', async () => {
    renderApp('/products/p-03')
    await h1()
    const nav = screen.getByRole('navigation', { name: 'Основная навигация' })
    expect(within(nav).getByRole('link', { name: 'Все товары' })).toHaveAttribute('aria-current', 'page')
  })
})

describe('home page sections', () => {
  it('assembles all the sections of the design', () => {
    renderApp('/')
    for (const name of [
      'Самое популярное',
      /Хотите удивить ваших коллег/,
      /Помимо готовой продукции/,
      /У вас своя\s*УНИКАЛЬНАЯ идея/,
      'С нами соотрудничают',
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
  })

  it('shows the 3 benefit badges in the hero', () => {
    renderApp('/')
    expect(screen.getByText('Высокое качество')).toBeInTheDocument()
    expect(screen.getByText('ONLY')).toBeInTheDocument()
    expect(screen.getByText(/Поддержка менеджера 24\/7/)).toBeInTheDocument()
  })
})
