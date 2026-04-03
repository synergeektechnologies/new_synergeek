# Sanity CMS Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all hardcoded content in the Synergeek website with Sanity CMS-managed content, with embedded Studio at `/studio`, live preview via Visual Editing, and on-demand revalidation.

**Architecture:** Next.js App Router server components fetch data from Sanity via `next-sanity`'s `sanityFetch` (with cache tags). Client components receive data as props for Framer Motion animations. Sanity Studio is embedded at `/studio` using `NextStudio`. Webhooks trigger `revalidateTag()` on publish.

**Tech Stack:** Next.js 16, React 19, Sanity v3, next-sanity v10+, @portabletext/react, @sanity/image-url, TailwindCSS v4, Framer Motion

---

## File Structure

### New Files

| File | Responsibility |
|------|---------------|
| `sanity.config.ts` | Sanity Studio configuration (project ID, dataset, plugins, schema) |
| `sanity.cli.ts` | Sanity CLI configuration |
| `sanity/schema/index.ts` | Schema registry — exports all document types |
| `sanity/schema/post.ts` | Blog post document type |
| `sanity/schema/service.ts` | Service document type |
| `sanity/schema/portfolio.ts` | Portfolio item document type |
| `sanity/schema/brand.ts` | Brand document type |
| `sanity/schema/siteSettings.ts` | Singleton site settings document type |
| `sanity/lib/client.ts` | Sanity client with project credentials |
| `sanity/lib/queries.ts` | All GROQ queries |
| `sanity/lib/image.ts` | Image URL builder helper |
| `sanity/lib/live.ts` | `defineLive()` setup — exports `sanityFetch` and `SanityLive` |
| `sanity/lib/env.ts` | Environment variable accessors with validation |
| `app/studio/[[...tool]]/page.tsx` | Embedded Sanity Studio page |
| `app/studio/[[...tool]]/layout.tsx` | Studio layout with metadata/viewport |
| `app/api/draft-mode/enable/route.ts` | Draft mode enable endpoint |
| `app/api/revalidate/route.ts` | Webhook endpoint for on-demand revalidation |
| `components/home-page.tsx` | Client component — homepage with Framer Motion (receives data as props) |
| `components/services-page.tsx` | Client component — services page with animations (receives data as props) |
| `components/contact-page.tsx` | Client component — contact page with animations (receives data as props) |
| `components/portable-text.tsx` | Portable Text renderer configuration |
| `components/sanity-image.tsx` | Reusable Sanity image component |
| `.env.local` | Environment variables (not committed) |

### Modified Files

| File | Change |
|------|--------|
| `app/page.tsx` | Server component that fetches homepage data from Sanity, passes to `HomePageClient` |
| `app/services/page.tsx` | Server component that fetches services/portfolio from Sanity, passes to `ServicesPageClient` |
| `app/contact/page.tsx` | Server component that fetches siteSettings from Sanity, passes to `ContactPageClient` |
| `app/blog/page.tsx` | Fetch posts from Sanity instead of filesystem |
| `app/blog/[slug]/page.tsx` | Render Portable Text instead of remark HTML |
| `app/layout.tsx` | Add `SanityLive` and conditional `VisualEditing` components |
| `next.config.mjs` | Add Sanity image hostname to `images.remotePatterns` |
| `package.json` | Add Sanity deps, remove markdown deps |

### Removed Files

| File | Reason |
|------|--------|
| `lib/blog.ts` | Replaced by Sanity queries |

---

## Task 1: Install Dependencies & Initialize Sanity

**Files:**
- Modify: `package.json`
- Create: `.env.local`
- Create: `sanity/lib/env.ts`

- [ ] **Step 1: Install Sanity packages**

```bash
cd "/Users/srimanikandanr/My Files/Synergeek/Company Website/new_synergeek"
npm install sanity next-sanity @portabletext/react @sanity/image-url @sanity/vision
```

- [ ] **Step 2: Remove unused markdown dependencies**

```bash
cd "/Users/srimanikandanr/My Files/Synergeek/Company Website/new_synergeek"
npm uninstall gray-matter remark remark-html
```

- [ ] **Step 3: Create a Sanity project**

Run this interactively — it will open a browser to authenticate and create a project:

```bash
cd "/Users/srimanikandanr/My Files/Synergeek/Company Website/new_synergeek"
npx sanity init --env .env.local
```

When prompted:
- Select "Create new project"
- Project name: `synergeek`
- Dataset: `production`
- Project output path: select the current directory
- It will write `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` to `.env.local`

