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
        orgName: 'Synergeek Technologies',
        companyDescription: '',
        mission: '',
        vision: '',
        contactEmail: '',
        phone1: '',
        phone2: '',
        address: '',
        instagramUrl: '',
      }}
    />
  )
}
