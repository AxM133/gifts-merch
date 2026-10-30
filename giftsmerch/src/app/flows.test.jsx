import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { http } from '@/shared/api'
import { renderApp } from '@/test/render'
import { networkErrorAdapter, testServer } from '@/test/server'

const cards = () => screen.findAllByTestId('product-card')
const cardCount = async () => (await cards()).length
const addButtons = async () => {
  await cards()
  return screen.getAllByRole('button', { name: /Добавить в корзину/ })
}

describe('catalogue (data from the API)', () => {
  it('shows skeletons first, then the first page of 8 cards with pagination', async () => {
    renderApp('/products')
    expect(screen.getAllByTestId('product-skeleton')).toHaveLength(8)
    expect(await cardCount()).toBe(8)
    expect(screen.queryByTestId('product-skeleton')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Страница 1' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', { name: 'Страница 5' })).toBeInTheDocument()
    expect(testServer.current.calls.find((c) => c.url === '/api/products').query).toMatchObject({ page: '1', pages: '1', pageSize: '8' })
  })

  it('"Показать еще" asks the server for the next page', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await cards()
    const catalog = screen.getByRole('region', { name: 'Каталог товаров' })
    await user.click(within(catalog).getByRole('button', { name: /Показать еще/ }))
    await waitFor(() => expect(screen.getAllByTestId('product-card')).toHaveLength(16))
    expect(testServer.current.calls.at(-1).query.pages).toBe('2')
  })

  it('pagination loads another page', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await cards()
    await user.click(screen.getByRole('button', { name: 'Страница 2' }))
    await waitFor(() => expect(screen.getAllByTestId('product-card')[0]).toHaveTextContent('EL009'))
    expect(screen.getByRole('button', { name: 'Страница 2' })).toHaveAttribute('aria-current', 'page')
  })

  it('category tabs filter on the server', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await cards()
    await user.click(screen.getByRole('tab', { name: 'Рюкзаки' }))
    await waitFor(() => expect(screen.getAllByTestId('product-card')).toHaveLength(3))
    expect(screen.getByRole('tab', { name: 'Рюкзаки' })).toHaveAttribute('aria-selected', 'true')
    await user.click(screen.getByRole('tab', { name: 'Все товары' }))
    await waitFor(() => expect(screen.getAllByTestId('product-card')).toHaveLength(8))
  })

  it('a slow earlier response never overwrites a later one (fast tab clicks)', async () => {
    const user = userEvent.setup()
    const real = http.defaults.adapter
    http.defaults.adapter = async (config) => {
      const slow = config.params?.category === 'tolstovki'
      if (slow) await new Promise((r) => setTimeout(r, 300))
      return real(config)
    }
    renderApp('/products')
    await cards()
    await user.click(screen.getByRole('tab', { name: 'Толстовки' }))
    await user.click(screen.getByRole('tab', { name: 'Маски' }))
    await waitFor(() => expect(screen.getAllByTestId('product-card')).toHaveLength(1))
    await new Promise((r) => setTimeout(r, 450))
    expect(screen.getAllByTestId('product-card')).toHaveLength(1)
    expect(screen.getByRole('tab', { name: 'Маски' })).toHaveAttribute('aria-selected', 'true')
  })

  it('subcategory menu filters hoodies', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await cards()
    await user.click(screen.getByRole('menuitem', { name: 'Худи на замке', hidden: true }))
    await waitFor(() => expect(screen.getAllByTestId('product-card').length).toBeLessThan(8))
    expect(screen.getByRole('tab', { name: 'Толстовки' })).toHaveAttribute('aria-selected', 'true')
    expect(testServer.current.calls.at(-1).query).toMatchObject({ category: 'tolstovki', sub: 'hudi-na-zamke' })
  })

  it('opens the filtered catalogue from the URL (?category=)', async () => {
    renderApp('/products?category=maski')
    expect(await cardCount()).toBe(1)
  })

  it('search query comes from the URL and can be reset', async () => {
    const user = userEvent.setup()
    renderApp('/products?q=EL012')
    expect(await cardCount()).toBe(1)
    await user.click(screen.getByRole('button', { name: 'Сбросить' }))
    await waitFor(() => expect(screen.getAllByTestId('product-card')).toHaveLength(8))
  })

  it('shows an empty state when nothing matches', async () => {
    renderApp('/products?q=zzzz')
    expect(await screen.findByText('Ничего не найдено')).toBeInTheDocument()
  })

  it('shows an error with a retry button when the server is unreachable', async () => {
    const user = userEvent.setup()
    const real = http.defaults.adapter
    http.defaults.adapter = networkErrorAdapter
    renderApp('/products')
    expect(await screen.findByText('Не удалось загрузить товары')).toBeInTheDocument()
    http.defaults.adapter = real
    await user.click(screen.getByRole('button', { name: 'Повторить' }))
    expect(await cardCount()).toBe(8)
  })

  it('the header search navigates to the filtered catalogue', async () => {
    const user = userEvent.setup()
    renderApp('/')
    await user.type(screen.getByRole('searchbox', { name: 'Поиск по каталогу' }), 'EL012{Enter}')
    expect(await cardCount()).toBe(1)
  })

  it('card gallery arrows change the counter', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    const first = within((await cards())[0])
    expect(first.getByText('1/7')).toBeInTheDocument()
    await user.click(first.getByRole('button', { name: 'Следующий кадр' }))
    expect(first.getByText('2/7')).toBeInTheDocument()
    await user.click(first.getByRole('button', { name: 'Предыдущий кадр' }))
    await user.click(first.getByRole('button', { name: 'Предыдущий кадр' }))
    expect(first.getByText('7/7')).toBeInTheDocument()
  })
})

