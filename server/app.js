import express from 'express'
import { ZodError } from 'zod'
import { createRoutes } from './routes.js'

export function createApp({ store }) {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json({ limit: '100kb' }))

  for (const route of createRoutes({ store })) {
    app[route.method](route.path, async (req, res, next) => {
      try {
        const { status, body } = await route.handler({ params: req.params, query: req.query, body: req.body })
        res.status(status).json(body)
      } catch (error) {
        next(error)
      }
    })
  }

  app.use('/api', (_req, res) => res.status(404).json({ error: 'not_found', message: 'Неизвестный метод API' }))

  app.use((error, _req, res, _next) => {
    if (error instanceof ZodError) return res.status(422).json({ error: 'validation' })
    if (error?.type === 'entity.parse.failed') return res.status(400).json({ error: 'bad_json' })
    console.error(error)
    return res.status(500).json({ error: 'server_error' })
  })

  return app
}
