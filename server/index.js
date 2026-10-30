import { fileURLToPath } from 'node:url'
import { createApp } from './app.js'
import { createFileStore } from './store.js'

const PORT = Number(process.env.PORT) || 3001
const file = fileURLToPath(new URL('./storage/db.json', import.meta.url))

const app = createApp({ store: createFileStore(file) })
app.listen(PORT, () => {
  console.log(`[api] http://localhost:${PORT}  (orders & leads -> server/storage/db.json)`)
})
