import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us — Let's Grow Your Brand | Synergeek",
  description: "Contact Synergeek for Lead Generation, Social Media Management, Performance Marketing, Content Strategy, and SEO. Located in Coimbatore, India. Get a free consultation for your brand.",
  keywords: [
    "Contact Synergeek",
    "Marketing Agency Contact",
    "Lead Generation Consultation",
    "Social Media Marketing Consultation",
    "Performance Marketing Consultation",
    "SEO Consultation",
    "Coimbatore Marketing Agency",
    "India Marketing Agency",
    "Free Consultation",
    "Brand Inquiry"
  ],
  openGraph: {
    title: "Contact Us — Let's Grow Your Brand | Synergeek",
    description: "Contact Synergeek for Lead Generation, Social Media Management, Performance Marketing, Content Strategy, and SEO. Located in Coimbatore, India. Get a free consultation for your brand.",
    url: "https://www.synergeek.in/contact",
    images: [
      {
        url: "/synergeek-logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Synergeek — Creative Marketing Agency",
      },
    ],
  },
  twitter: {
    title: "Contact Us — Let's Grow Your Brand | Synergeek",
    description: "Contact Synergeek for Lead Generation, Social Media Management, Performance Marketing, Content Strategy, and SEO. Located in Coimbatore, India. Get a free consultation for your brand.",
    images: ["/synergeek-logo.png"],
  },
  alternates: {
    canonical: "https://www.synergeek.in/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