- [ ] **Step 4: Add remaining env vars to `.env.local`**

After `sanity init` creates the file, manually add these lines:

```
SANITY_API_READ_TOKEN=
SANITY_REVALIDATE_SECRET=
```

The `SANITY_API_READ_TOKEN` must be created in the Sanity dashboard at manage.sanity.io → project → API → Tokens → Add API token (Viewer role). The `SANITY_REVALIDATE_SECRET` can be any random string (e.g., generate with `openssl rand -hex 32`).

- [ ] **Step 5: Create `sanity/lib/env.ts`**

```typescript
// sanity/lib/env.ts
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion = '2025-03-04'
```

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json sanity/lib/env.ts
git commit -m "feat: install Sanity dependencies and create env config"
```

---

## Task 2: Sanity Schemas

**Files:**
- Create: `sanity/schema/post.ts`
- Create: `sanity/schema/service.ts`
- Create: `sanity/schema/portfolio.ts`
- Create: `sanity/schema/brand.ts`
- Create: `sanity/schema/siteSettings.ts`
- Create: `sanity/schema/index.ts`

- [ ] **Step 1: Create post schema**

```typescript
// sanity/schema/post.ts
import { defineField, defineType } from 'sanity'

export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Date, Newest',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', date: 'date', media: 'coverImage' },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
        media,
      }
    },
  },
})
```

- [ ] **Step 2: Create service schema**

```typescript
// sanity/schema/service.ts
import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon key (e.g., "Code", "Globe", "Rocket", "Share2", "TrendingUp", "Webhook", "Lightbulb", "Database")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Software & Web Development', value: 'software' },
          { title: 'Digital Marketing', value: 'marketing' },
          { title: 'AI Solutions', value: 'ai' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'section' },
  },
})
```

- [ ] **Step 3: Create portfolio schema**

```typescript
// sanity/schema/portfolio.ts
import { defineField, defineType } from 'sanity'

export const portfolioType = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9', value: '16/9' },
          { title: '4:3', value: '4/3' },
          { title: '3:2', value: '3/2' },
          { title: '4:5', value: '4/5' },
          { title: '9:12', value: '9/12' },
          { title: '18:9', value: '18/9' },
        ],
      },
      initialValue: '16/9',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
})
```

- [ ] **Step 4: Create brand schema**

```typescript
// sanity/schema/brand.ts
import { defineField, defineType } from 'sanity'