describe('quick view dialog', () => {
  it('opens from a card image and shows product details', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await user.click(within((await cards())[1]).getByRole('button', { name: /Быстрый просмотр/ }))
    const dialog = await screen.findByRole('dialog')
    expect(await within(dialog).findByRole('heading', { level: 2 })).toHaveTextContent('EL003 Elleven')
    expect(within(dialog).getByText(/From Price \$76\.43/)).toBeInTheDocument()
    expect(within(dialog).getByRole('button', { name: 'Характеристики' })).toBeInTheDocument()
    expect(within(dialog).getByText('Таблица размеров')).toBeInTheDocument()
    expect(within(dialog).getByRole('radio', { name: 'XS' })).toBeChecked()
  })

  it('shows a loading skeleton while the product is being fetched', async () => {
    const real = http.defaults.adapter
    http.defaults.adapter = async (config) => {
      if (config.url.startsWith('/products/p-05')) await new Promise((r) => setTimeout(r, 200))
      return real(config)
    }
    renderApp('/products?view=p-05')
    const dialog = await screen.findByRole('dialog')
    expect(within(dialog).getByLabelText('Загрузка товара')).toBeInTheDocument()
    expect(await within(dialog).findByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(within(dialog).queryByLabelText('Загрузка товара')).not.toBeInTheDocument()
  })

  it('shows "Товар не найден" for an unknown ?view id', async () => {
    renderApp('/products?view=nope')
    expect(await screen.findByText('Товар не найден')).toBeInTheDocument()
  })

  it('opens straight from the URL and closes with the close button', async () => {
    const user = userEvent.setup()
    renderApp('/products?view=p-05')
    await screen.findByRole('dialog')
    await user.click(screen.getByRole('button', { name: 'Закрыть' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument(), { timeout: 2000 })
  })

  it('"Заказать" adds the chosen size to the cart and opens checkout', async () => {
    const user = userEvent.setup()
    renderApp('/products?view=p-02')
    const dialog = await screen.findByRole('dialog')
    await user.click(await within(dialog).findByRole('radio', { name: 'M' }))
    await user.click(within(dialog).getByRole('button', { name: 'Заказать' }))
    const checkout = await screen.findByRole('dialog', { name: 'Оформление заказа' })
    expect(within(checkout).getByText('Размер: M')).toBeInTheDocument()
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
  })
})

describe('cart and checkout', () => {
  it('adding from a card shows the badge, the total and the popover', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await cards()
    expect(screen.queryByTestId('cart-count')).not.toBeInTheDocument()
    await user.click((await addButtons())[0])
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    expect(await screen.findByText('Товар добавлен в корзину')).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(/, XS · 1 шт\./)
    expect(screen.getAllByText('$76.43').length).toBeGreaterThan(0)
  })

  it('"Продолжить покупки" dismisses the popover', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await user.click((await addButtons())[0])
    await user.click(await screen.findByRole('button', { name: 'Продолжить покупки' }))
    await waitFor(() => expect(screen.queryByText('Товар добавлен в корзину')).not.toBeInTheDocument(), { timeout: 2000 })
  })

  it('quantity stepper respects the minimum and updates the total', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await user.click((await addButtons())[0])
    await user.click(await screen.findByRole('button', { name: 'В корзину' }))
    const dialog = await screen.findByRole('dialog', { name: 'Оформление заказа' })

    expect(within(dialog).getByTestId('qty')).toHaveValue('1')
    expect(within(dialog).getByTestId('cart-total')).toHaveTextContent('$76.43')
    expect(within(dialog).getByRole('button', { name: 'Уменьшить количество' })).toBeDisabled()
    await user.click(within(dialog).getByRole('button', { name: 'Увеличить количество' }))
    expect(within(dialog).getByTestId('qty')).toHaveValue('2')
    expect(within(dialog).getByTestId('cart-total')).toHaveTextContent('$152.86')
    expect(within(dialog).getByTestId('cart-pieces')).toHaveTextContent('2')
  })

  it('keeps keyboard focus on the clicked control while the cart changes', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await user.click((await addButtons())[0])
    await user.click(await screen.findByRole('button', { name: 'В корзину' }))
    const dialog = await screen.findByRole('dialog', { name: 'Оформление заказа' })
    await new Promise((r) => setTimeout(r, 120))
    const plus = within(dialog).getByRole('button', { name: 'Увеличить количество' })
    await user.click(plus)
    await user.click(plus)
    await new Promise((r) => setTimeout(r, 120))
    expect(within(dialog).getByTestId('qty')).toHaveValue('3')
    expect(document.activeElement).toBe(plus)
  })

  it('the colour chosen on the card is the colour that goes into the cart', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    const card = within((await cards())[2])
    await user.click(card.getByRole('button', { name: 'Зелёный' }))
    expect(card.getByRole('button', { name: 'Зелёный' })).toHaveAttribute('aria-pressed', 'true')
    await user.click(card.getByRole('button', { name: /Добавить в корзину/ }))
    const [line] = JSON.parse(localStorage.getItem('gifts-merch:cart:v2'))
    expect(line.color).toMatchObject({ name: 'Зелёный', hex: '#2aa588' })
    expect(line.qty).toBe(1)
    expect(await screen.findByText(/Зелёный, XS · 1 шт\./)).toBeInTheDocument()
  })

  it('adding the same card again adds one piece and the popover shows the new quantity', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    const add = (await addButtons())[0]
    await user.click(add)
    await user.click(add)
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
    expect(JSON.parse(localStorage.getItem('gifts-merch:cart:v2'))[0].qty).toBe(2)
    expect(await screen.findByText(/2 шт\./)).toBeInTheDocument()
    expect(screen.getByText('$152.86')).toBeInTheDocument()
  })

  it('the same product in another colour becomes a second position', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    const card = within((await cards())[0])
    await user.click(card.getByRole('button', { name: /Добавить в корзину/ }))
    await user.click(card.getByRole('button', { name: 'Зелёный' }))
    await user.click(card.getByRole('button', { name: /Добавить в корзину/ }))
    expect(screen.getByTestId('cart-count')).toHaveTextContent('2')
  })

  it('quantity can be typed: digits only, committed on Enter/blur, clamped to the minimum', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await user.click((await addButtons())[0])
    await user.click(await screen.findByRole('button', { name: 'В корзину' }))
    const dialog = await screen.findByRole('dialog', { name: 'Оформление заказа' })
    const qty = within(dialog).getByTestId('qty')

    await user.clear(qty)
    await user.type(qty, '1a2b0{Enter}')
    expect(within(dialog).getByTestId('qty')).toHaveValue('120')
    expect(within(dialog).getByTestId('cart-total')).toHaveTextContent('$9,171.60'.replace(',', '') )

    await user.clear(within(dialog).getByTestId('qty'))
    await user.type(within(dialog).getByTestId('qty'), '0')
    await user.tab()
    expect(within(dialog).getByTestId('qty')).toHaveValue('1')

    await user.clear(within(dialog).getByTestId('qty'))
    await user.tab()
    expect(within(dialog).getByTestId('qty')).toHaveValue('1')
  })

  it('"Очистить корзину" empties the cart', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    const buttons = await addButtons()
    await user.click(buttons[0])
    await user.click(buttons[1])
    await user.click(await screen.findByRole('button', { name: 'В корзину' }))
    const dialog = await screen.findByRole('dialog', { name: 'Оформление заказа' })
    await user.click(within(dialog).getByRole('button', { name: 'Очистить корзину' }))
    expect(within(dialog).getByText('Корзина пуста')).toBeInTheDocument()
    expect(screen.queryByTestId('cart-count')).not.toBeInTheDocument()
  })

  it('removing the last item shows the empty state', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await user.click((await addButtons())[0])
    await user.click(await screen.findByRole('button', { name: 'В корзину' }))
    const dialog = await screen.findByRole('dialog', { name: 'Оформление заказа' })
    await user.click(within(dialog).getByRole('button', { name: /Удалить/ }))
    expect(within(dialog).getByText('Корзина пуста')).toBeInTheDocument()
  })

  it('shows the server-issued order number in the cart', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await user.click((await addButtons())[0])
    await user.click(await screen.findByRole('button', { name: 'В корзину' }))
    const dialog = await screen.findByRole('dialog', { name: 'Оформление заказа' })
    expect(await within(dialog).findByText('Заказ № 110001')).toBeInTheDocument()
  })

  it('validates the form, then POSTs the order, shows the confirmation and clears the cart', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await user.click((await addButtons())[0])
    await user.click((await addButtons())[1])
    await user.click(await screen.findByRole('button', { name: 'В корзину' }))
    const dialog = await screen.findByRole('dialog', { name: 'Оформление заказа' })

    await user.type(within(dialog).getByLabelText('Ваше Имя'), 'Мак')
    await user.type(within(dialog).getByLabelText('Ваша електронная почта'), 'examplegmail.com')
    await user.type(within(dialog).getByLabelText('Ваш номер телефона'), '380909099090')
    await user.click(within(dialog).getByRole('button', { name: 'Заказать' }))
    expect(await within(dialog).findByText('Неверный формат')).toBeInTheDocument()
    expect(testServer.current.store.count('orders')).toBe(0)

    await user.clear(within(dialog).getByLabelText('Ваша електронная почта'))
    await user.type(within(dialog).getByLabelText('Ваша електронная почта'), 'example@gmail.com')
    await user.click(within(dialog).getByRole('button', { name: 'Заказать' }))

    expect(await within(dialog).findByText('Заказ № 110001 оформлен', {}, { timeout: 3000 })).toBeInTheDocument()
    expect(within(dialog).getByText(/Сумма заказа — \$152\.86/)).toBeInTheDocument()
    expect(screen.queryByTestId('cart-count')).not.toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('gifts-merch:cart:v2'))).toEqual([])

    const [order] = testServer.current.store.all('orders')
    expect(order.customer).toEqual({ name: 'Мак', email: 'example@gmail.com', phone: '380909099090' })
    expect(order.items).toHaveLength(2)
    expect(order.total).toBeCloseTo(152.86, 2)
  })

  it('keeps the cart when the order request fails and lets the user retry', async () => {
    const user = userEvent.setup()
    renderApp('/products')
    await user.click((await addButtons())[0])
    await user.click(await screen.findByRole('button', { name: 'В корзину' }))
    const dialog = await screen.findByRole('dialog', { name: 'Оформление заказа' })
    await user.type(within(dialog).getByLabelText('Ваше Имя'), 'Максим')
    await user.type(within(dialog).getByLabelText('Ваша електронная почта'), 'example@gmail.com')
    await user.type(within(dialog).getByLabelText('Ваш номер телефона'), '380909099090')

    const real = http.defaults.adapter
    http.defaults.adapter = networkErrorAdapter
    await user.click(within(dialog).getByRole('button', { name: 'Заказать' }))
    expect(await within(dialog).findByText(/Не удалось оформить заказ/)).toBeInTheDocument()
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')

    http.defaults.adapter = real
    await user.click(within(dialog).getByRole('button', { name: 'Заказать' }))
    expect(await within(dialog).findByText(/оформлен/, {}, { timeout: 3000 })).toBeInTheDocument()
  })

  it('persists the cart in localStorage and restores it on the next visit', async () => {
    const user = userEvent.setup()
    const first = renderApp('/products')
    await user.click((await addButtons())[0])
    expect(JSON.parse(localStorage.getItem('gifts-merch:cart:v2'))).toHaveLength(1)
    first.unmount()

    renderApp('/')
    expect(screen.getByTestId('cart-count')).toHaveTextContent('1')
  })

  it('the product page lets you pick colour and size before ordering', async () => {
    const user = userEvent.setup()
    renderApp('/products/p-04')
    await screen.findByRole('heading', { level: 1, name: /EL003 Elleven/ })
    const hero = screen.getByTestId('page-hero')
    await user.click(within(hero).getByRole('button', { name: 'Зелёный' }))
    await user.click(within(hero).getByRole('radio', { name: 'L' }))
    await user.click(within(hero).getByRole('button', { name: 'Заказать' }))
    const dialog = await screen.findByRole('dialog', { name: 'Оформление заказа' })
    expect(within(dialog).getByText('Размер: L')).toBeInTheDocument()
    expect(within(dialog).getByText('Зелёный')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('gifts-merch:cart:v2'))[0]).toMatchObject({ productId: 'p-04', size: 'L', color: { name: 'Зелёный' } })
  })

  it('a set can be ordered from its page without a size picker', async () => {
    const user = userEvent.setup()
    renderApp('/products/s-02')
    await screen.findByRole('heading', { level: 1, name: /EL003 Elleven/ })
    const hero = screen.getByTestId('page-hero')
    expect(within(hero).queryByRole('radio')).not.toBeInTheDocument()
    await user.click(within(hero).getByRole('button', { name: 'Заказать' }))
    await screen.findByRole('dialog', { name: 'Оформление заказа' })
    expect(JSON.parse(localStorage.getItem('gifts-merch:cart:v2'))[0]).toMatchObject({ productId: 's-02', size: null })
  })

  it('the product page "Заказать" opens the checkout with the product', async () => {
    const user = userEvent.setup()
    renderApp('/products/p-04')
    await screen.findByRole('heading', { level: 1 })
    await user.click(screen.getAllByRole('button', { name: 'Заказать' })[0])
    const dialog = await screen.findByRole('dialog', { name: 'Оформление заказа' })
    expect(within(dialog).getByText('EL003 Elleven Checkpoint-Friendly Compu-Backpack')).toBeInTheDocument()
  })
})

