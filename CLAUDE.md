# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Synergeek company website — a Next.js 16 App Router site deployed on Netlify. Marketing/services site with an automated markdown-driven blog.

## Commands

```bash
npm run dev              # Dev server
npm run build            # Production build
npm run lint             # ESLint
npm start                # Run production build locally
npm run generate:daily-post  # Generate daily blog post (used by GitHub Actions)
```

## Tech Stack

- **Next.js 16** (App Router) with React 19, TypeScript
- **TailwindCSS v4** (PostCSS-based, not tailwind.config.js)
- **shadcn/ui** (new-york style, neutral base color, CSS variables) — 59 components in `components/ui/`
- **Framer Motion** for scroll-based animations
- **React Hook Form + Zod** for form validation
- **EmailJS** for contact form submission (no backend API routes)
- **Remark + Remark-HTML** for markdown blog rendering

## Architecture

### Routing

| Route | Rendering | Notes |
|-------|-----------|-------|
| `/` | Client component | Hero with Framer Motion scroll animations |
| `/blog` | Server component | Blog listing |
| `/blog/[slug]` | Static (SSG via `generateStaticParams`) | Markdown-rendered posts |
| `/services` | Server component | Services showcase |
| `/contact` | Client component | EmailJS-powered form |

### Key Directories

- `app/` — Next.js App Router pages and layouts
- `components/ui/` — shadcn/ui components (managed by shadcn CLI, avoid manual edits)
- `lib/blog.ts` — Blog utilities: reads markdown from `content/blog/`, parses frontmatter
- `lib/emailjs-config.ts` — EmailJS service/template IDs
- `content/blog/` — Markdown blog posts with YAML frontmatter
- `content/topics/` — JSON topic definitions for automated daily post generation
- `scripts/generate_daily_post.js` — GitHub Actions script for daily blog posts

### Conventions

- **Path alias**: `@/*` maps to project root
- **File naming**: kebab-case for files, PascalCase for component exports
- **Theme**: OKLch color system with CSS variables in `globals.css`, dark-only theme
- **Fonts**: Space Grotesk (body), Bebas Neue (condensed headers), Roboto Condensed (variable)
- **SEO**: Metadata defined per-page, JSON-LD structured data via `components/structured-data.tsx`

### Build Notes

- `next.config.mjs` has `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`
- Netlify deploys from `.next` via `@netlify/plugin-nextjs`
- Google Analytics (GA-F3078JXHG0) and Facebook domain verification are in root layout
