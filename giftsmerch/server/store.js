import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const EMPTY = () => ({ orders: [], leads: [] })

export function createMemoryStore() {
  const db = EMPTY()
  return {
    add: (collection, record) => {
      db[collection].push(record)
      return record
    },
    all: (collection) => [...db[collection]],
    count: (collection) => db[collection].length,
  }
}

export function createFileStore(file) {
  let db = EMPTY()
  try {
    db = { ...EMPTY(), ...JSON.parse(readFileSync(file, 'utf8')) }
  } catch {
    mkdirSync(dirname(file), { recursive: true })
  }
  const persist = () => writeFileSync(file, JSON.stringify(db, null, 2))
  return {
    add: (collection, record) => {
      db[collection].push(record)
      persist()
      return record
    },
    all: (collection) => [...db[collection]],
    count: (collection) => db[collection].length,
  }
}
