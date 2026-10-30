import { describe, expect, it } from 'vitest'
import { categories } from '../../../../server/data/catalog.js'
import { productTabs } from './data'

describe('category taxonomy vs the API', () => {
  it('every API category exists as a tab with the same label and subcategories', () => {
    for (const category of categories) {
      const tab = productTabs.find((t) => t.id === category.id)
      expect(tab, `tab for ${category.id}`).toBeDefined()
      expect(tab.label).toBe(category.label)
      expect(tab.subcategories.map((s) => s.id)).toEqual(category.subcategories.map((s) => s.id))
    }
  })

  it('every tab (except "all") is an API category', () => {
    const ids = new Set(categories.map((c) => c.id))
    for (const tab of productTabs.filter((t) => t.id !== 'all')) expect(ids.has(tab.id), tab.id).toBe(true)
  })
})