export const brandType = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code (e.g., "#3B82F6")',
      validation: (rule) => rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color' }),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'name' },
  },
})
```

- [ ] **Step 5: Create siteSettings schema (singleton)**

```typescript
// sanity/schema/siteSettings.ts
import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'orgName',
      title: 'Organization Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'companyDescription',
      title: 'Company Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'phone1',
      title: 'Phone 1',
      type: 'string',
    }),
    defineField({
      name: 'phone2',
      title: 'Phone 2',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
```

- [ ] **Step 6: Create schema index**

```typescript
// sanity/schema/index.ts
import { postType } from './post'
import { serviceType } from './service'
import { portfolioType } from './portfolio'
import { brandType } from './brand'
import { siteSettingsType } from './siteSettings'

export const schemaTypes = [postType, serviceType, portfolioType, brandType, siteSettingsType]
```

- [ ] **Step 7: Commit**

```bash
git add sanity/schema/
git commit -m "feat: add Sanity schemas for post, service, portfolio, brand, siteSettings"
```

---

## Task 3: Sanity Studio Configuration & Embedded Studio Route

**Files:**
- Create: `sanity.config.ts`
- Create: `sanity.cli.ts`
- Create: `app/studio/[[...tool]]/page.tsx`
- Create: `app/studio/[[...tool]]/layout.tsx`

- [ ] **Step 1: Create `sanity.config.ts`**

```typescript
// sanity.config.ts
'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schema'
import { projectId, dataset, apiVersion } from './sanity/lib/env'

// Singleton document types that should not allow creating new documents
const singletonTypes = new Set(['siteSettings'])

export default defineConfig({
  name: 'synergeek-studio',
  title: 'Synergeek Studio',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title('Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // Regular document types
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId()!)
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  schema: {
    types: schemaTypes,
    // Prevent creating new siteSettings documents
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
})
```

- [ ] **Step 2: Create `sanity.cli.ts`**

```typescript
// sanity.cli.ts
import { defineCliConfig } from 'sanity/cli'
import { projectId, dataset } from './sanity/lib/env'

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: 'synergeek',
})
```

- [ ] **Step 3: Create Studio page**

```typescript
// app/studio/[[...tool]]/page.tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 4: Create Studio layout**

```typescript
// app/studio/[[...tool]]/layout.tsx
import { metadata as studioMetadata, viewport as studioViewport } from 'next-sanity/studio'

export const metadata = {
  ...studioMetadata,
  title: 'Synergeek Studio',
}

export const viewport = {
  ...studioViewport,
}

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children
}
```

- [ ] **Step 5: Verify Studio loads**

```bash
cd "/Users/srimanikandanr/My Files/Synergeek/Company Website/new_synergeek"
npm run dev
```

Open `http://localhost:3000/studio` — you should see the Sanity Studio with all 5 document types in the sidebar. The "Site Settings" singleton should appear at the top.

- [ ] **Step 6: Commit**

```bash
git add sanity.config.ts sanity.cli.ts app/studio/
git commit -m "feat: add embedded Sanity Studio at /studio route"
```

---

## Task 4: Sanity Client, GROQ Queries & Live Preview Setup

**Files:**
- Create: `sanity/lib/client.ts`
- Create: `sanity/lib/queries.ts`
- Create: `sanity/lib/image.ts`
- Create: `sanity/lib/live.ts`
- Create: `app/api/draft-mode/enable/route.ts`
- Create: `app/api/revalidate/route.ts`
- Modify: `app/layout.tsx`
- Modify: `next.config.mjs`

- [ ] **Step 1: Create Sanity client**

```typescript
// sanity/lib/client.ts
import { createClient } from 'next-sanity'
import { projectId, dataset, apiVersion } from './env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
  stega: {
    enabled: true,
    studioUrl: '/studio',
  },
})
```

- [ ] **Step 2: Create live preview setup**

```typescript
// sanity/lib/live.ts
import { defineLive } from 'next-sanity/live'
import { client } from './client'

const token = process.env.SANITY_API_READ_TOKEN
if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN')
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
})
```

- [ ] **Step 3: Create image URL builder**

```typescript
// sanity/lib/image.ts
import imageUrlBuilder from '@sanity/image-url'
import { client } from './client'

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
```

- [ ] **Step 4: Create all GROQ queries**

```typescript
// sanity/lib/queries.ts
import { defineQuery } from 'next-sanity'

export const postsQuery = defineQuery(
  `*[_type == "post"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    excerpt,
    coverImage,
    categories
  }`
)

export const postBySlugQuery = defineQuery(
  `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    excerpt,
    coverImage,
    categories,
    body
  }`
)

export const postSlugsQuery = defineQuery(
  `*[_type == "post"] { "slug": slug.current }`
)

export const servicesQuery = defineQuery(
  `*[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    section,
    order
  }`
)

export const portfolioQuery = defineQuery(
  `*[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    description,
    image,
    tags,
    aspectRatio,
    order
  }`
)

export const brandsQuery = defineQuery(
  `*[_type == "brand"] | order(order asc) {
    _id,
    name,
    color,
    order
  }`
)

export const siteSettingsQuery = defineQuery(
  `*[_type == "siteSettings"][0] {
    _id,
    orgName,
    companyDescription,
    mission,
    vision,
    contactEmail,
    phone1,
    phone2,
    address,
    instagramUrl,
    logo,
    ogImage
  }`
)
```

- [ ] **Step 5: Create draft mode enable endpoint**

```typescript
// app/api/draft-mode/enable/route.ts
import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { client } from '@/sanity/lib/client'

export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
})
```

- [ ] **Step 6: Create revalidation webhook endpoint**

```typescript
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current?: string }
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad request', { status: 400 })
    }

    // Map document types to cache tags
    const tagMap: Record<string, string> = {
      post: 'posts',
      service: 'services',
      portfolio: 'portfolio',
      brand: 'brands',
      siteSettings: 'siteSettings',
    }

    const tag = tagMap[body._type]
    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({ revalidated: true, tag })
    }

    return NextResponse.json({ revalidated: false })
  } catch (err) {
    console.error('Revalidation error:', err)
    return new NextResponse('Error', { status: 500 })
  }
}
```

- [ ] **Step 7: Update `next.config.mjs` for Sanity images**

Replace the entire file:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 8: Update `app/layout.tsx` — add SanityLive and VisualEditing**

Replace the full file content:

