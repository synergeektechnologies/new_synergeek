import { sanityFetch } from '@/sanity/lib/live'
import { siteSettingsQuery } from '@/sanity/lib/queries'
import { ContactPage } from '@/components/contact-page'


export default async function ContactPageRoute() {
  const { data: settings } = await sanityFetch({
    query: siteSettingsQuery,
    tags: ['siteSettings'],
  })

  return (
    <ContactPage
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
