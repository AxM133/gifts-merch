export function formatPrice(value) {
  return `$${Number(value).toFixed(2)}`
}

export function digitsOnly(value) {
  return String(value).replace(/\D/g, '')
}

export function normalizePhone(value) {
  const trimmed = String(value).trim()
  return (trimmed.startsWith('+') ? '+' : '') + trimmed.replace(/\D/g, '')
}
