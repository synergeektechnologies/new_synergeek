import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Get Your Project Started | Synergeek Technologies",
  description: "Contact Synergeek Technologies for Digital Marketing, Web Development, Branding, and Creative Services. Located in Coimbatore, India. Get a free consultation for your project.",
  keywords: [
    "Contact Synergeek",
    "Digital Marketing Consultation",
    "Web Development Consultation", 
    "Branding Consultation",
    "Creative Agency Contact",
    "Coimbatore Digital Agency",
    "India Marketing Agency",
    "Project Consultation",
    "Free Quote",
    "Business Inquiry"
  ],
  openGraph: {
    title: "Contact Us - Get Your Project Started | Synergeek Technologies",
    description: "Contact Synergeek Technologies for Digital Marketing, Web Development, Branding, and Creative Services. Located in Coimbatore, India. Get a free consultation for your project.",
    url: "https://synergeektechnologies.in/contact",
    images: [
      {
        url: "/synergeek-logo.png",
        width: 1200,
        height: 630,
        alt: "Contact Synergeek Technologies - Digital Marketing Agency",
      },
    ],
  },
  twitter: {
    title: "Contact Us - Get Your Project Started | Synergeek Technologies",
    description: "Contact Synergeek Technologies for Digital Marketing, Web Development, Branding, and Creative Services. Located in Coimbatore, India. Get a free consultation for your project.",
    images: ["/synergeek-logo.png"],
  },
  alternates: {
    canonical: "https://synergeektechnologies.in/contact",
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
