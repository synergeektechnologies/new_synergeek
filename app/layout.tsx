import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Geist_Mono, Bebas_Neue, Roboto_Condensed } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import { Toaster } from "@/components/ui/toaster"

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const bebasNeue = Bebas_Neue({ subsets: ["latin"], weight: "400" })
const robotoCondensed = Roboto_Condensed({ subsets: ["latin"], weight: "300", variable: "--font-roboto-condensed" })

export const metadata: Metadata = {
  title: "Synergeek - Creative Marketing Agency",
  description: "Synergeek is a Creative Marketing Agency, specialized in Digital marketing, Web design and development, Video Production and Branding.",
  keywords: ["Synergeek", "Creative Marketing Agency", "Digital marketing", "Web design and development", "Video Production", "Branding"],
  authors: [{ name: "Synergeek", url: "https://synergeek.com" }],
  openGraph: {
    title: "Synergeek",
    description: "Synergeek is a Creative Marketing Agency, specialized in Digital marketing, Web design and development, Video Production and Branding.",
    url: "https://synergeek.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Synergeek",
    description: "Synergeek is a Creative Marketing Agency, specialized in Digital marketing, Web design and development, Video Production and Branding.",
    images: ["https://synergeek.com/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${robotoCondensed.variable}`}>
        <Navigation />
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
