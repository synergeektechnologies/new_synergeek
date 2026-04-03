'use client'

import { PortableText as PortableTextComponent, type PortableTextComponents } from '@portabletext/react'
import { SanityImage } from './sanity-image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <figure className="my-8">
        <SanityImage
          source={value}
          alt={value.alt || ''}
          width={800}
          height={450}
          className="rounded-lg w-full"
        />
        {value.alt && (
          <figcaption className="text-center text-sm text-muted-foreground mt-2">
            {value.alt}
          </figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>,
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-4 hover:text-primary/80"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
  },
}

export function PortableText({ value }: { value: any }) {
  return <PortableTextComponent value={value} components={components} />
}
