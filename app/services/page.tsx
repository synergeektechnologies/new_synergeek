"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, ArrowUp, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { StructuredData } from "@/components/structured-data"

export default function ServicesPage() {
  const letters = "SERVICES".split("")

  const servicesStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Digital Marketing & Creative Services",
    "description": "Comprehensive digital marketing and creative services including web development, branding, video production, and SEO",
    "provider": {
      "@type": "Organization",
      "name": "Synergeek Technologies",
      "url": "https://synergeektechnologies.in",
      "logo": "https://synergeektechnologies.in/synergeek-logo.png"
    },
    "serviceType": "Digital Marketing Services",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Digital Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "UI/UX Design",
            "description": "Create engaging and user-friendly interfaces for your products and services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "App Development",
            "description": "Custom mobile applications to showcase your products and services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Design & Development",
            "description": "Create stunning and responsive websites to showcase your products and services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Media Marketing",
            "description": "Grow your brand on social media with targeted campaigns"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Meta Ads & Google Ads",
            "description": "Create targeted ads to reach your audience and drive conversions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Video Production",
            "description": "Create engaging videos to showcase your products"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Product Photography",
            "description": "Create engaging product photography to showcase your products"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Model and Influencer Shoots",
            "description": "Create engaging model and influencer shoots to showcase your products"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Branding",
            "description": "Complete branding solutions for your business"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Content Production",
            "description": "Create engaging content to showcase your products and services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ad Campaigns",
            "description": "Strategic advertising campaigns to grow your business"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Search Engine Optimization",
            "description": "Improve your website's visibility in search engine results"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Solutions",
            "description": "Complete e-commerce platform development and optimization"
          }
        }
      ]
    }
  }

  const services = [
    "UI/UX Design",
    "App Development", 
    "Web Design & Development",
    "Social Media Marketing",
    "Meta Ads & Google Ads",
    "Video Production",
    "Product Photography",
    "Model and Influencer Shoots",
    "Branding",
    "Content Production",
    "Ad Campaigns",
    "Search Engine Optimization",
    "E-commerce Solutions",
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      <StructuredData data={servicesStructuredData} />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20 bg-black">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8">
              <span className="block text-balance flex justify-center gap-1">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, rotateX: -90 }}
                    animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                    transition={{
                      duration: 1,
                      delay: 0.3 + index * 0.08,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.3 },
                    }}
                    className="inline-block cursor-pointer text-white"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-md md:text-lg mt-[-30px] lg:text-xl text-muted-foreground max-w-4xl mx-auto mb-12 leading-relaxed text-balance"
            style={{ fontFamily: "var(--font-roboto-condensed)" }}
          >
            We are a Creative Marketing Agency, specialized in Digital marketing, Web design and development, Video Production and Branding.
          </motion.p>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative min-h-screen bg-black">
        <div className="relative z-10 min-h-screen flex items-center justify-center py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-7xl bg-white rounded-[32px] shadow-2xl overflow-hidden"
          >
            {/* Split Screen Layout */}
            <div className="flex flex-col lg:flex-row min-h-[80vh]">
              {/* Left Side - "OUR SERVICES" Text */}
              <div className="lg:w-[45%] bg-white p-8 md:p-12 lg:p-16 flex items-center justify-center">
                <div className="w-full">
                  <h2
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-[0.85] text-black"
                    style={{ fontFamily: "var(--font-condensed)" }}
                  >
                    <span className="block">OUR</span>
                    <br />
                    <span className="block mt-[-30px] lg:mt-[-70px]">SERVICES</span>
                  </h2>
                </div>
              </div>

              {/* Right Side - Scrollable Services List */}
              <div className="lg:w-[55%] bg-white p-6 md:p-8 lg:p-12 xl:p-16 overflow-y-auto max-h-[60vh] lg:max-h-none">
                <div className="space-y-0">
                  {services.map((service, index) => (
                    <motion.div
                      key={service}
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="py-4 md:py-6 border-b border-gray-200"
                    >
                      <div className="flex items-center">
                        <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-900">
                          {service}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="relative min-h-screen bg-black py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Portfolio Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6"
              style={{ fontFamily: "var(--font-condensed)" }}
            >
              PORTFOLIO
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our creative work and see the magic we bring to every project
            </p>
          </motion.div>

          {/* Portfolio Grid - Masonry Style */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {/* Portfolio Items - Reordered for better visual balance */}
            {[
              {
                image: "/urbanelephant.png",
                title: " The Urban Elephant",
                description: "Website development and SEO optimization for The Urban Elephant.",
                tags: ["Web Design", "SEO"],
                aspectRatio: "16/9"
              },
              {
                image: "/sasvicreation.png",
                title: "Sasvi Creation",
                description: "Website development and SEO optimization for Sasvi Creation.",
                tags: ["Web Design", "SEO"],
                aspectRatio: "16/9"
              },
              {
                image: "/hundreds.svg",
                title: "Hundreds",
                description: "Logo design and branding for Hundreds.",
                tags: ["Branding", "Design"],
                aspectRatio: "3/2"
              },
              {
                image: "/studiomiradia.png",
                title: "Studio Miradia",
                description: "Ecommerce website development and SEO optimization for Studio Miradia.",
                tags: ["Web Design", "SEO"],
                aspectRatio: "16/9"
              },
              {
                image: "/adbatter.jpeg",
                title: "Ad Batter",
                description: "Product design and development for Ad Batter.",
                tags: ["Product Design", "Development"],
                aspectRatio: "4/5"
              },
              {
                image: "/baybodyspace.jpeg",
                title: "Bay Body Space",
                description: "Meta Ads and Google Ads for Bay Body Space.",
                tags: ["Meta Ads", "Google Ads"],
                aspectRatio: "18/9"
              },
              {
                image: "/kaaikari.jpeg",
                title: "Kaai Kari",
                description: "Logo design and branding for Kaai Kari.",
                tags: ["Branding", "Design"],
                aspectRatio: "4/3"
              },
              {
                image: "/vippolymers.jpg",
                title: "VIP Polymers",
                description: "Brochure design and printing for VIP Polymers.",
                tags: ["Brochure Design", "Printing"],
                aspectRatio: "9/12"
              }
            ].map((portfolio, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  y: -200,
                  scale: 0.8,
                  rotateX: -90
                }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  scale: 1,
                  rotateX: 0
                }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  mass: 0.8,
                  bounce: 0.3
                }}
                whileHover={{ 
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
                className="break-inside-avoid mb-4 group cursor-pointer"
                style={{ transformStyle: "preserve-3d" }}
              >
                <motion.div 
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl"
                  initial={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                  whileInView={{ 
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                    transition: { duration: 0.8, delay: index * 0.1 }
                  }}
                >
                  {/* Portfolio Image */}
                  <div 
                    className="w-full relative overflow-hidden"
                    style={{ aspectRatio: portfolio.aspectRatio }}
                  >
                    <Image
                      src={portfolio.image}
                      alt={portfolio.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />

                    {/* Hover overlay - Always visible on mobile, hover on desktop */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="text-white w-full">
                        <h4 className="font-bold text-xl mb-2 drop-shadow-lg">{portfolio.title}</h4>
                        <p className="text-sm text-gray-100 mb-3 leading-relaxed drop-shadow-md">
                          {portfolio.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {portfolio.tags.map((tag, tagIndex) => (
                            <span 
                              key={tagIndex}
                              className="px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-full shadow-lg"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white relative z-20">
        {/* Upper Tier - Contact Information */}
        <div className="border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-6 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }} className="mb-4">
                  <Mail className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-yellow-500 transition-colors" />
                </motion.div>
                <a
                  href="mailto:synergeektechnologies@gmail.com"
                  className="text-base md:text-lg hover:text-yellow-500 transition-colors"
                >
                  synergeektechnologies@gmail.com
                </a>
              </motion.div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }} className="mb-4">
                  <MapPin className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-yellow-500 transition-colors" />
                </motion.div>
                <p className="text-base md:text-lg max-w-xs">182, Subramanium road, RS Puram, Coimbatore</p>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col items-center text-center group"
              >
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.3 }} className="mb-4">
                  <Phone className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-yellow-500 transition-colors" />
                </motion.div>
                <div className="space-y-1">
                  <a
                    href="tel:+919677741597"
                    className="block text-base md:text-lg hover:text-yellow-500 transition-colors"
                  >
                    +91 96777 41597
                  </a>
                  <a
                    href="tel:+919786763705"
                    className="block text-base md:text-lg hover:text-yellow-500 transition-colors"
                  >
                    +91 97867 63705
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Lower Tier - Footer Bar */}
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Back Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-sm md:text-base hover:text-yellow-500 transition-colors group"
              >
                <span>Back Top</span>
                <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.3 }}>
                  <ArrowUp className="w-4 h-4 group-hover:text-yellow-500 transition-colors" />
                </motion.div>
              </motion.button>

              {/* Copyright */}
              <p className="text-sm md:text-base text-gray-400 text-center">
                2025 Synergeek Technologies. All rights reserved.
              </p>

              {/* Follow Us */}
              <Link href="https://www.instagram.com/synergeek/" target="_blank" className="flex items-center gap-2 text-sm md:text-base hover:text-yellow-500 transition-colors group">
                <span>Follow Us</span>
                <motion.div whileHover={{ rotate: 15 }} transition={{ duration: 0.3 }}>
                  <Share2 className="w-4 h-4 group-hover:text-yellow-500 transition-colors" />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
