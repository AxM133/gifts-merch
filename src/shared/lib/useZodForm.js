import { useState } from 'react'

export function collectErrors(result) {
  const errors = {}
  for (const issue of result.error.issues) {
    const key = issue.path[0]
    if (key !== undefined && !(key in errors)) errors[key] = issue.message
  }
  return errors
}

export function useZodForm({ schema, initialValues, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const setField = (name, transform) => (event) => {
    const raw = event.target.value
    const next = { ...values, [name]: transform ? transform(raw) : raw }
    setValues(next)
    if (errors[name]) {
      const result = schema.safeParse(next)
      const fresh = result.success ? {} : collectErrors(result)
      setErrors((prev) => {
        const copy = { ...prev }
        if (fresh[name]) copy[name] = fresh[name]
        else delete copy[name]
        return copy
      })
    }
  }

  const handleSubmit = async (event) => {
    event?.preventDefault()
    if (status === 'submitting') return
    const result = schema.safeParse(values)
    if (!result.success) {
      setErrors(collectErrors(result))
      return
    }
    setErrors({})
    setStatus('submitting')
    try {
      await onSubmit(result.data)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setStatus('idle')
  }

  return { values, errors, status, setField, handleSubmit, reset }
}
