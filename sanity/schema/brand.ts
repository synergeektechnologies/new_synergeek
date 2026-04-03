import { defineField, defineType } from 'sanity'

export const brandType = defineType({
  name: 'brand',
  title: 'Brand',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex color code (e.g., "#3B82F6")',
      validation: (rule) => rule.required().regex(/^#[0-9A-Fa-f]{6}$/, { name: 'hex color' }),
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
    select: { title: 'name' },
  },
})
