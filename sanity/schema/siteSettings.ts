import { defineField, defineType } from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'orgName',
      title: 'Organization Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'companyDescription',
      title: 'Company Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'mission',
      title: 'Mission Statement',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'vision',
      title: 'Vision Statement',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'phone1',
      title: 'Phone 1',
      type: 'string',
    }),
    defineField({
      name: 'phone2',
      title: 'Phone 2',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'instagramUrl',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Site Settings' }
    },
  },
})
