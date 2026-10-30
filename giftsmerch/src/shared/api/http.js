import axios from 'axios'

export const http = axios.create({
  baseURL: '/api',
  timeout: 10_000,
  headers: { Accept: 'application/json' },
})

export const isCancel = axios.isCancel

export function isNotFound(error) {
  return error?.response?.status === 404
}

export function validationIssues(error) {
  return error?.response?.status === 422 ? (error.response.data?.issues ?? null) : null
}
