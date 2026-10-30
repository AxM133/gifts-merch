import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

const SRC = join(process.cwd(), 'src')
const LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']
const SLICED = ['pages', 'widgets', 'features', 'entities']

const dirs = (p) => readdirSync(p).filter((n) => statSync(join(p, n)).isDirectory())
const files = (p) =>
  readdirSync(p).flatMap((n) => {
    const full = join(p, n)
    return statSync(full).isDirectory() ? files(full) : [full]
  })

const slices = SLICED.flatMap((layer) => dirs(join(SRC, layer)).map((slice) => ({ layer, slice })))
const sections = dirs(join(SRC, 'pages')).flatMap((page) =>
  existsSync(join(SRC, 'pages', page, 'sections'))
    ? dirs(join(SRC, 'pages', page, 'sections')).map((section) => ({ page, section }))
    : [],
)
const sourceFiles = files(SRC).filter((f) => /\.(jsx?)$/.test(f) && !/\.test\./.test(f) && !f.includes('/test/'))

describe('FSD structure', () => {
  it('has all the layers', () => {
    expect(dirs(SRC)).toEqual(expect.arrayContaining(LAYERS))
  })

  it.each(slices.map((s) => [`${s.layer}/${s.slice}`, s]))('%s has index.js, model/ and ui/', (_, { layer, slice }) => {
    const root = join(SRC, layer, slice)
    expect(readdirSync(root)).toEqual(expect.arrayContaining(['index.js', 'model', 'ui']))
    expect(readdirSync(join(root, 'ui')).length).toBeGreaterThan(0)
    expect(readdirSync(join(root, 'model')).length).toBeGreaterThan(0)
  })

  it.each(sections.map((s) => [`pages/${s.page}/sections/${s.section}`, s]))(
    '%s has index.js, model/ and ui/',
    (_, { page, section }) => {
      const root = join(SRC, 'pages', page, 'sections', section)
      expect(readdirSync(root)).toEqual(expect.arrayContaining(['index.js', 'model', 'ui']))
      expect(readdirSync(join(root, 'ui')).length).toBeGreaterThan(0)
      expect(readdirSync(join(root, 'model')).length).toBeGreaterThan(0)
    },
  )

  it('every page has a hero section', () => {
    const withHero = new Set(sections.filter((s) => s.section === 'hero').map((s) => s.page))
    expect(dirs(join(SRC, 'pages')).filter((p) => !withHero.has(p))).toEqual([])
  })

  it('sections are private to their page: only that page imports them, through ../sections/<name>', () => {
    const offenders = []
    for (const file of sourceFiles) {
      const rel = relative(SRC, file)
      const text = readFileSync(file, 'utf8')
      if (/@\/pages\/[^'"]+\/sections/.test(text)) offenders.push(`${rel}: reaches into a page section via alias`)
      for (const _match of text.matchAll(/from\s+['"]((?:\.\.\/)+)sections\/([^'"/]+)/g)) {
        const parts = rel.split('/')
        const insideOwnPage = parts[0] === 'pages' && parts[2] === 'ui'
        if (!insideOwnPage) offenders.push(`${rel}: imports sections from outside a page ui`)
      }
    }
    expect(offenders).toEqual([])
  })

  it('page ui files only assemble: no hard-coded content arrays or business hooks', () => {
    const offenders = sourceFiles
      .filter((f) => f.includes('/pages/') && f.includes('/ui/'))
      .filter((f) => /useReducer|useEffect|fetch\(|localStorage/.test(readFileSync(f, 'utf8')))
    expect(offenders.map((f) => relative(SRC, f))).toEqual([])
  })
})

describe('FSD import rules', () => {
  const importsOf = (file) =>
    [...readFileSync(file, 'utf8').matchAll(/(?:from|import)\s*\(?\s*['"](@\/[^'"]+)['"]/g)].map((m) => m[1])

  it('only imports from lower layers, through public APIs', () => {
    const violations = []
    for (const file of sourceFiles) {
      const rel = relative(SRC, file).split('/')
      const layer = rel[0]
      const slice = SLICED.includes(layer) ? rel[1] : null
      for (const spec of importsOf(file)) {
        const [targetLayer, targetSlice, ...deep] = spec.slice(2).split('/')
        if (!LAYERS.includes(targetLayer)) continue
        const from = LAYERS.indexOf(layer)
        const to = LAYERS.indexOf(targetLayer)
        if (to < from) violations.push(`${relative(SRC, file)} imports upward: ${spec}`)
        if (to === from && targetLayer !== 'shared' && targetSlice !== slice)
          violations.push(`${relative(SRC, file)} imports a sibling slice: ${spec}`)
        if (targetLayer !== 'shared' && targetLayer !== 'app' && deep.length > 0 && !(to === from && targetSlice === slice))
          violations.push(`${relative(SRC, file)} bypasses the public API: ${spec}`)
      }
    }
    expect(violations).toEqual([])
  })
})
