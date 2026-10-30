import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createApp } from './app.js'
import { createMemoryStore } from './store.js'

let server
let base
beforeAll(async () => {
  server = createApp({ store: createMemoryStore() }).listen(0)
  await new Promise((resolve) => server.once('listening', resolve))
  base = `http://127.0.0.1:${server.address().port}`
})
afterAll(() => new Promise((resolve) => server.close(resolve)))

const json = (path, init) => fetch(base + path, { headers: { 'content-type': 'application/json' }, ...init })

describe('express app (real HTTP)', () => {
  it('serves the catalogue as JSON', async () => {
    const res = await json('/api/products?pageSize=3&category=maski')
    expect(res.status).toBe(200)
    expect(await res.json()).toMatchObject({ total: 1, items: [{ category: 'maski' }] })
  })

  it('handles :params routes and 404 JSON', async () => {
    expect((await json('/api/products/p-03')).status).toBe(200)
    const missing = await json('/api/products/zzz')
    expect(missing.status).toBe(404)
    expect((await missing.json()).error).toBe('not_found')
    expect((await json('/api/unknown')).status).toBe(404)
  })

  it('creates a lead and an order over HTTP', async () => {
    const customer = { name: 'Максим', email: 'example@gmail.com', phone: '380909099090' }
    expect((await json('/api/leads', { method: 'POST', body: JSON.stringify(customer) })).status).toBe(201)
    const res = await json('/api/orders', {
      method: 'POST',
      body: JSON.stringify({ customer, items: [{ productId: 'p-01', color: '#4a3b85', size: 'S', qty: 5 }] }),
    })
    expect(res.status).toBe(201)
    expect((await res.json()).total).toBe(382.15)
  })

  it('answers 400 for malformed JSON and 422 for invalid payloads', async () => {
    expect((await json('/api/leads', { method: 'POST', body: '{oops' })).status).toBe(400)
    expect((await json('/api/leads', { method: 'POST', body: JSON.stringify({}) })).status).toBe(422)
  })
})
