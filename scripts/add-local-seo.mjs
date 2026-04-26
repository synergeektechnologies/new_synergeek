import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const env = Object.fromEntries(
  readFileSync(join(__dirname, '..', '.env.local'), 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((l) => {
      const eq = l.indexOf('=')
      if (eq < 0) return null
      let v = l.slice(eq + 1).trim()
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1)
      return [l.slice(0, eq).trim(), v]
    })
    .filter(Boolean),
)

const client = createClient({
  projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2025-03-04',
  token: env.SANITY_API_READ_TOKEN,
  useCdn: false,
})

// Bump existing orders >= 2 by 1 to make room for the new tier1 service at order 2.
const existing = await client.fetch(`*[_type == "service" && order >= 2] | order(order asc){ _id, title, order }`)
for (const s of existing) {
  await client.patch(s._id).set({ order: s.order + 1 }).commit()
  console.log(`  ↑ bumped "${s.title}" order ${s.order} → ${s.order + 1}`)
}

const created = await client.create({
  _type: 'service',
  title: 'Local SEO & Google Business Profile',
  description:
    'Showing up in Maps and local searches with an optimized Google Business Profile and location targeting.',
  icon: 'MapPin',
  section: 'tier1',
  order: 2,
})
console.log(`  ✓ created service: ${created.title} (tier1, order 2)`)

const all = await client.fetch(`*[_type == "service"] | order(order asc){ title, section, order }`)
console.log('\nFinal order:')
for (const s of all) console.log(`  ${s.order}. [${s.section}] ${s.title}`)
