import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Geist_Mono, Bebas_Neue, Roboto_Condensed } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" })
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: "300", variable: "--font-roboto-condensed" })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.synergeek.in'),
  title: {
    default: "Synergeek - Creative Marketing Agency | Digital Marketing & Web Development",
    template: "%s | Synergeek Technologies"
  },
  description: "Synergeek Technologies is a technology and digital solutions company that helps businesses build, grow, and scale using modern software, digital strategies, and artificial intelligence. Specialized in custom software, web/mobile apps, branding, and advanced AI-powered solutions.",
  keywords: [
    "Synergeek",
    "Synergeek Technologies",
    "Technology Solutions",
    "Digital Solutions",
    "AI-powered solutions",
    "Agentic AI",
    "AI Chatbots",
    "Business Automation",
    "Custom Software Development",
    "Web Development",
    "Mobile App Development",
    "Digital Marketing",
    "Branding",
    "Creative Design",
    "SEO",
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
    locale: 'en_US',
    url: 'https://www.synergeek.in',
    siteName: 'Synergeek Technologies',
    title: 'Synergeek - Creative Marketing Agency | Digital Marketing & Web Development',
    description: 'Synergeek is a Creative Marketing Agency specialized in Digital Marketing, Web Design & Development, Video Production, Branding, SEO, and E-commerce Solutions.',
    images: [
      {
        url: '/synergeek-og.png',
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
    images: ['/synergeek-og.png'],
  },
  alternates: {
    canonical: 'https://www.synergeek.in',
  },
  category: 'Creative Marketing Agency',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/synergeek-og.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="cfhzzbdcpl610u3v3qsdk9pzox2vss" />
        {/* Google Analytics & Google Ads Conversion ID: AW-16812402326 */}
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
      </body>
    </html>
  )
}