describe('product page loading states', () => {
  it('shows a skeleton (not a redirect) while the product loads', async () => {
    const real = http.defaults.adapter
    http.defaults.adapter = async (config) => {
      if (config.url === '/products/p-04') await new Promise((r) => setTimeout(r, 200))
      return real(config)
    }
    renderApp('/products/p-04')
    expect(screen.queryByRole('heading', { name: /Купить чашку/ })).not.toBeInTheDocument()
    expect(await screen.findByRole('heading', { level: 1, name: /EL003 Elleven/ })).toBeInTheDocument()
  })

  it('shows an error with retry when the server is down (no redirect)', async () => {
    const user = userEvent.setup()
    const real = http.defaults.adapter
    http.defaults.adapter = networkErrorAdapter
    renderApp('/products/p-04')
    expect(await screen.findByRole('heading', { level: 1, name: 'Не удалось загрузить товар' })).toBeInTheDocument()
    http.defaults.adapter = real
    await user.click(screen.getByRole('button', { name: 'Повторить' }))
    expect(await screen.findByRole('heading', { level: 1, name: /EL003 Elleven/ })).toBeInTheDocument()
    expect(await cardCount()).toBe(4)
  })
})

describe('header mega-menu', () => {
  it('opens on hover and reveals the sub-categories', async () => {
    const user = userEvent.setup()
    renderApp('/sewing')
    const menu = screen.getByRole('menu', { name: 'Каталог', hidden: true })
    const nav = screen.getByRole('navigation', { name: 'Основная навигация' })
    await user.hover(within(nav).getByRole('link', { name: 'Все товары' }))
    await user.hover(within(menu).getByRole('menuitem', { name: 'Сумки и аксессуары', hidden: true }))
    expect(within(menu).getByRole('menuitem', { name: '-Рюкзак', hidden: true })).toHaveAttribute('href', '/products?category=ryukzaki')
  })
})

