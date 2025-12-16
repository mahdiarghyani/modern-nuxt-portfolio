import fs from 'node:fs'
import vm from 'node:vm'
import { createRequire } from 'node:module'
import ts from 'typescript'

const require = createRequire(import.meta.url)

function loadTsModuleExports(filePath) {
  const source = fs.readFileSync(filePath, 'utf8')
  const { outputText, diagnostics } = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.CommonJS,
      esModuleInterop: true,
    },
    fileName: filePath,
    reportDiagnostics: true,
  })

  if (diagnostics?.length) {
    const formatted = ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (f) => f,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => '\n',
    })
    throw new Error(`TypeScript transpile diagnostics for ${filePath}:\n${formatted}`)
  }

  const module = { exports: {} }
  const sandbox = {
    module,
    exports: module.exports,
    require,
    __dirname: filePath,
    __filename: filePath,
    process,
    console,
  }
  vm.runInNewContext(outputText, sandbox, { filename: filePath })

  return module.exports
}

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

function asArray(x) {
  return Array.isArray(x) ? x : []
}

const en = loadTsModuleExports('app/data/portfolio.ts')?.portfolio
const fa = loadTsModuleExports('app/data/portfolio.fa.ts')?.default

assert(en && typeof en === 'object', 'Could not load `portfolio` from `app/data/portfolio.ts`')
assert(fa && typeof fa === 'object', 'Could not load default export from `app/data/portfolio.fa.ts`')

const enProjects = asArray(en.projects)
const faProjects = asArray(fa.projects)

assert(enProjects.length > 0, 'English projects list is empty')
assert(faProjects.length > 0, 'Persian projects list is empty')
assert(
  enProjects.length === faProjects.length,
  `Projects count mismatch (en=${enProjects.length}, fa=${faProjects.length})`,
)

const faByName = new Map(faProjects.map((p) => [p?.name, p]))

for (const p of enProjects) {
  const name = p?.name
  assert(typeof name === 'string' && name.trim().length > 0, 'Encountered a project with missing `name` in EN data')
  const match = faByName.get(name)
  assert(match, `Missing project in FA data: ${name}`)

  assert(
    Boolean(p.opensource) === Boolean(match.opensource),
    `Mismatch "opensource" for project "${name}" (en=${Boolean(p.opensource)}, fa=${Boolean(match.opensource)})`,
  )

  assert(
    (p.thumbnail ?? null) === (match.thumbnail ?? null),
    `Mismatch "thumbnail" for project "${name}"`,
  )

  const enLinks = asArray(p.links).map((l) => l?.to).filter(Boolean)
  const faLinks = asArray(match.links).map((l) => l?.to).filter(Boolean)
  assert(
    enLinks.join('|') === faLinks.join('|'),
    `Mismatch "links[].to" for project "${name}"`,
  )

  const enIcons = asArray(p.icons)
  const faIcons = asArray(match.icons)
  assert(
    enIcons.join('|') === faIcons.join('|'),
    `Mismatch "icons" for project "${name}"`,
  )
}

console.log('portfolio data check')
console.log('--------------------')
console.log(`Projects: ${enProjects.length} (en) / ${faProjects.length} (fa)`)
