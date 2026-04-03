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
