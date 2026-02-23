import { notFound } from "next/navigation"
import { format, parseISO } from "date-fns"
import { remark } from "remark"
import remarkHtml from "remark-html"
import Link from "next/link"

import { getAllPostSlugs, getPostBySlug } from "@/lib/blog"

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const { meta } = getPostBySlug(slug)
    return {
      title: meta.title,
      description: meta.excerpt,
    }
  } catch {
    return { title: "Post not found" }
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  let post
  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  const processed = await remark().use(remarkHtml).process(post.content)
  const html = processed.toString()

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
          <h1 className="text-3xl font-semibold tracking-tight">{post.meta.title}</h1>
          <div className="mt-3 text-sm text-muted-foreground">
            {format(parseISO(post.meta.date), "MMM d, yyyy")}
          </div>
        </header>

        <div
          className="blog-content"
          // markdown is authored in-repo (trusted)
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </main>
  )
}
