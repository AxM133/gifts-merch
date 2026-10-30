import { useState } from 'react'

export const LANGUAGES = ['ru', 'en']
const KEY = 'gifts-merch:lang'

function readLanguage() {
  try {
    const stored = localStorage.getItem(KEY)
    return LANGUAGES.includes(stored) ? stored : 'ru'
  } catch {
    return 'ru'
  }
}

export function useLanguage() {
  const [language, setLanguage] = useState(readLanguage)

  const change = (next) => {
    if (!LANGUAGES.includes(next)) return
    setLanguage(next)
    document.documentElement.lang = next
    try {
      localStorage.setItem(KEY, next)
    } catch {}
  }

  return { language, change }
}
