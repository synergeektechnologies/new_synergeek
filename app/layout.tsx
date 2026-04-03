import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Geist_Mono, Bebas_Neue, Roboto_Condensed } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { VisualEditing } from "next-sanity/visual-editing"
import { draftMode } from "next/headers"
import { SanityLive } from "@/sanity/lib/live"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" })
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: "300", variable: "--font-roboto-condensed" })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.synergeek.in'),
  title: {
    default: "Synergeek Technologies | Build, Grow & Scale with Modern Software & AI",
    template: "%s | Synergeek Technologies"
  },
  description: "Synergeek Technologies is a technology and digital solutions company in India that helps businesses build, grow, and scale using modern software, digital strategies, and artificial intelligence. Specialized in custom software, web/mobile apps, branding, and advanced AI-powered solutions.",
  keywords: [
    "Synergeek",
    "Synergeek Technologies",
    "Technology Solutions India",
    "Digital Solutions India",
    "AI-powered solutions India",
    "Agentic AI",
    "AI Chatbots",
    "Business Automation",
    "Custom Software Development India",
    "Web Development India",
    "Mobile App Development India",
    "Digital Marketing India",
    "Branding",
    "Creative Design",
    "SEO",
    "Software Company Coimbatore",
    "IT Company India",
    "Coimbatore",
    "India"
  ],
  authors: [{ name: "Synergeek Technologies", url: "https://www.synergeek.in" }],
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
    locale: 'en_IN',
    url: 'https://www.synergeek.in',
    siteName: 'Synergeek Technologies',
    title: 'Synergeek Technologies | Build, Grow & Scale with Modern Software & AI',
    description: 'Synergeek Technologies is a technology and digital solutions company in India that helps businesses build, grow, and scale using modern software, digital strategies, and artificial intelligence.',
    images: [
      {
        url: '/synergeek-og.png',
        width: 1200,
        height: 630,
        alt: 'Synergeek Technologies - Software, Digital Solutions & AI in India',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@synergeek',
    creator: '@synergeek',
    title: 'Synergeek Technologies | Build, Grow & Scale with Modern Software & AI',
    description: 'Synergeek Technologies is a technology and digital solutions company in India that helps businesses build, grow, and scale using modern software, digital strategies, and artificial intelligence.',
    images: ['/synergeek-og.png'],
  },
  alternates: {
    canonical: 'https://www.synergeek.in',
  },
  category: 'Technology & Digital Solutions',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/synergeek-og.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isDraftMode = (await draftMode()).isEnabled
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="cfhzzbdcpl610u3v3qsdk9pzox2vss" />
        {/* Google Analytics & Google Ads Conversion ID: AW-16812402326 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F3078JXHG0"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F3078JXHG0');
            gtag('config', 'AW-16812402326/ftygCI3tsdYbEJbN49A-', {
              'phone_conversion_number': '9677741597'
            });
            gtag('config', 'AW-16812402326');
          `}
        </Script>
      </head>
      <body className={`font-sans antialiased ${robotoCondensed.variable}`}>
        <Navigation />
        {children}
        <Toaster />
        {isDraftMode && <VisualEditing />}
        <SanityLive />
      </body>
    </html>
  )
}
