import { createApp } from '../server/app.js'
import { createMemoryStore } from '../server/store.js'

// На Vercel файловая система только для чтения, поэтому заявки и заказы хранятся в памяти
// инстанса функции (не переживают холодный старт). Для постоянного хранения нужна БД.
export default createApp({ store: createMemoryStore() })
