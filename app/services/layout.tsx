import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Our Services — Lead Gen, Ads, SMM, Content & SEO",
  description: "Synergeek's creative marketing services: Social Media Lead Generation, Social Media Management, Performance Marketing (Meta & Google Ads), Content Strategy & Branding, and Search Engine Optimization (SEO).",
  keywords: [
    "Social Media Lead Generation",
    "Social Media Management",
    "Performance Marketing",
    "Meta Ads",
    "Google Ads",
    "Content Strategy",
    "Branding Services",
    "SEO Services",
    "Search Engine Optimization",
    "Lead Generation Services",
    "Marketing Agency India",
    "Creative Agency Coimbatore",
    "Ad Campaigns",
    "Brand Storytelling",
    "Organic Growth"
  ],
  openGraph: {
    title: "Our Services — Lead Gen, Ads, SMM, Content & SEO | Synergeek",
    description: "Synergeek's creative marketing services: Social Media Lead Generation, Social Media Management, Performance Marketing (Meta & Google Ads), Content Strategy & Branding, and Search Engine Optimization (SEO).",
    url: "https://www.synergeek.in/services",
    images: [
      {
        url: "/synergeek-logo.png",
        width: 1200,
        height: 630,
        alt: "Synergeek Services — Creative Marketing Agency",
      },
    ],
  },
  twitter: {
    title: "Our Services — Lead Gen, Ads, SMM, Content & SEO | Synergeek",
    description: "Synergeek's creative marketing services: Social Media Lead Generation, Social Media Management, Performance Marketing (Meta & Google Ads), Content Strategy & Branding, and Search Engine Optimization (SEO).",
    images: ["/synergeek-logo.png"],
  },
  alternates: {
    canonical: "https://www.synergeek.in/services",
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
