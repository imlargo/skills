import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import process from 'node:process'

const root = join(import.meta.dirname, '..')
const RE_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

const name = process.argv[2]
if (!name || !RE_NAME.test(name)) {
  console.error('Usage: pnpm new <kebab-case-name>   (e.g. pnpm new imlargo-docker)')
  process.exit(1)
}

const dir = join(root, 'skills', name)
if (existsSync(dir)) {
  console.error(`skills/${name} already exists`)
  process.exit(1)
}

const now = new Date()
const version = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`
const title = name.replace(/^imlargo-/, '').split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')

const content = readFileSync(join(root, 'templates/skill/SKILL.md'), 'utf-8')
  .replaceAll('{name}', name)
  .replaceAll('{version}', version)
  .replaceAll('{Title}', title)

mkdirSync(join(dir, 'references'), { recursive: true })
writeFileSync(join(dir, 'SKILL.md'), content)

console.log(`Created skills/${name}/SKILL.md`)
console.log('Next: write the description, add references from templates/skill/references/topic.md, and list the skill in README.md.')
