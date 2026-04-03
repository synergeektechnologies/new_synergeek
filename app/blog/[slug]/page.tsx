import { notFound } from "next/navigation"
import { format, parseISO } from "date-fns"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries"
import { PortableText } from "@/components/portable-text"
import { SanityImage } from "@/components/sanity-image"

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`)
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
