export function matchRoute(routes, method, path) {
  for (const route of routes) {
    if (route.method !== method.toLowerCase()) continue
    const names = []
    const pattern = route.path.replace(/:([a-zA-Z]+)/g, (_, name) => {
      names.push(name)
      return '([^/]+)'
    })
    const match = path.match(new RegExp(`^${pattern}$`))
    if (match) return { route, params: Object.fromEntries(names.map((n, i) => [n, decodeURIComponent(match[i + 1])])) }
  }
  return null
}
