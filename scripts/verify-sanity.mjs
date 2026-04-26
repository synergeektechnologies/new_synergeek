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

const settings = await client.fetch(
  `*[_type == "siteSettings"][0]{ orgName, companyDescription, mission, vision }`,
)
const services = await client.fetch(
  `*[_type == "service"] | order(order asc){ title, section, icon, order }`,
)
const postCount = await client.fetch(`count(*[_type == "post"])`)

console.log('siteSettings:', JSON.stringify(settings, null, 2))
console.log('\nservices:', JSON.stringify(services, null, 2))
console.log('\npost count:', postCount)
