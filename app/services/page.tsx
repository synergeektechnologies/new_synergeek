import { sanityFetch } from '@/sanity/lib/live'
import { servicesQuery, portfolioQuery, siteSettingsQuery } from '@/sanity/lib/queries'
import { ServicesPage } from '@/components/services-page'


export default async function ServicesPageRoute() {
  const [
    { data: services },
    { data: portfolio },
    { data: settings },
  ] = await Promise.all([
    sanityFetch({ query: servicesQuery, tags: ['services'] }),
    sanityFetch({ query: portfolioQuery, tags: ['portfolio'] }),
    sanityFetch({ query: siteSettingsQuery, tags: ['siteSettings'] }),
  ])

  const serviceTitles = (services ?? []).map((s: any) => s.title)

  return (
    <ServicesPage
      services={serviceTitles}
      portfolio={portfolio ?? []}
      settings={settings ?? {
        contactEmail: '',
        phone1: '',
        phone2: '',
        address: '',
        instagramUrl: '',
        orgName: 'Synergeek',
        companyDescription: 'A creative marketing agency that turns content, ads, and social into customers — every day.',
      }}
    />
  )
}
