import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services - Digital Marketing, Web Development & Branding",
  description: "Explore Synergeek's comprehensive services including Digital Marketing, Web Design & Development, Video Production, Branding, SEO, Social Media Marketing, Meta Ads, Google Ads, UI/UX Design, and E-commerce Solutions.",
  keywords: [
    "Digital Marketing Services",
    "Web Design Services", 
    "Web Development Services",
    "Video Production Services",
    "Branding Services",
    "SEO Services",
    "Social Media Marketing",
    "Meta Ads Services",
    "Google Ads Services",
    "UI/UX Design Services",
    "App Development Services",
    "E-commerce Solutions",
    "Content Production",
    "Product Photography",
    "Model Shoots",
    "Influencer Marketing",
    "Ad Campaigns",
    "Search Engine Optimization"
  ],
  openGraph: {
    title: "Our Services - Digital Marketing, Web Development & Branding | Synergeek",
    description: "Explore Synergeek's comprehensive services including Digital Marketing, Web Design & Development, Video Production, Branding, SEO, Social Media Marketing, Meta Ads, Google Ads, UI/UX Design, and E-commerce Solutions.",
    url: "https://synergeektechnologies.in/services",
    images: [
      {
        url: "/synergeek-logo.png",
        width: 1200,
        height: 630,
        alt: "Synergeek Services - Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    title: "Our Services - Digital Marketing, Web Development & Branding | Synergeek",
    description: "Explore Synergeek's comprehensive services including Digital Marketing, Web Design & Development, Video Production, Branding, SEO, Social Media Marketing, Meta Ads, Google Ads, UI/UX Design, and E-commerce Solutions.",
    images: ["/synergeek-logo.png"],
  },
  alternates: {
    canonical: "https://synergeektechnologies.in/services",
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
