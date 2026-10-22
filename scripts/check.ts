import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'
import process from 'node:process'

// Validates skills/ against the Agent Skills spec and this repo's conventions.
// Usage: pnpm check [--strict]   (--strict also fails on warnings, e.g. pending TODOs)

const root = join(import.meta.dirname, '..')
const skillsDir = join(root, 'skills')
const strict = process.argv.includes('--strict')

// Keys accepted by every Agent Skills consumer. Claude Code-only keys
// (paths, disable-model-invocation, ...) break claude.ai uploads and the Skills API.
const PORTABLE_KEYS = new Set(['name', 'description', 'license', 'compatibility', 'metadata', 'allowed-tools'])
const RE_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const RE_VERSION = /^\d{4}\.\d{1,2}\.\d{1,2}$/
const RE_LINK = /\]\((references\/[^)#\s]+)/g
const RE_TODO = /<!--\s*TODO/g
const MAX_DESCRIPTION = 1024
const MAX_SKILL_LINES = 500

type Frontmatter = Record<string, string | Record<string, string>>

const errors: string[] = []
const warnings: string[] = []

function parseFrontmatter(file: string, content: string): Frontmatter | undefined {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) {
    errors.push(`${file}: missing frontmatter`)
    return
  }
  const data: Frontmatter = {}
  let parent: Record<string, string> | undefined
  for (const line of match[1].split('\n')) {
    if (!line.trim() || line.trimStart().startsWith('#') || line.trimStart().startsWith('- '))
      continue
    const nested = line.startsWith(' ')
    const idx = line.indexOf(':')
    if (idx === -1) {
      errors.push(`${file}: invalid frontmatter line "${line.trim()}"`)
      continue
    }
    const key = line.slice(0, idx).trim()
    const raw = line.slice(idx + 1).trim()
    const quoted = /^(["']).*\1$/.test(raw)
    if (!quoted && raw.includes(': '))
      errors.push(`${file}: "${key}" contains ": " and must be quoted to be valid YAML`)
    const value = quoted ? raw.slice(1, -1) : raw
    if (nested && parent) {
      parent[key] = value
    }
    else if (value === '') {
      parent = {}
      data[key] = parent
    }
    else {
      parent = undefined
      data[key] = value
    }
  }
  return data
}

function checkSkill(name: string): void {
  const dir = join(skillsDir, name)
  const skillFile = join(dir, 'SKILL.md')
  const rel = relative(root, skillFile)
  if (!existsSync(skillFile)) {
    errors.push(`skills/${name}: missing SKILL.md`)
    return
  }

  const content = readFileSync(skillFile, 'utf-8')
  const fm = parseFrontmatter(rel, content)
  if (!fm)
    return

  for (const key of Object.keys(fm)) {
    if (!PORTABLE_KEYS.has(key))
      warnings.push(`${rel}: "${key}" is Claude Code-only and breaks portability to other agents`)
  }

  if (fm.name !== name)
    errors.push(`${rel}: name "${fm.name}" must match its directory "${name}"`)
  if (!RE_NAME.test(name) || name.length > 64)
    errors.push(`${rel}: name must be kebab-case and at most 64 characters`)
  if (/anthropic|claude/.test(name))
    errors.push(`${rel}: name cannot contain "anthropic" or "claude"`)

  const description = typeof fm.description === 'string' ? fm.description : ''
  if (!description)
    errors.push(`${rel}: missing description`)
  if (description.length > MAX_DESCRIPTION)
    errors.push(`${rel}: description is ${description.length} characters (max ${MAX_DESCRIPTION})`)
  if (/[<>]/.test(description))
    errors.push(`${rel}: description cannot contain "<" or ">"`)
  if (description.includes('{'))
    errors.push(`${rel}: description still has template placeholders`)

  const metadata = typeof fm.metadata === 'object' ? fm.metadata : {}
  if (!metadata.author)
    warnings.push(`${rel}: missing metadata.author`)
  if (!RE_VERSION.test(metadata.version ?? ''))
    errors.push(`${rel}: metadata.version must be a date like "2026.10.22"`)

  const lines = content.split('\n').length
  if (lines > MAX_SKILL_LINES)
    errors.push(`${rel}: ${lines} lines (max ${MAX_SKILL_LINES}), move details to references/`)

  const linked = new Set<string>()
  for (const [, link] of content.matchAll(RE_LINK)) {
    linked.add(link)
    if (!existsSync(join(dir, link)))
      errors.push(`${rel}: broken link to ${link}`)
  }

  const refsDir = join(dir, 'references')
  const refs = existsSync(refsDir) ? readdirSync(refsDir).filter(f => f.endsWith('.md')) : []
  for (const ref of refs) {
    const refRel = relative(root, join(refsDir, ref))
    const refContent = readFileSync(join(refsDir, ref), 'utf-8')
    const refFm = parseFrontmatter(refRel, refContent)
    if (refFm && refFm.name !== ref.replace(/\.md$/, ''))
      errors.push(`${refRel}: name "${refFm.name}" must match its file name`)
    if (refFm && !refFm.description)
      errors.push(`${refRel}: missing description`)
    if (!linked.has(`references/${ref}`))
      warnings.push(`${refRel}: not linked from SKILL.md, agents will never load it`)
    countTodos(refRel, refContent)
  }
  countTodos(rel, content)
}

const todos: Record<string, number> = {}
function countTodos(file: string, content: string): void {
  const count = content.match(RE_TODO)?.length ?? 0
  if (count)
    todos[file] = count
}

function checkRepo(skills: string[]): void {
  const readme = readFileSync(join(root, 'README.md'), 'utf-8')
  for (const name of skills) {
    if (!readme.includes(`(skills/${name})`))
      errors.push(`README.md: skill "${name}" is not listed`)
  }

  const plugin = JSON.parse(readFileSync(join(root, '.claude-plugin/plugin.json'), 'utf-8'))
  const marketplace = JSON.parse(readFileSync(join(root, '.claude-plugin/marketplace.json'), 'utf-8'))
  const entry = marketplace.plugins?.find((p: { source: string }) => p.source === '.')
  if (!entry || entry.name !== plugin.name)
    errors.push(`.claude-plugin: marketplace entry name must match plugin.json name "${plugin.name}"`)
}

const skills = readdirSync(skillsDir).filter(f => statSync(join(skillsDir, f)).isDirectory())
skills.forEach(checkSkill)
checkRepo(skills)

const pending = Object.entries(todos)
if (pending.length) {
  const total = pending.reduce((sum, [, n]) => sum + n, 0)
  warnings.push(`${total} TODOs pending in ${pending.length} files:\n${pending.map(([f, n]) => `    ${f} (${n})`).join('\n')}`)
}

for (const w of warnings)
  console.warn(`warn  ${w}`)
for (const e of errors)
  console.error(`error ${e}`)

const failed = errors.length > 0 || (strict && warnings.length > 0)
console.log(`\n${skills.length} skills checked: ${errors.length} errors, ${warnings.length} warnings`)
process.exit(failed ? 1 : 0)
