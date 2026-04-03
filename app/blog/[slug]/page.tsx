import { notFound } from "next/navigation"
import { format, parseISO } from "date-fns"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"
import { postBySlugQuery, postSlugsQuery } from "@/sanity/lib/queries"
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
    authors: [{ name: "Synergeek Technologies", url: BASE_URL }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/blog/${slug}`,
      siteName: "Synergeek Technologies",
      publishedTime: post.date,
      authors: ["Synergeek Technologies"],
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
      name: "Synergeek Technologies",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Synergeek Technologies",
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
      </article>
    </main>
  )
}
