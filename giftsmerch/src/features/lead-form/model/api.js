import { http } from '@/shared/api'

export async function sendRequest(payload, { source } = {}) {
  const { data } = await http.post('/leads', { ...payload, source })
  return data
}

export async function sendCallback(payload) {
  const { data } = await http.post('/callbacks', payload)
  return data
}