```typescript
// app/layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Geist_Mono, Bebas_Neue, Roboto_Condensed } from "next/font/google"
import Script from "next/script"
import { VisualEditing } from "next-sanity/visual-editing"
import { draftMode } from "next/headers"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"
import { SanityLive } from "@/sanity/lib/live"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" })
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: "300", variable: "--font-roboto-condensed" })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.synergeek.in'),
  title: {
    default: "Synergeek - Creative Marketing Agency | Digital Marketing & Web Development",
    template: "%s | Synergeek Technologies"
  },
  description: "Synergeek Technologies is a technology and digital solutions company that helps businesses build, grow, and scale using modern software, digital strategies, and artificial intelligence. Specialized in custom software, web/mobile apps, branding, and advanced AI-powered solutions.",
  keywords: [
    "Synergeek",
    "Synergeek Technologies",
    "Technology Solutions",
    "Digital Solutions",
    "AI-powered solutions",
    "Agentic AI",
    "AI Chatbots",
    "Business Automation",
    "Custom Software Development",
    "Web Development",
    "Mobile App Development",
    "Digital Marketing",
    "Branding",
    "Creative Design",
    "SEO",
    "Coimbatore",
    "India"
  ],
  authors: [{ name: "Synergeek Technologies", url: "https://www.synergeek.in" }],
  creator: "Synergeek Technologies",
  publisher: "Synergeek Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.synergeek.in',
    siteName: 'Synergeek Technologies',
    title: 'Synergeek - Creative Marketing Agency | Digital Marketing & Web Development',
    description: 'Synergeek is a Creative Marketing Agency specialized in Digital Marketing, Web Design & Development, Video Production, Branding, SEO, and E-commerce Solutions.',
    images: [
      {
        url: '/synergeek-og.png',
        width: 1200,
        height: 630,
        alt: 'Synergeek Technologies - Creative Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@synergeek',
    creator: '@synergeek',
    title: 'Synergeek - Creative Marketing Agency | Digital Marketing & Web Development',
    description: 'Synergeek is a Creative Marketing Agency specialized in Digital Marketing, Web Design & Development, Video Production, Branding, SEO, and E-commerce Solutions.',
    images: ['/synergeek-og.png'],
  },
  alternates: {
    canonical: 'https://www.synergeek.in',
  },
  category: 'Creative Marketing Agency',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/synergeek-og.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="cfhzzbdcpl610u3v3qsdk9pzox2vss" />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F3078JXHG0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F3078JXHG0');
            gtag('config', 'AW-16812402326/ftygCI3tsdYbEJbN49A-', {
              'phone_conversion_number': '9677741597'
            });
            gtag('config', 'AW-16812402326');
          `}
        </Script>
      </head>
      <body className={`font-sans antialiased ${robotoCondensed.variable}`}>
        <Navigation />
        {children}
        <Toaster />
        {isDraftMode && <VisualEditing />}
        <SanityLive />
      </body>
    </html>
  )
}
```

- [ ] **Step 9: Commit**

```bash
git add sanity/lib/ app/api/ app/layout.tsx next.config.mjs
git commit -m "feat: add Sanity client, GROQ queries, live preview, and revalidation webhook"
```

---

## Task 5: Shared Components (Portable Text, Sanity Image, Icon Map)

**Files:**
- Create: `components/portable-text.tsx`
- Create: `components/sanity-image.tsx`
- Create: `lib/icon-map.ts`

- [ ] **Step 1: Create Portable Text renderer**

```typescript
// components/portable-text.tsx
'use client'

import { PortableText as PortableTextComponent, type PortableTextComponents } from '@portabletext/react'
import { SanityImage } from './sanity-image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <SanityImage
          source={value}
          alt={value.alt || ''}
          width={800}
          height={450}
          className="rounded-lg w-full"
        />
        {value.alt && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            {value.alt}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 hover:text-primary/80"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
  },
}

export function PortableText({ value }: { value: any }) {
  return <PortableTextComponent value={value} components={components} />
}
```

- [ ] **Step 2: Create Sanity image component**

```typescript
// components/sanity-image.tsx
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface SanityImageProps {
  source: any
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  className?: string
  priority?: boolean
}

