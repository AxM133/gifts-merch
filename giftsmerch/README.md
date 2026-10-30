# Gifts & Merch

React 19 + Vite 8 · Tailwind CSS 4 · React Router 8 (declarative `<Routes>`) · Zod 4 · Vitest.
Реализация макетов из [Figma](https://www.figma.com/design/nDI9cyuPL4ViTXTxCrJv86/gifts---merch----Copy-?node-id=1-970&t=lhCY4wJXdaq5TxTT-0)

```bash
npm install
npm run dev        # API (http://localhost:3001) + фронт (http://localhost:5173) одной командой
npm run dev:server # только API  (node --watch server/index.js)
npm run dev:web    # только фронт (vite; /api проксируется на :3001)
npm run build && npm run preview   # preview тоже проксирует /api
npm run lint
npm test           # vitest: фронт, сервер, архитектурные правила
```

Порт API меняется переменной `PORT`, адрес для прокси фронта — `API_URL`.

## Локальный бэкенд (`server/`)

Express 5, без БД: каталог (товары, наборы, категории) лежит в `server/data/`,
заявки и заказы пишутся в `server/storage/db.json` (в `.gitignore`).
Фронт ходит в API через единственный axios-клиент `src/shared/api` (`baseURL: '/api'`,
ответы валидируются zod-схемами).

| Метод | URL | Что делает |
| --- | --- | --- |
| GET | `/api/products?category&sub&q&page&pages&pageSize` | каталог; `pages=N` отдаёт N страниц подряд («Показать еще») |
| GET | `/api/products/:id` | товар или набор (404, если нет) |
| GET | `/api/products/:id/similar` | похожие товары |
| GET | `/api/sets` | готовые наборы |
| GET | `/api/categories` | категории и подкатегории |
| POST | `/api/leads` | заявка `{name, email, phone, source?}` |
| POST | `/api/callbacks` | обратный звонок `{phone}` |
| GET | `/api/orders/next-number` | номер следующего заказа |
| POST | `/api/orders` | заказ `{customer, items:[{productId, color, size, qty}]}`: цены пересчитываются на сервере, проверяются цвет/размер/минимальное количество |

Телефон везде — только цифры (9–15), поля ввода сами отбрасывают всё остальное. 
(В дальнейшем заменить на форму с кодом страны + цифры)

## Маршруты

| URL | Экран макета |
| --- | --- |
| `/` | 1. Главная |
| `/sewing` | 2. Пошив (+ меню каталога в шапке) |
| `/sewing/:slug` | 3. Пошив, внутренняя |
| `/products` | 4. Все товары (`?category=&sub=&q=&page=`) |
| `/products?view=<id>` | 6. Поп-ап товара |
| `/products/:id` | страница товара (+ «Заказать» → 7. Оформление заказа) |
| `/production` | 8. Производство |
| `/sets` | 9. Наборы |
| `/info` | 10. Информация (FAQ, контакты) |

## Архитектура — FSD

```
src/
  app/        провайдеры, роутинг (AppRoutes), layout, стили
  pages/      страницы: ui страницы только собирает секции и виджеты
    <page>/sections/<section>/{model,ui,index.js}   секции страницы (hero и т.д.)
  widgets/    крупные блоки страниц (шапка, каталог, баннеры…)
  features/   пользовательские сценарии (корзина, форма заявки, поиск…)
  entities/   сущности (product, category, partner)
  shared/     ui-кит, lib, config
```

Каждый слайс в `pages | widgets | features | entities` и каждая секция страницы содержит
`model/` (данные, zod-схемы, хуки, состояние), `ui/` (представление) и `index.js` (публичный API).
Секции приватны для своей страницы; то, что нужно нескольким страницам, лежит в `widgets/`. `ui` страницы/виджета
только собирает готовые куски, а контент и логика лежат в `model`.
Правила (импорты только вниз, без соседних слайсов, только через `index.js`) проверяет
`src/architecture.test.js`.

## Анимации

Появление блоков при скролле (`Reveal`), плавное раскрытие аккордеонов, вход **и выход**
модалок/выпадающих меню (`usePresence`), слайдеры, hover-подъём карточек, переход между
страницами. Учитывается `prefers-reduced-motion`.

## Изображения

Фото, логотипы партнёров и дудлы вырезаны из PNG-макетов (`public/images`) — это временные
ассеты: замените их оригиналами (особенно герои с «запечённым» фоном).