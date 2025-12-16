import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()

function walk(dir) {
  const out = []
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name)
    if (ent.isDirectory()) out.push(...walk(p))
    else out.push(p)
  }
  return out
}

function flatten(obj, prefix = '') {
  const out = []
  for (const [k, v] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) out.push(...flatten(v, next))
    else out.push(next)
  }
  return out
}

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

function uniqSorted(arr) {
  return Array.from(new Set(arr)).sort()
}

function formatList(items) {
  if (items.length === 0) return '  (none)'
  return items.map((x) => `  - ${x}`).join('\n')
}

const localeEn = loadJson(path.join(ROOT, 'i18n/locales/en.json'))
const localeFa = loadJson(path.join(ROOT, 'i18n/locales/fa.json'))

const enKeys = new Set(flatten(localeEn))
const faKeys = new Set(flatten(localeFa))

const sourceFiles = walk(path.join(ROOT, 'app')).filter((p) => p.endsWith('.ts') || p.endsWith('.vue'))

const keyRe = /\b\$?t\(\s*(['"])([^'"\n]+)\1/g
const usedKeys = new Set()

for (const file of sourceFiles) {
  const s = fs.readFileSync(file, 'utf8')
  let m
  while ((m = keyRe.exec(s))) usedKeys.add(m[2])
}

const used = uniqSorted(Array.from(usedKeys))
const missingEn = used.filter((k) => !enKeys.has(k))
const missingFa = used.filter((k) => !faKeys.has(k))

const enNotFa = uniqSorted(Array.from(enKeys).filter((k) => !faKeys.has(k)))
const faNotEn = uniqSorted(Array.from(faKeys).filter((k) => !enKeys.has(k)))

const leadingSpaceKeys = []
for (const [localeName, locale] of [
  ['en', localeEn],
  ['fa', localeFa],
]) {
  const flat = flatten(locale)
  for (const key of flat) {
    const parts = key.split('.')
    let cur = locale
    for (const p of parts) cur = cur?.[p]
    if (typeof cur === 'string' && /^\s/.test(cur)) leadingSpaceKeys.push(`${localeName}:${key}`)
  }
}

console.log('i18n check')
console.log('---------')
console.log(`Used keys in app/: ${used.length}`)
console.log('')
console.log(`Missing in en.json: ${missingEn.length}`)
console.log(formatList(missingEn))
console.log('')
console.log(`Missing in fa.json: ${missingFa.length}`)
console.log(formatList(missingFa))
console.log('')
console.log(`Keys in en.json but not fa.json: ${enNotFa.length}`)
console.log(formatList(enNotFa))
console.log('')
console.log(`Keys in fa.json but not en.json: ${faNotEn.length}`)
console.log(formatList(faNotEn))
console.log('')
console.log(`Leading whitespace values: ${leadingSpaceKeys.length}`)
console.log(formatList(leadingSpaceKeys))

const hasErrors =
  missingEn.length > 0 ||
  missingFa.length > 0 ||
  enNotFa.length > 0 ||
  faNotEn.length > 0 ||
  leadingSpaceKeys.length > 0

if (hasErrors) process.exitCode = 1
