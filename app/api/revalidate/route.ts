import { revalidateTag } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string
      slug?: { current?: string }
    }>(req, process.env.SANITY_REVALIDATE_SECRET)

    if (!isValidSignature) {
      return new NextResponse('Invalid signature', { status: 401 })
    }

    if (!body?._type) {
      return new NextResponse('Bad request', { status: 400 })
    }

    const tagMap: Record<string, string> = {
      post: 'posts',
      service: 'services',
      portfolio: 'portfolio',
      brand: 'brands',
      siteSettings: 'siteSettings',
    }

    const tag = tagMap[body._type]
    if (tag) {
      revalidateTag(tag)
      return NextResponse.json({ revalidated: true, tag })
    }

    return NextResponse.json({ revalidated: false })
  } catch (err) {
    console.error('Revalidation error:', err)
    return new NextResponse('Error', { status: 500 })
  }
}
