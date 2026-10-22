import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    // Skill content is prose for agents; keep it out of the formatter
    '**/skills/**',
    '**/templates/**',
  ],
})
