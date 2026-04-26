import { sanityFetch } from '@/sanity/lib/live'
import { servicesQuery, brandsQuery, siteSettingsQuery, latestPostsQuery } from '@/sanity/lib/queries'
import { HomePage } from '@/components/home-page'

export default async function HomePageRoute() {
  const [
    { data: services },
    { data: brands },
    { data: settings },
    { data: latestPosts },
  ] = await Promise.all([
    sanityFetch({ query: servicesQuery, tags: ['services'] }),
    sanityFetch({ query: brandsQuery, tags: ['brands'] }),
    sanityFetch({ query: siteSettingsQuery, tags: ['siteSettings'] }),
    sanityFetch({ query: latestPostsQuery, tags: ['posts'] }),
  ])

  return (
    <HomePage
      services={services ?? []}
      brands={brands ?? []}
      latestPosts={latestPosts ?? []}
      settings={settings ?? {
        orgName: 'Synergeek',
        companyDescription: 'A creative marketing agency that turns content, ads, and social into customers — every day.',
        mission: 'To be the creative engine behind brands that refuse to be ignored — turning ideas, content, and ads into measurable growth.',
        vision: 'A world where every business has a creative team that makes it impossible to scroll past.',
        contactEmail: '',
        phone1: '',
        phone2: '',
        address: '',
        instagramUrl: '',
      }}
    />
  )
}
