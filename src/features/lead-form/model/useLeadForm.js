import { useZodForm } from '@/shared/lib'
import { sendCallback, sendRequest } from './api'
import { callbackSchema, leadSchema } from './schema'

export function useLeadForm({ onSubmit = sendRequest } = {}) {
  return useZodForm({
    schema: leadSchema,
    initialValues: { name: '', email: '', phone: '' },
    onSubmit,
  })
}

export function useCallbackForm({ onSubmit = sendCallback } = {}) {
  return useZodForm({
    schema: callbackSchema,
    initialValues: { phone: '' },
    onSubmit,
  })
}
