import Link from "next/link"
import { format, parseISO } from "date-fns"
import { sanityFetch } from "@/sanity/lib/live"
import { postsQuery } from "@/sanity/lib/queries"

import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog — Marketing, Growth & Creative Strategy",
  description: "Practical playbooks on lead generation, paid ads, social media, content strategy, branding, and SEO from the team at Synergeek.",
  keywords: [
    "Synergeek Blog",
    "Marketing Insights",
    "Lead Generation Tips",
    "Performance Marketing",
    "Social Media Strategy",
    "Content Strategy",
    "Branding Guides",
    "SEO Tips",
  ],
  openGraph: {
    title: "Blog — Marketing, Growth & Creative Strategy | Synergeek",
    description: "Practical playbooks on lead generation, paid ads, social media, content strategy, branding, and SEO from the team at Synergeek.",
    url: "https://www.synergeek.in/blog",
    images: [
      {
        url: "/synergeek-og.png",
        width: 1200,
        height: 630,
        alt: "Synergeek Blog — Marketing & Growth Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Marketing, Growth & Creative Strategy | Synergeek",
    description: "Practical playbooks on lead generation, paid ads, social media, content strategy, branding, and SEO from the team at Synergeek.",
    images: ["/synergeek-og.png"],
  },
  alternates: {
    canonical: "https://www.synergeek.in/blog",
  },
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
          Marketing playbooks, growth experiments, and creative strategy — written for brands.
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

                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {post.categories.map((category: string) => (
                      <span
                        key={category}
                        className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}

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