describe('sewing pages', () => {
  it('category tiles link to the sewing detail pages', async () => {
    const user = userEvent.setup()
    renderApp('/sewing')
    await user.click(screen.getByRole('link', { name: 'Худи' }))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Худи классическое')
  })

  it('the hoodie page has the size picker and the details accordion', async () => {
    const user = userEvent.setup()
    renderApp('/sewing/hoodie')
    expect(screen.getByRole('radio', { name: 'XS' })).toBeChecked()
    await user.click(screen.getByRole('radio', { name: 'L' }))
    expect(screen.getByRole('radio', { name: 'L' })).toBeChecked()
    expect(screen.getByRole('button', { name: 'Материал' })).toHaveAttribute('aria-expanded', 'true')
    await user.click(screen.getByRole('button', { name: 'Материал' }))
    expect(screen.getByRole('button', { name: 'Материал' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('"Подобрать размер" opens the size table', async () => {
    const user = userEvent.setup()
    renderApp('/sewing/hoodie')
    await user.click(screen.getByRole('button', { name: 'Подобрать размер' }))
    const dialog = await screen.findByRole('dialog', { name: 'Таблица размеров' })
    expect(within(dialog).getByText('67/46')).toBeInTheDocument()
  })
})

describe('info page', () => {
  it('FAQ opens one answer at a time', async () => {
    const user = userEvent.setup()
    renderApp('/info')
    expect(screen.getByRole('button', { name: 'Материал' })).toHaveAttribute('aria-expanded', 'true')
    await user.click(screen.getByRole('button', { name: 'Оплата и доставка' }))
    expect(screen.getByRole('button', { name: 'Оплата и доставка' })).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('button', { name: 'Материал' })).toHaveAttribute('aria-expanded', 'false')
  })

  it('the contacts form validates, then saves the lead on the server', async () => {
    const user = userEvent.setup()
    renderApp('/info')
    const contacts = screen.getByRole('region', { name: 'Контакты' })
    await user.click(within(contacts).getByRole('button', { name: 'Заказать' }))
    expect(await within(contacts).findByText('Введите имя')).toBeInTheDocument()
    expect(testServer.current.store.count('leads')).toBe(0)

    await user.type(within(contacts).getByLabelText('Ваше Имя'), 'Максим')
    await user.type(within(contacts).getByLabelText('Ваша електронная почта'), 'example@gmail.com')
    await user.type(within(contacts).getByLabelText('Ваш номер телефона'), '380909099090')
    await user.click(within(contacts).getByRole('button', { name: 'Заказать' }))
    expect(await within(contacts).findByRole('status', {}, { timeout: 3000 })).toBeInTheDocument()
    expect(testServer.current.store.all('leads')[0]).toMatchObject({ name: 'Максим', phone: '380909099090' })
  })

  it('the footer callback form posts the phone to /api/callbacks', async () => {
    const user = userEvent.setup()
    renderApp('/info')
    const footer = screen.getByRole('contentinfo')
    await user.type(within(footer).getByLabelText('Номер телефона'), '380630130103')
    await user.click(within(footer).getByRole('button', { name: 'Отправить номер телефона' }))
    expect(await within(footer).findByRole('status', {}, { timeout: 3000 })).toHaveTextContent('Спасибо!')
    expect(testServer.current.store.all('leads')[0]).toMatchObject({ type: 'callback', phone: '380630130103' })
  })
})

describe('sets page', () => {
  it('loads the ready-made sets from the API and shows the CREATIVE form', async () => {
    renderApp('/sets')
    expect(await cardCount()).toBe(4)
    expect(screen.getByRole('heading', { name: 'Как создать бокс по Вашей идее?' })).toBeInTheDocument()
  })

  it('shows an error with retry when the sets cannot be loaded', async () => {
    const user = userEvent.setup()
    const real = http.defaults.adapter
    http.defaults.adapter = networkErrorAdapter
    renderApp('/sets')
    expect(await screen.findByText('Не удалось загрузить товары')).toBeInTheDocument()
    http.defaults.adapter = real
    await user.click(screen.getByRole('button', { name: 'Повторить' }))
    expect(await cardCount()).toBe(4)
  })
})

describe('partners & custom-production carousels', () => {
  it('partner arrows rotate the logos', async () => {
    const user = userEvent.setup()
    renderApp('/')
    const first = () => screen.getAllByRole('img', { name: /Nike|Coca-Cola|Atlas Weekend|Megogo|Crazybox/ })[0]
    expect(first()).toHaveAccessibleName('Nike')
    await user.click(screen.getByRole('button', { name: 'Следующие партнёры' }))
    expect(first()).toHaveAccessibleName('Coca-Cola')
    await user.click(screen.getByRole('button', { name: 'Предыдущие партнёры' }))
    expect(first()).toHaveAccessibleName('Nike')
  })

  it('the custom-production slider shows a counter that advances', async () => {
    const user = userEvent.setup()
    renderApp('/')
    expect(screen.getByText('1/7')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Следующий набор' }))
    expect(screen.getByText('2/7')).toBeInTheDocument()
  })
})
