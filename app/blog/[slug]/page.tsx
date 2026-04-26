import { notFound } from "next/navigation"
import { format, parseISO } from "date-fns"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { postBySlugQuery, postSlugsQuery, relatedPostsQuery, adjacentPostsQuery } from "@/sanity/lib/queries"
import { PortableText } from "@/components/portable-text"
import { SanityImage } from "@/components/sanity-image"
import { StructuredData } from "@/components/structured-data"
import { urlFor } from "@/sanity/lib/image"

const BASE_URL = "https://www.synergeek.in"

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

  const ogImage = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1200).height(630).auto('format').quality(80).url()
    : `${BASE_URL}/synergeek-og.png`

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.categories ?? [],
    authors: [{ name: "Synergeek", url: BASE_URL }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      siteName: "Synergeek",
      publishedTime: post.date,
      authors: ["Synergeek"],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
    alternates: {
      canonical: `${BASE_URL}/blog/${slug}`,
    },
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

  const [{ data: relatedPosts }, { data: adjacentPosts }] = await Promise.all([
    sanityFetch({
      query: relatedPostsQuery,
      params: { slug, categories: post.categories ?? [] },
      tags: ['posts'],
    }),
    sanityFetch({
      query: adjacentPostsQuery,
      params: { date: post.date },
      tags: ['posts'],
    }),
  ])

  const ogImage = post.coverImage?.asset
    ? urlFor(post.coverImage).width(1200).height(630).auto('format').quality(80).url()
    : `${BASE_URL}/synergeek-og.png`

  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Synergeek",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Synergeek",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/synergeek-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
    ...(ogImage && {
      image: {
        "@type": "ImageObject",
        url: ogImage,
        width: 1200,
        height: 630,
      },
    }),
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${BASE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${BASE_URL}/blog/${slug}`,
      },
    ],
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-4 pt-32 pb-12">
      <StructuredData data={blogPostingSchema} />
      <StructuredData data={breadcrumbSchema} />

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

        {post.categories && post.categories.length > 0 && (
          <footer className="mt-10 pt-6 border-t border-border/60">
            <div className="flex flex-wrap gap-2">
              {post.categories.map((category: string) => (
                <span
                  key={category}
                  className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  {category}
                </span>
              ))}
            </div>
          </footer>
        )}
      </article>

      {relatedPosts && relatedPosts.length > 0 && (
        <section className="mt-16 pt-10 border-t border-border/60">
          <h2 className="text-xl font-semibold tracking-tight mb-6">Related Articles</h2>
          <div className="space-y-4">
            {relatedPosts.map((related: any) => (
              <article
                key={related._id}
                className="rounded-xl border border-border/60 bg-card/40 p-5"
              >
                <div className="text-xs text-muted-foreground mb-1">
                  {format(parseISO(related.date), "MMM d, yyyy")}
                </div>
                <h3 className="text-lg font-semibold leading-snug">
                  <Link
                    href={`/blog/${related.slug}`}
                    className="hover:underline underline-offset-4"
                  >
                    {related.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{related.excerpt}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {(adjacentPosts?.prev || adjacentPosts?.next) && (
        <nav className="mt-12 pt-8 border-t border-border/60 grid grid-cols-2 gap-4">
          {adjacentPosts.prev ? (
            <Link
              href={`/blog/${adjacentPosts.prev.slug}`}
              className="group text-left"
            >
              <span className="text-xs text-muted-foreground">← Previous</span>
              <p className="text-sm font-medium group-hover:underline underline-offset-4 line-clamp-2">
                {adjacentPosts.prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {adjacentPosts.next && (
            <Link
              href={`/blog/${adjacentPosts.next.slug}`}
              className="group text-right"
            >
              <span className="text-xs text-muted-foreground">Next →</span>
              <p className="text-sm font-medium group-hover:underline underline-offset-4 line-clamp-2">
                {adjacentPosts.next.title}
              </p>
            </Link>
          )}
        </nav>
      )}
    </main>
  )
}
