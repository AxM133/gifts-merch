import '@testing-library/jest-dom/vitest'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { http } from '@/shared/api'
import { createTestServer, testServer } from './server'

const isBrowserLike = typeof window !== 'undefined'

if (isBrowserLike) {

  class ImmediateIntersectionObserver {
    constructor(callback) {
      this.callback = callback
    }
    observe(target) {
      this.callback([{ isIntersecting: true, target }], this)
    }
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return []
    }
  }
  globalThis.IntersectionObserver = ImmediateIntersectionObserver

  window.matchMedia =
    window.matchMedia ||
    ((query) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }))
  window.scrollTo = vi.fn()

  beforeEach(() => {
    testServer.current = createTestServer()
    http.defaults.adapter = testServer.current.adapter
  })

  afterEach(() => {
    cleanup()
    localStorage.clear()
  })
}
