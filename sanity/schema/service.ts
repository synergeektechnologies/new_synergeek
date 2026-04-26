import { defineField, defineType } from 'sanity'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
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
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon key — recommended for marketing services: "Magnet" (Lead Gen), "Share2" or "Instagram" (SMM), "Megaphone" or "Target" (Ads), "PenTool" or "Sparkles" (Content/Branding), "Search" or "TrendingUp" (SEO). Other available: Bot, Users, MousePointerClick, BarChart3, Hash, Eye, Zap, Lightbulb, Rocket, Camera, MessageSquare, Globe.',
    }),
    defineField({
      name: 'section',
      title: 'Section',
      type: 'string',
      options: {
        list: [
          { title: 'Tier 1 — Get Found', value: 'tier1' },
          { title: 'Tier 2 — Convert', value: 'tier2' },
          { title: 'Tier 3 — Grow', value: 'tier3' },
        ],
        layout: 'dropdown',
      },
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
    select: { title: 'title', subtitle: 'section' },
  },
})
