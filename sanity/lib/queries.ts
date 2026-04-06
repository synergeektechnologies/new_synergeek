import { defineQuery } from 'next-sanity'

export const postsQuery = defineQuery(
  `*[_type == "post"] | order(date desc) {
    _id,
    title,
    "slug": slug.current,
    date,
    excerpt,
    coverImage,
    categories
  }`
)

export const postBySlugQuery = defineQuery(
  `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    date,
    excerpt,
    coverImage,
    categories,
    body
  }`
)

export const postSlugsQuery = defineQuery(
  `*[_type == "post"] { "slug": slug.current }`
)

export const relatedPostsQuery = defineQuery(
  `*[_type == "post" && slug.current != $slug && count((categories[])[@ in $categories]) > 0] | order(date desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    date,
    excerpt
  }`
)

export const adjacentPostsQuery = defineQuery(
  `{
    "prev": *[_type == "post" && date > $date] | order(date asc) [0] {
      title, "slug": slug.current
    },
    "next": *[_type == "post" && date < $date] | order(date desc) [0] {
      title, "slug": slug.current
    }
  }`
)

export const latestPostsQuery = defineQuery(
  `*[_type == "post"] | order(date desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    date,
    excerpt,
    categories
  }`
)

export const servicesQuery = defineQuery(
  `*[_type == "service"] | order(order asc) {
    _id,
    title,
    description,
    icon,
    section,
    order
  }`
)

export const portfolioQuery = defineQuery(
  `*[_type == "portfolio"] | order(order asc) {
    _id,
    title,
    description,
    image,
    tags,
    aspectRatio,
    order
  }`
)

export const brandsQuery = defineQuery(
  `*[_type == "brand"] | order(order asc) {
    _id,
    name,
    color,
    order
  }`
)

export const siteSettingsQuery = defineQuery(
  `*[_type == "siteSettings"][0] {
    _id,
    orgName,
    companyDescription,
    mission,
    vision,
    contactEmail,
    phone1,
    phone2,
    address,
    instagramUrl,
    logo,
    ogImage
  }`
)
