import Image from 'next/image'
import { urlFor } from '@/sanity/lib/image'

interface SanityImageProps {
  source: any
  alt: string
  width?: number
  height?: number
  fill?: boolean
  sizes?: string
  className?: string
  priority?: boolean
}

export function SanityImage({
  source,
  alt,
  width,
  height,
  fill,
  sizes,
  className,
  priority,
}: SanityImageProps) {
  if (!source?.asset) return null

  const imageUrl = urlFor(source)
    .auto('format')
    .quality(80)
    .url()

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        sizes={sizes}
        className={className}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width || 800}
      height={height || 450}
      sizes={sizes}
      className={className}
      priority={priority}
    />
  )
}
