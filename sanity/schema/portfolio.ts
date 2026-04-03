import { defineField, defineType } from 'sanity'

export const portfolioType = defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      validation: (rule) => rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9', value: '16/9' },
          { title: '4:3', value: '4/3' },
          { title: '3:2', value: '3/2' },
          { title: '4:5', value: '4/5' },
          { title: '9:16', value: '9/16' },
          { title: '9:12', value: '9/12' },
          { title: '18:9', value: '18/9' },
        ],
      },
      initialValue: '16/9',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', media: 'image' },
  },
})
