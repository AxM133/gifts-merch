import { AxiosError } from 'axios'
import { matchRoute } from '../../server/match.js'
import { createRoutes } from '../../server/routes.js'
import { createMemoryStore } from '../../server/store.js'

export const testServer = { current: null }

export function createTestServer() {
  const store = createMemoryStore()
  const routes = createRoutes({ store })
  const calls = []

  const adapter = async (config) => {
    const url = `${config.baseURL ?? ''}${config.url}`.split('?')[0]
    const query = Object.fromEntries(
      Object.entries(config.params ?? {})
        .filter(([, v]) => v !== undefined && v !== null)
        .map(([k, v]) => [k, String(v)]),
    )
    const body = config.data ? JSON.parse(config.data) : undefined
    calls.push({ method: config.method, url, query, body })

    const found = matchRoute(routes, config.method, url)
    let result = { status: 404, body: { error: 'not_found' } }
    if (found) result = await found.route.handler({ params: found.params, query, body })

    const response = {
      data: JSON.parse(JSON.stringify(result.body)),
      status: result.status,
      statusText: String(result.status),
      headers: {},
      config,
      request: {},
    }
    if (result.status < 400) return response
    throw new AxiosError(
      `Request failed with status code ${result.status}`,
      result.status >= 500 ? AxiosError.ERR_BAD_RESPONSE : AxiosError.ERR_BAD_REQUEST,
      config,
      {},
      response,
    )
  }

  return { store, adapter, calls }
}

export const networkErrorAdapter = (config) =>
  Promise.reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, {}))