export function SanityImage({
  source,
  alt,
  width,
  height,
  fill,
  sizes,
  className,
  priority,
}: SanityImageProps) {
  if (!source?.asset) return null

  const imageUrl = urlFor(source)
    .auto('format')
    .quality(80)
    .url()

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width || 800}
      height={height || 450}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  )
}
```

- [ ] **Step 3: Create Lucide icon map**

```typescript
// lib/icon-map.ts
import {
  Code,
  Cloud,
  Shield,
  Database,
  Lightbulb,
  TrendingUp,
  Share2,
  Webhook,
  Globe,
  Camera,
  PenTool,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  Code,
  Cloud,
  Shield,
  Database,
  Lightbulb,
  TrendingUp,
  Share2,
  Webhook,
  Globe,
  Camera,
  PenTool,
  Rocket,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Code
}
```

- [ ] **Step 4: Commit**

```bash
git add components/portable-text.tsx components/sanity-image.tsx lib/icon-map.ts
git commit -m "feat: add Portable Text renderer, Sanity image component, and icon map"
```

---

## Task 6: Refactor Homepage — Server Wrapper + Client Component

**Files:**
- Modify: `app/page.tsx` (rewrite as server component)
- Create: `components/home-page.tsx` (move existing homepage code here, accept props)

- [ ] **Step 1: Create `components/home-page.tsx`**

Copy the entire contents of the current `app/page.tsx` into `components/home-page.tsx` and modify it to accept props instead of hardcoded data.

The component must:
- Keep `"use client"` directive
- Accept a props interface with `services`, `brands`, `settings` data
- Replace the hardcoded `brands` array with `props.brands`
- Replace hardcoded services in the 3 colored sections with `props.services` filtered by `section`
- Replace hardcoded mission/vision text with `props.settings.mission` and `props.settings.vision`
- Replace hardcoded footer contact info with `props.settings`
- Replace hardcoded structured data with dynamic data from `props.settings`
- Use `getIcon()` from `lib/icon-map.ts` to resolve Lucide icons from string keys

The full props interface:

```typescript
export interface HomePageProps {
  services: Array<{
    _id: string
    title: string
    description: string
    icon: string
    section: 'software' | 'marketing' | 'ai'
    order: number
  }>
  brands: Array<{
    _id: string
    name: string
    color: string
    order: number
  }>
  settings: {
    orgName: string
    companyDescription: string
    mission: string
    vision: string
    contactEmail: string
    phone1: string
    phone2: string
    address: string
    instagramUrl: string
  }
}
```

Key changes inside the component body:

Replace the hardcoded `brands` array:
```typescript
// Before:
const brands = [
  { name: "Studio Miradia", color: "#3B82F6" },
  ...
]
// After: use props.brands directly
```

Replace the 3 service sections. For software section:
```typescript
// Before: hardcoded array of { icon: Code, title: "Custom Software", ... }
// After:
const softwareServices = props.services.filter(s => s.section === 'software')
// Then map over softwareServices, using getIcon(s.icon) for the icon component
```

Same pattern for `marketing` and `ai` sections.

Replace mission/vision:
```typescript
// Before: hardcoded "To empower businesses..."
// After: {props.settings.mission}
```

Replace footer:
```typescript
// Before: hardcoded "company@synergeek.in", phone numbers, address
// After: {props.settings.contactEmail}, {props.settings.phone1}, etc.
```

Replace structured data:
```typescript
// Before: hardcoded structuredData object
// After: build from props.settings
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": props.settings.orgName,
  "description": props.settings.companyDescription,
  // ...etc
}
```

- [ ] **Step 2: Rewrite `app/page.tsx` as server component**

Replace the entire file:

```typescript
// app/page.tsx
import { sanityFetch } from '@/sanity/lib/live'
import { servicesQuery, brandsQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { HomePage } from '@/components/home-page'

export default async function HomePageRoute() {
  const [
    { data: services },
    { data: brands },
    { data: settings },
  ] = await Promise.all([
    sanityFetch({ query: servicesQuery, tags: ['services'] }),
    sanityFetch({ query: brandsQuery, tags: ['brands'] }),
    sanityFetch({ query: siteSettingsQuery, tags: ['siteSettings'] }),
  ])

  return (
    <HomePage
      services={services ?? []}
      brands={brands ?? []}
      settings={settings ?? {
        orgName: 'Synergeek Technologies',
        companyDescription: '',
        mission: '',
        vision: '',
        contactEmail: '',
        phone1: '',
        phone2: '',
        address: '',
        instagramUrl: '',
      }}
    />
  )
}
```

- [ ] **Step 3: Verify homepage loads**

```bash
npm run dev
```

Open `http://localhost:3000` — the homepage should render. If no Sanity content exists yet, sections will be empty. This is expected; we'll seed data in Task 10.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/home-page.tsx
git commit -m "feat: refactor homepage to fetch services, brands, and settings from Sanity"
```

---

## Task 7: Refactor Services Page — Server Wrapper + Client Component

**Files:**
- Modify: `app/services/page.tsx` (rewrite as server component)
- Create: `components/services-page.tsx` (move existing services page, accept props)

- [ ] **Step 1: Create `components/services-page.tsx`**

Copy the entire contents of the current `app/services/page.tsx` into `components/services-page.tsx` and modify to accept props.

Props interface:

```typescript
export interface ServicesPageProps {
  services: string[]
  portfolio: Array<{
    _id: string
    title: string
    description: string
    image: any
    tags: string[]
    aspectRatio: string
    order: number
  }>
  settings: {
    contactEmail: string
    phone1: string
    phone2: string
    address: string
    instagramUrl: string
    orgName: string
    companyDescription: string
  }
}
```

Key changes:
- Replace the hardcoded `services` array with `props.services`
- Replace hardcoded portfolio items with `props.portfolio`
- For portfolio images, use `SanityImage` component with `fill` prop instead of `<Image src={portfolio.image} />`
- Replace footer contact info with `props.settings`
- Replace structured data with dynamic data from `props.settings`

For portfolio images:
```typescript
// Before:
<Image src={portfolio.image} alt={portfolio.title} fill className="object-cover" sizes="..." />
// After:
<SanityImage source={portfolio.image} alt={portfolio.image?.alt || portfolio.title} fill className="object-cover" sizes="..." />
```

- [ ] **Step 2: Rewrite `app/services/page.tsx` as server component**

```typescript
// app/services/page.tsx
import { sanityFetch } from '@/sanity/lib/live'
import { servicesQuery, portfolioQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { ServicesPage } from '@/components/services-page'

export const metadata = {
  title: "Services",
  description: "Explore Synergeek's technology and digital marketing services.",
}

export default async function ServicesPageRoute() {
  const [
    { data: services },
    { data: portfolio },
    { data: settings },
  ] = await Promise.all([
    sanityFetch({ query: servicesQuery, tags: ['services'] }),
    sanityFetch({ query: portfolioQuery, tags: ['portfolio'] }),
    sanityFetch({ query: siteSettingsQuery, tags: ['siteSettings'] }),
  ])

  // Extract service titles for the services list section
  const serviceTitles = (services ?? []).map((s: any) => s.title)

  return (
    <ServicesPage
      services={serviceTitles}
      portfolio={portfolio ?? []}
      settings={settings ?? {
        contactEmail: '',
        phone1: '',
        phone2: '',
        address: '',
        instagramUrl: '',
        orgName: 'Synergeek Technologies',
        companyDescription: '',
      }}
    />
  )
}
```

- [ ] **Step 3: Verify services page loads**

Open `http://localhost:3000/services` — page should render (empty portfolio/services until data is seeded).

- [ ] **Step 4: Commit**

```bash
git add app/services/page.tsx components/services-page.tsx
git commit -m "feat: refactor services page to fetch portfolio and services from Sanity"
```

---

## Task 8: Refactor Contact Page — Server Wrapper + Client Component

**Files:**
- Modify: `app/contact/page.tsx` (rewrite as server component)
- Create: `components/contact-page.tsx` (move existing contact page, accept props)

- [ ] **Step 1: Create `components/contact-page.tsx`**

Copy the entire contents of the current `app/contact/page.tsx` into `components/contact-page.tsx` and modify to accept props.

Props interface:

```typescript
export interface ContactPageProps {
  settings: {
    contactEmail: string
    phone1: string
    phone2: string
    address: string
    instagramUrl: string
    orgName: string
    companyDescription: string
  }
}
```

Key changes:
- Replace all hardcoded contact info (email, phones, address, Instagram link) with `props.settings.*`
- Replace structured data with dynamic data from `props.settings`
- Keep the EmailJS form logic unchanged

- [ ] **Step 2: Rewrite `app/contact/page.tsx` as server component**

```typescript
// app/contact/page.tsx
import { sanityFetch } from '@/sanity/lib/live'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { ContactPage } from '@/components/contact-page'

export const metadata = {
  title: "Contact",
  description: "Get in touch with Synergeek Technologies.",
}

export default async function ContactPageRoute() {
  const { data: settings } = await sanityFetch({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
  })

  return (
    <ContactPage
      settings={settings ?? {
        contactEmail: '',
        phone1: '',
        phone2: '',
        address: '',
        instagramUrl: '',
        orgName: 'Synergeek Technologies',
        companyDescription: '',
      }}
    />
  )
}
```

- [ ] **Step 3: Verify contact page loads**

Open `http://localhost:3000/contact` — form should render and be functional.

- [ ] **Step 4: Commit**

```bash
git add app/contact/page.tsx components/contact-page.tsx
git commit -m "feat: refactor contact page to fetch settings from Sanity"
```

---

## Task 9: Refactor Blog Pages

**Files:**
- Modify: `app/blog/page.tsx`
- Modify: `app/blog/[slug]/page.tsx`
- Delete: `lib/blog.ts`

- [ ] **Step 1: Rewrite `app/blog/page.tsx`**

```typescript
// app/blog/page.tsx
import Link from "next/link"
import { format, parseISO } from "date-fns"
import { sanityFetch } from "@/sanity/lib/live"
import { postsQuery } from "@/sanity/lib/queries"

export const metadata = {
  title: "Blog",
  description: "Insights and guides from Synergeek.",
}

export default async function BlogIndexPage() {
  const { data: posts } = await sanityFetch({
    query: postsQuery,
    tags: ['posts'],
  })

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-32 pb-12">
      <header className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Practical UI/UX, engineering, and product notes—written for builders.
        </p>
      </header>

      <section className="space-y-6">
        {!posts || posts.length === 0 ? (
          <p className="text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          posts.map((post: any) => (
            <article
              key={post._id}
              className="rounded-xl border border-border/60 bg-card/40 p-5"
            >
              <div className="flex flex-col gap-2">
                <div className="text-xs text-muted-foreground">
                  {format(parseISO(post.date), "MMM d, yyyy")}
                </div>

                <h2 className="text-xl font-semibold leading-snug">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="hover:underline underline-offset-4"
                  >
                    {post.title}
                  </Link>
                </h2>

                <p className="text-sm text-muted-foreground">{post.excerpt}</p>

                <div>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-primary hover:underline underline-offset-4"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Rewrite `app/blog/[slug]/page.tsx`**

```typescript
// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation"
import { format, parseISO } from "date-fns"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries"
import { PortableText } from "@/components/portable-text"
import { SanityImage } from "@/components/sanity-image"

export async function generateStaticParams() {
  const { data: posts } = await sanityFetch({
    query: postSlugsQuery,
    tags: ['posts'],
  })

  return (posts ?? []).map((post: any) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
    tags: ['posts'],
  })

  if (!post) return { title: "Post not found" }

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const { data: post } = await sanityFetch({
    query: postBySlugQuery,
    params: { slug },
    tags: ['posts'],
  })

  if (!post) notFound()

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-32 pb-12">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-sm text-muted-foreground hover:underline underline-offset-4"
        >
          ← Back to blog
        </Link>
      </div>

      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
          <div className="mt-3 text-sm text-muted-foreground">
            {format(parseISO(post.date), "MMM d, yyyy")}
          </div>
        </header>

        {post.coverImage && (
          <div className="mb-8 relative aspect-video rounded-lg overflow-hidden">
            <SanityImage
              source={post.coverImage}
              alt={post.coverImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="blog-content">
          <PortableText value={post.body} />
        </div>
      </article>
    </main>
  )
}
```

- [ ] **Step 3: Delete `lib/blog.ts`**

```bash
rm "/Users/srimanikandanr/My Files/Synergeek/Company Website/new_synergeek/lib/blog.ts"
```

- [ ] **Step 4: Verify blog pages load**

Open `http://localhost:3000/blog` — should show empty state. Once you create a post in Studio, it should appear.

- [ ] **Step 5: Commit**

```bash
git add app/blog/ && git rm lib/blog.ts
git commit -m "feat: refactor blog to fetch from Sanity with Portable Text rendering"
```

---

## Task 10: Seed Initial Content in Sanity Studio

This task is done manually in the browser at `http://localhost:3000/studio`.

- [ ] **Step 1: Create Site Settings**

Click "Site Settings" in the sidebar. Fill in:
- Organization Name: `Synergeek Technologies`
- Company Description: `Synergeek Technologies is a technology and digital solutions company that helps businesses build, grow, and scale using modern software, digital strategies, and artificial intelligence.`
- Mission: `To empower businesses with innovative technology and AI-driven solutions that improve efficiency, visibility, and long-term growth.`
- Vision: `To become a trusted global technology partner delivering scalable software, digital solutions, and intelligent AI systems for modern businesses.`
- Contact Email: `company@synergeek.in`
- Phone 1: `+91 96777 41597`
- Phone 2: `+91 97867 63705`
- Address: `182, Subramanium road, RS Puram, Coimbatore.`
- Instagram URL: `https://www.instagram.com/synergeek/`

Click **Publish**.

- [ ] **Step 2: Create Services**

Create each service document. Here are all 8:

| Title | Icon | Section | Order |
|-------|------|---------|-------|
| Custom Software | Code | software | 1 |
| Web Applications | Globe | software | 2 |
| Mobile Apps | Rocket | software | 3 |
| Social Media & Content | Share2 | marketing | 1 |
| Paid Ads & Lead Gen | TrendingUp | marketing | 2 |
| Agentic AI Systems | Webhook | ai | 1 |
| Intelligent Chatbots | Lightbulb | ai | 2 |
| Generative AI | Database | ai | 3 |

Fill the descriptions from the existing hardcoded text in the current homepage. **Publish** each one.

- [ ] **Step 3: Create Brands**

Create 8 brand documents:

| Name | Color | Order |
|------|-------|-------|
| Studio Miradia | #3B82F6 | 1 |
| The Urban Elephant | #8B5CF6 | 2 |
| Sasvi Creation | #10B981 | 3 |
| VIP Polymers | #F59E0B | 4 |
| Kaai Kari | #EF4444 | 5 |
| Bay Body Space | #06B6D4 | 6 |
| Hundreds | #EC4899 | 7 |
| A&D Batters | #14B8A6 | 8 |

**Publish** each one.

- [ ] **Step 4: Create Portfolio items**

Create 8 portfolio documents matching the current hardcoded data. Upload the existing images from `public/` to Sanity. For each:

| Title | Tags | Aspect Ratio | Order |
|-------|------|-------------|-------|
| The Urban Elephant | Web Design, SEO | 16/9 | 1 |
| Sasvi Creation | Web Design, SEO | 16/9 | 2 |
| Hundreds | Branding, Design | 3/2 | 3 |
| Studio Miradia | Web Design, SEO | 16/9 | 4 |
| Ad Batter | Product Design, Development | 4/5 | 5 |
| Bay Body Space | Meta Ads, Google Ads | 18/9 | 6 |
| Kaai Kari | Branding, Design | 4/3 | 7 |
| VIP Polymers | Brochure Design, Printing | 9/12 | 8 |

Fill descriptions from the current hardcoded data. **Publish** each one.

- [ ] **Step 5: Create a test blog post**

Create one blog post to verify the full flow:
- Title: "Welcome to our new blog"
- Slug: Generate from title
- Date: Today
- Excerpt: "We've rebuilt our blog with a modern CMS."
- Body: Write a few paragraphs using the rich text editor.
- **Publish** it.

- [ ] **Step 6: Verify all pages**

- Homepage at `/` — services, brands, mission/vision, footer all populated
- Services at `/services` — services list, portfolio grid populated
- Blog at `/blog` — test post appears
- Blog post at `/blog/welcome-to-our-new-blog` — renders with Portable Text
- Contact at `/contact` — footer contact info populated from settings

---

## Task 11: Configure Sanity Webhook for On-Demand Revalidation

This is done in the Sanity dashboard (manage.sanity.io), not in code.

- [ ] **Step 1: Create webhook**

Go to manage.sanity.io → your project → API → Webhooks → Create Webhook:

- **Name:** `Next.js Revalidation`
- **URL:** `https://www.synergeek.in/api/revalidate` (use your production URL, or Netlify preview URL for testing)
- **Trigger on:** Create, Update, Delete
- **Filter:** Leave empty (trigger on all document types)
- **Projection:** `{_type, slug}`
- **Secret:** The same value as your `SANITY_REVALIDATE_SECRET` env var
- **HTTP Method:** POST
- **API Version:** `2025-03-04`
- **Enabled:** Yes

- [ ] **Step 2: Set env vars in Netlify**

Go to Netlify → Site Settings → Environment Variables. Add:

- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `SANITY_API_READ_TOKEN`
- `SANITY_REVALIDATE_SECRET`

- [ ] **Step 3: Verify revalidation works**

1. Deploy to Netlify
2. Edit a brand name in Sanity Studio
3. Publish the change
4. Reload the homepage — the brand name should be updated within a few seconds

---

## Task 12: Cleanup

**Files:**
- Delete: `lib/blog.ts` (already done in Task 9)
- Keep as archive: `content/blog/*.md`, `content/topics/`, `scripts/generate_daily_post.js`

- [ ] **Step 1: Remove `generate:daily-post` script from `package.json`**

Edit `package.json` — remove this line from `scripts`:
```json
"generate:daily-post": "node scripts/generate_daily_post.js"
```

- [ ] **Step 2: Final verification**

```bash
npm run build
```

Build should complete without errors. If there are TypeScript errors related to removed imports (e.g., `gray-matter`, `remark`), fix them — they should all be resolved by the blog refactor in Task 9.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore: remove daily-post script and clean up unused dependencies"
```
