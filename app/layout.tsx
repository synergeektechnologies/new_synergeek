import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Geist_Mono, Bebas_Neue, Roboto_Condensed } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" })
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: "300", variable: "--font-roboto-condensed" })

export const metadata: Metadata = {
  metadataBase: new URL('https://synergeektechnologies.in'),
  title: {
    default: "Synergeek - Creative Marketing Agency | Digital Marketing & Web Development",
    template: "%s | Synergeek Technologies"
  },
  description: "Synergeek is a Creative Marketing Agency specialized in Digital Marketing, Web Design & Development, Video Production, Branding, SEO, and E-commerce Solutions. Based in Coimbatore, India.",
  keywords: [
    "Synergeek", 
    "Creative Marketing Agency", 
    "Digital Marketing", 
    "Web Design", 
    "Web Development", 
    "Video Production", 
    "Branding", 
    "SEO", 
    "E-commerce Solutions",
    "Social Media Marketing",
    "Meta Ads",
    "Google Ads",
    "UI/UX Design",
    "App Development",
    "Coimbatore",
    "India"
  ],
  authors: [{ name: "Synergeek Technologies", url: "https://synergeektechnologies.in" }],
  creator: "Synergeek Technologies",
  publisher: "Synergeek Technologies",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://synergeektechnologies.in',
    siteName: 'Synergeek Technologies',
    title: 'Synergeek - Creative Marketing Agency | Digital Marketing & Web Development',
    description: 'Synergeek is a Creative Marketing Agency specialized in Digital Marketing, Web Design & Development, Video Production, Branding, SEO, and E-commerce Solutions.',
    images: [
      {
        url: '/synergeek-logo.png',
        width: 1200,
        height: 630,
        alt: 'Synergeek Technologies - Creative Marketing Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@synergeek',
    creator: '@synergeek',
    title: 'Synergeek - Creative Marketing Agency | Digital Marketing & Web Development',
    description: 'Synergeek is a Creative Marketing Agency specialized in Digital Marketing, Web Design & Development, Video Production, Branding, SEO, and E-commerce Solutions.',
    images: ['/synergeek-logo.png'],
  },
  alternates: {
    canonical: 'https://synergeektechnologies.in',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F3078JXHG0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F3078JXHG0');
          `}
        </Script>
      </head>
      <body className={`font-sans antialiased ${robotoCondensed.variable}`}>
        <Navigation />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
