# Sanity CMS Integration — Design Spec

## Overview

Integrate Sanity CMS into the Synergeek company website to manage all content — blog posts, services, portfolio, brands, and site-wide settings — through an embedded Sanity Studio at `/studio`, with real-time preview (Visual Editing) and on-demand revalidation.

**Approach:** Next.js App Router + `next-sanity` (Approach A)

## Sanity Schema Design

### Document Types

| Type | Fields | Notes |
|---|---|---|
| **post** | title (string), slug (slug), date (datetime), excerpt (text), body (Portable Text), coverImage (image), categories (array of strings) | Replaces markdown blog posts. Rich text with embedded images. |
| **service** | title (string), description (text), icon (string — Lucide icon key), order (number), section (enum: `software`, `marketing`, `ai`) | Groups into the 3 colored homepage sections |
| **portfolio** | title (string), description (text), image (image), tags (array of strings), aspectRatio (string enum: `16/9`, `4/3`, `3/2`, `4/5`, `9/12`, `18/9`), order (number) | Masonry grid on services page |
| **brand** | name (string), color (string — hex), order (number) | Scrolling ticker on homepage |
| **siteSettings** (singleton) | mission (text), vision (text), companyDescription (text), contactEmail (string), phone1 (string), phone2 (string), address (text), instagramUrl (url), orgName (string), logo (image), ogImage (image) | Global site content — footer, structured data, meta tags |

### Key Decisions

- Icons stored as string keys (e.g. `"Code"`, `"Globe"`) mapped to Lucide components on frontend
- Portfolio `aspectRatio` is a dropdown to maintain masonry layout consistency
- `siteSettings` is a singleton document (one instance)
- Services `section` field determines which colored block they appear in on homepage

## Architecture

### New/Modified File Structure

```
sanity/
├── sanity.config.ts           # Studio config
├── sanity.cli.ts              # CLI config
├── schema/
│   ├── index.ts               # Schema registry
│   ├── post.ts
│   ├── service.ts
│   ├── portfolio.ts
│   ├── brand.ts
│   └── siteSettings.ts
├── lib/
│   ├── client.ts              # Sanity client (published + preview)
│   ├── queries.ts             # All GROQ queries
│   ├── image.ts               # Image URL builder
│   └── live.ts                # Visual Editing config

app/
├── studio/[[...tool]]/page.tsx # Embedded Sanity Studio
├── api/revalidate/route.ts    # Webhook for on-demand revalidation
├── page.tsx                   # Server wrapper → HomePageClient
├── blog/
│   ├── page.tsx               # Fetch from Sanity
│   └── [slug]/page.tsx        # Portable Text rendering
├── services/page.tsx          # Server wrapper → ServicesClient
└── contact/page.tsx           # Server wrapper → ContactClient
```

### Data Flow

```
Content Editor → Sanity Studio (/studio)
       ↓ (save/publish)
Sanity Content Lake (cloud)
       ↓
  ┌────┴────┐
  │ Published │ → GROQ fetch → Server Components → Static pages
  │  Draft    │ → Live Preview → Visual Editing overlay (editor-only)
  └──────────┘
       ↓ (webhook on publish)
  /api/revalidate → revalidateTag() → pages rebuild on-demand
```

### Component Architecture

Pages that use Framer Motion (homepage, services, contact) are split into:
- **Server component** (`app/page.tsx`) — fetches data from Sanity
- **Client component** (`components/home-page.tsx`) — receives data as props, handles animations

Blog pages remain server components (no client-side animations needed).

## Live Preview & Revalidation

### Visual Editing
- Uses `next-sanity`'s `defineLive()` and `SanityLive` component
- Sanity Studio session auto-detected — no manual preview toggle
- Editors see drafts; public visitors see published content only

### On-Demand Revalidation
- Sanity webhook fires on publish/unpublish → `POST /api/revalidate`
- Protected by `SANITY_REVALIDATE_SECRET`
- Cache tags: `"posts"`, `"services"`, `"portfolio"`, `"brands"`, `"siteSettings"`
- All Sanity fetches use `next: { tags: [...] }` for tag-based revalidation

### Studio Auth
- Sanity's built-in auth (email/password or Google)
- No custom auth on Next.js side
- `/studio` route is client-rendered, excluded from static generation

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=   # From sanity init
NEXT_PUBLIC_SANITY_DATASET=      # Usually "production"
SANITY_API_READ_TOKEN=           # For server-side fetches + preview
SANITY_REVALIDATE_SECRET=        # Shared secret for webhook
```

## Dependencies

### Added
- `sanity` — Studio + schema toolkit
- `next-sanity` — Next.js integration
- `@portabletext/react` — Portable Text renderer
- `@sanity/image-url` — Image URL builder

### Removed
- `gray-matter` — no longer reading markdown frontmatter
- `remark` — no longer converting markdown
- `remark-html` — no longer converting markdown to HTML

## Migration & Cleanup

### Removed Files
- `lib/blog.ts` — replaced by Sanity client + GROQ
- `scripts/generate_daily_post.js` — retired (CMS authoring replaces automation)
- `content/topics/` — no longer needed

### Kept as Archive
- `content/blog/*.md` — existing posts preserved, can be re-entered in Studio

### Refactored Files
- `app/page.tsx` — server wrapper + client HomePageClient
- `app/services/page.tsx` — server wrapper + client ServicesClient
- `app/contact/page.tsx` — server wrapper + client ContactClient
- `app/blog/page.tsx` — Sanity fetch instead of filesystem
- `app/blog/[slug]/page.tsx` — Portable Text instead of remark
- `app/layout.tsx` — structured data from siteSettings
- `components/navigation.tsx` — if referencing hardcoded text

### Daily Post Automation
Retired for now. Can be revisited later using Sanity Mutation API if programmatic post creation is needed.
