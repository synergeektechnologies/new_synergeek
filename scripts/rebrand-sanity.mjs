// One-off script: update Sanity content for the creative-agency rebrand.
// Run: node scripts/rebrand-sanity.mjs
import { createClient } from '@sanity/client'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = join(__dirname, '..', '.env.local')
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const eq = line.indexOf('=')
      if (eq < 0) return null
      const key = line.slice(0, eq).trim()
      let val = line.slice(eq + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      return [key, val]
    })
    .filter(Boolean),
)

const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = env.SANITY_API_READ_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_READ_TOKEN in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-03-04',
  token,
  useCdn: false,
})

const SERVICES = [
  {
    title: 'Search Engine Optimization (SEO)',
    description: 'Improving your online visibility and driving organic traffic.',
    icon: 'Search',
    section: 'tier1',
    order: 1,
  },
  {
    title: 'Social Media Lead Generation',
    description: 'Turning your social media into a system that consistently generates leads.',
    icon: 'Magnet',
    section: 'tier2',
    order: 2,
  },
  {
    title: 'Performance Marketing (Ads)',
    description: 'Running targeted ad campaigns to bring in qualified leads.',
    icon: 'Target',
    section: 'tier2',
    order: 3,
  },
  {
    title: 'Social Media Management',
    description: 'Complete handling of your content, posting, and growth strategy.',
    icon: 'Share2',
    section: 'tier3',
    order: 4,
  },
  {
    title: 'Content Strategy & Branding',
    description: 'Creating content plans that attract, engage, and convert your audience.',
    icon: 'PenTool',
    section: 'tier3',
    order: 5,
  },
]

const SETTINGS = {
  orgName: 'Synergeek',
  companyDescription:
    'A creative marketing agency that turns content, ads, and social into customers — every day.',
  mission:
    'To be the creative engine behind brands that refuse to be ignored — turning ideas, content, and ads into measurable growth.',
  vision:
    'A world where every business has a creative team that makes it impossible to scroll past.',
}

async function main() {
  console.log(`Connected to Sanity project ${projectId} / dataset ${dataset}`)

  // 1. Update Site Settings (single document)
  const existingSettings = await client.fetch(`*[_type == "siteSettings"][0]{ _id }`)
  if (!existingSettings) {
    console.log('No siteSettings document found — creating one.')
    await client.create({ _type: 'siteSettings', ...SETTINGS })
    console.log('  ✓ created siteSettings')
  } else {
    await client.patch(existingSettings._id).set(SETTINGS).commit()
    console.log(`  ✓ patched siteSettings (${existingSettings._id})`)
  }

  // 2. Delete all existing service documents
  const existingServices = await client.fetch(`*[_type == "service"]{ _id, title }`)
  console.log(`Found ${existingServices.length} existing service documents`)
  for (const s of existingServices) {
    await client.delete(s._id)
    console.log(`  ✗ deleted service: ${s.title}`)
  }

  // 3. Create the 5 new services
  for (const svc of SERVICES) {
    const created = await client.create({ _type: 'service', ...svc })
    console.log(`  ✓ created service: ${svc.title} (${svc.section})`)
  }

  // 4. Delete all existing blog posts
  const existingPosts = await client.fetch(`*[_type == "post"]{ _id, title }`)
  console.log(`Found ${existingPosts.length} existing blog posts`)
  for (const p of existingPosts) {
    await client.delete(p._id)
    console.log(`  ✗ deleted post: ${p.title}`)
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error('Error:', err.message || err)
  if (err.statusCode) console.error('Status:', err.statusCode)
  process.exit(1)
})
