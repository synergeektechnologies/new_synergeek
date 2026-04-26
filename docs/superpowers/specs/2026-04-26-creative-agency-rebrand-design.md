# Synergeek Creative Agency Rebrand — Design

**Date**: 2026-04-26
**Status**: Approved
**Scope**: Pivot Synergeek from a tech/software/AI company to a creative marketing agency.

## 1. Brand identity

- Name everywhere: `Synergeek Technologies` → `Synergeek`
- Positioning: *Creative marketing agency in India*
- New 3-color palette (replaces current red/orange/purple):
  - Electric Violet `#7C3AED` — Tier 1 ("Get Found")
  - Hot Coral `#FF5C5C` — Tier 2 ("Convert")
  - Bold Yellow `#FFD60A` — Tier 3 ("Grow")
- Black background sections (skills, mission, footer) remain black.
- Logo, favicon, and `/synergeek-og.png` are explicitly **out of scope** for this change.

## 2. Service tiers (home page sticky-scroll structure)

The current 3-section sticky scroll is preserved structurally and reused for new tiers:

| Tier | Color | Heading | Subhead | Services |
|---|---|---|---|---|
| 1 | Electric Violet `#7C3AED` | GET FOUND | Be the answer when your customers search. | Search Engine Optimization (SEO) |
| 2 | Hot Coral `#FF5C5C` | CONVERT | Turn attention into qualified leads. | Social Media Lead Generation; Performance Marketing (Ads) |
| 3 | Bold Yellow `#FFD60A` | GROW | Keep them coming back. | Social Media Management; Content Strategy & Branding |

Tier 1 has only one service. To prevent a sparse layout, the SEO card is widened and 3 sub-bullets are shown beneath the description: "Keyword research", "On-page optimization", "Link building".

## 3. Service descriptions (canonical copy)

1. **Social Media Lead Generation** — Turning your social media into a system that consistently generates leads.
2. **Social Media Management** — Complete handling of your content, posting, and growth strategy.
3. **Performance Marketing (Ads)** — Running targeted ad campaigns to bring in qualified leads.
4. **Content Strategy & Branding** — Creating content plans that attract, engage, and convert your audience.
5. **Search Engine Optimization (SEO)** — Improving your online visibility and driving organic traffic.

## 4. Hero copy

- Big word: `SYNERGEEK` (unchanged)
- Subhead: *A creative marketing agency that turns content, ads, and social into customers — every day.*

## 5. "OUR SKILLS COVER" rolling strip

Replace the 8 tech-themed items with:

1. LEAD GENERATION
2. SOCIAL MEDIA MANAGEMENT
3. PERFORMANCE MARKETING
4. CONTENT STRATEGY
5. SEO & ORGANIC GROWTH
6. BRAND STORYTELLING
7. AD CREATIVE
8. ANALYTICS & GROWTH

## 6. Mission / Vision (Sanity content)

- **Mission**: To be the creative engine behind brands that refuse to be ignored — turning ideas, content, and ads into measurable growth.
- **Vision**: A world where every business has a creative team that makes it impossible to scroll past.

## 7. SEO metadata (`app/layout.tsx`)

- Title (default): `Synergeek | Creative Marketing Agency in India`
- Title template: `%s | Synergeek`
- Description: `Synergeek is a creative marketing agency in India turning social media, ads, and content into measurable growth. Lead generation, SMM, performance marketing, content strategy, and SEO.`
- Keywords: rewritten around marketing terms — lead generation, social media marketing, performance marketing, ads, content strategy, branding, SEO, creative agency, marketing agency India, Coimbatore, etc.
- OG/Twitter title + description aligned with above.
- Structured data (`hasOfferCatalog`) rewritten to list the 5 new services.

## 8. Blog

- Delete all existing posts in `content/blog/`.
- Replace `content/topics/*.json` with marketing-themed topics: lead generation tactics, ad strategy, SEO, content trends, social media growth, brand storytelling.
- Update `scripts/generate_daily_post.js` if it has any tech-specific prompts/copy.
- Home page "Latest from Blog" subhead → *Insights on marketing, growth, and creative strategy*.

## 9. Sanity CMS — content the user will update

User will update the following in Sanity Studio (no code changes required for the content itself, only for schema enum changes):

- **Site Settings**:
  - `orgName` → `Synergeek`
  - `companyDescription` → hero subhead text
  - `mission` → see §6
  - `vision` → see §6
- **Services**: Delete the old entries (software / marketing / AI). Create 5 new entries with the new tier values from §10.

## 10. Sanity schema change

The current `services` schema uses a section enum: `software | marketing | ai`. Update to: `tier1 | tier2 | tier3`. The home page filtering code is updated to match.

## 11. Files in scope

- `components/home-page.tsx` — colors, tier labels, headings/subheads, skills strip, blog subhead, footer copyright, structured-data
- `components/services-page.tsx` — heading copy, structured-data, footer copyright, accent color
- `components/contact-page.tsx` — branding/copy
- `components/navigation.tsx` — branding
- `app/layout.tsx` — metadata
- `app/services/layout.tsx`, `app/contact/layout.tsx` — page metadata
- `sanity/schema/*` — rename section enum
- `sanity/lib/queries.ts` — adjust if section values are referenced
- `scripts/generate_daily_post.js`, `content/topics/*.json` — pivot to marketing topics
- `content/blog/*.md` — delete all
- `app/sitemap.ts`, `app/feed.xml/route.ts`, `app/robots.ts` — verify, likely no change

## 12. Out of scope

- Logo image, favicon, OG image regeneration
- Contact info: address, phones, email, Instagram URL — unchanged
- Backend / form integrations — unchanged
- Light theme / dark theme toggle — site stays dark-only
