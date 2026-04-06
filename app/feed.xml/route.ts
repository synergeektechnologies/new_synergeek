import { client } from '@/sanity/lib/client'

const BASE_URL = 'https://www.synergeek.in'

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET() {
  const posts = await client.fetch<
    { title: string; slug: string; date: string; excerpt: string; categories: string[] }[]
  >(`*[_type == "post"] | order(date desc) { title, "slug": slug.current, date, excerpt, categories }`)

  const items = (posts ?? [])
    .map(
      (post) => `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>${
        post.categories?.length
          ? post.categories.map((c) => `\n      <category>${escapeXml(c)}</category>`).join('')
          : ''
      }
    </item>`,
    )
    .join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Synergeek Technologies Blog</title>
    <link>${BASE_URL}/blog</link>
    <description>Insights on software development, AI, digital marketing, and modern technology from Synergeek Technologies.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
