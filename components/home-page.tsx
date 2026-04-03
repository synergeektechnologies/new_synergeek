"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { StructuredData } from "@/components/structured-data"
import { getIcon } from "@/lib/icon-map"

export interface HomePageProps {
  services: Array<{
    _id: string
    title: string
    description: string
    icon: string
    section: 'software' | 'marketing' | 'ai'
    order: number
  }>
  brands: Array<{
    _id: string
    name: string
    color: string
    order: number
  }>
  settings: {
    orgName: string
    companyDescription: string
    mission: string
    vision: string
    contactEmail: string
    phone1: string
    phone2: string
    address: string
    instagramUrl: string
  }
}

export function HomePage({ services, brands, settings }: HomePageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const [skillsInView, setSkillsInView] = useState<number[]>([])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const { scrollYProgress: servicesScrollProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  const redSectionY = useTransform(servicesScrollProgress, [0, 0.5, 1], [50, 0, -50])
  const orangeSectionY = useTransform(servicesScrollProgress, [0, 0.3, 0.7, 1], [100, 50, 0, -50])
  const purpleSectionY = useTransform(servicesScrollProgress, [0, 0.5, 1], [150, 75, 0])

  useEffect(() => {
    const handleScroll = () => {
      if (!skillsRef.current) return

      const skillElements = skillsRef.current.querySelectorAll("[data-skill-index]")
      const newInView: number[] = []

      skillElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect()
        const windowHeight = window.innerHeight

        // Check if element is in the middle third of the viewport
        if (rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.4) {
          newInView.push(index)
        }
      })

      setSkillsInView(newInView)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const letters = "SYNERGEEK".split("")

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": settings.orgName,
    "description": settings.companyDescription,
    "url": "https://www.synergeek.in",
    "logo": "https://www.synergeek.in/synergeek-logo.png",
    "image": "https://www.synergeek.in/synergeek-logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": settings.address,
      "addressLocality": "RS Puram",
      "addressRegion": "Tamil Nadu",
      "addressCountry": "India",
      "postalCode": "641002"
    },
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": settings.phone1?.replace(/\s/g, ''),
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "telephone": settings.phone2?.replace(/\s/g, ''),
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "email": settings.contactEmail,
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": "English"
      }
    ],
    "sameAs": settings.instagramUrl ? [settings.instagramUrl] : [],
    "foundingDate": "2020",
    "founders": [
      { "@type": "Person", "name": "Sri Manikandan R" },
      { "@type": "Person", "name": "Sai Sidharthan H" }
    ],
    "serviceArea": {
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
            "name": "Digital Marketing",
            "description": "Comprehensive digital marketing strategies including social media marketing, SEO, and online advertising"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Design & Development",
            "description": "Custom website design and development services including UI/UX design and responsive web solutions"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Video Production",
            "description": "Professional video production services including product photography and model shoots"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Branding",
            "description": "Complete branding solutions including logo design, brand identity, and visual design"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "E-commerce Solutions",
            "description": "E-commerce platform development and optimization services"
          }
        }
      ]
    }
  }

  return (
    <div ref={containerRef} className="min-h-screen">
      <StructuredData data={structuredData} />
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-hero-fade-up">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8">
              <span className="inline-flex text-balance">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    whileHover={{
                      scale: 1.2,
                      transition: { duration: 0.3 },
                    }}
                    className="inline-block cursor-pointer"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </div>
          <p
            className="animate-hero-fade-up-delay text-md mt-[-30px] md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-balance"
            style={{ fontFamily: "var(--font-roboto-condensed)" }}
          >
            {settings.companyDescription}
          </p>
        </div>
      </motion.section>

      {/* Services Section - Responsive Design */}
      <div ref={servicesRef} className="relative">
        {/* Software & Web Development Section */}
        <motion.section
          style={{ y: redSectionY }}
          className="relative sm:sticky sm:top-0 sm:min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#E53935]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 text-balance">SOFTWARE & WEB DEVELOPMENT</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto text-balance">
                Building scalable digital foundations for modern businesses
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
              {services.filter(s => s.section === 'software').map((service, index) => {
                const Icon = getIcon(service.icon)
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 50, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: index === 0 ? -8 : index === 2 ? 8 : 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl"
                  >
                    <Icon className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 text-[#E53935]" />
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{service.title}</h3>
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{service.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* Digital Marketing Section */}
        <motion.section
          style={{ y: orangeSectionY }}
          className="relative sm:sticky sm:top-0 sm:min-h-screen flex items-center justify-center overflow-hidden mt-[-30px] md:mt-0"
        >
          <div className="absolute inset-0 bg-[#F5A962]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 text-balance">DIGITAL MARKETING</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto text-balance">
                Strategic marketing that accelerates your business growth
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
              {services.filter(s => s.section === 'marketing').map((service, index) => {
                const Icon = getIcon(service.icon)
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 50, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: index === 0 ? -6 : 6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    className="bg-white rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl"
                  >
                    <Icon className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 text-[#F5A962]" />
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{service.title}</h3>
                    <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">{service.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* AI Solutions Section */}
        <motion.section
          style={{ y: purpleSectionY }}
          className="relative sm:sticky sm:top-0 sm:min-h-screen flex items-center justify-center overflow-hidden mt-[-49px] md:mt-0"
        >
          <div className="absolute inset-0 bg-linear-to-br from-indigo-600 to-purple-700" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 sm:py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 text-balance">AI SOLUTIONS</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto text-balance mb-6 sm:mb-8 md:mb-12">
                Empowering businesses with intelligent autonomous systems
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:gap-12 text-left">
                {services.filter(s => s.section === 'ai').map((service, index) => {
                  const Icon = getIcon(service.icon)
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 50, rotate: 0 }}
                      whileInView={{ opacity: 1, y: 0, rotate: index === 0 ? -8 : index === 2 ? 8 : 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      whileHover={{ scale: 1.05, rotate: 0 }}
                      className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl"
                    >
                      <Icon className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 text-indigo-600" />
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{service.title}</h3>
                      <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">{service.description}</p>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Skills Section */}
      <section ref={skillsRef} className="min-h-screen bg-black py-32 px-6 flex flex-col items-center justify-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-white/60 text-sm tracking-[0.3em] uppercase mb-16 text-center"
        >
          OUR SKILLS COVER
        </motion.p>

        <div className="space-y-8 md:space-y-12">
          {[
            "AGENTIC AI SOLUTIONS",
            "CUSTOM SOFTWARE DEVELOPMENT",
            "AI CHATBOT SOLUTIONS",
            "WEB DESIGN & DEVELOPMENT",
            "MOBILE APP DEVELOPMENT",
            "DIGITAL MARKETING",
            "BUSINESS AUTOMATION",
            "BRANDING & CREATIVE",
          ].map((skill, index) => (
            <motion.h3
              key={skill}
              data-skill-index={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tighter text-center transition-colors duration-500"
              style={{
                color: skillsInView.includes(index) ? "#FFFFFF" : "#404040",
              }}
            >
              {skill}
            </motion.h3>
          ))}
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-32 px-6 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">Trusted by Leading Brands</h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
              We've partnered with innovative companies to deliver exceptional digital solutions
            </p>
          </motion.div>

          {/* First Row - Scrolling Left to Right */}
          <div className="relative mb-12 overflow-hidden">
            <motion.div
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-8"
            >
              {[...brands, ...brands, ...brands].map((brand, index) => (
                <motion.div
                  key={`${brand.name}-${index}`}
                  whileHover={{ scale: 1.1, y: -10 }}
                  className="shrink-0 w-64 h-32 rounded-xl border border-border bg-card flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, ${brand.color}15 0%, transparent 100%)`,
                  }}
                >
                  <span className="text-2xl font-bold" style={{ color: brand.color }}>
                    {brand.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - Scrolling Right to Left */}
          <div className="relative overflow-hidden">
            <motion.div
              animate={{
                x: [-1920, 0],
              }}
              transition={{
                x: {
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  duration: 30,
                  ease: "linear",
                },
              }}
              className="flex gap-8"
            >
              {[...brands.slice(4), ...brands.slice(0, 4), ...brands.slice(4), ...brands.slice(0, 4), ...brands.slice(4), ...brands.slice(0, 4)].map(
                (brand, index) => (
                  <motion.div
                    key={`${brand.name}-shuffled-${index}`}
                    whileHover={{ scale: 1.1, y: -10 }}
                    className="shrink-0 w-64 h-32 rounded-xl border border-border bg-card flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${brand.color}15 0%, transparent 100%)`,
                    }}
                  >
                    <span className="text-2xl font-bold" style={{ color: brand.color }}>
                      {brand.name}
                    </span>
                  </motion.div>
                ),
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 px-6 bg-black text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-8xl font-bold mb-12 tracking-[0.05em]" style={{ fontFamily: "var(--font-condensed)" }}>MISSION</h2>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed leading-relaxed">
                {settings.mission}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-6xl md:text-8xl font-bold mb-12 tracking-[0.05em]" style={{ fontFamily: "var(--font-condensed)" }}>VISION</h2>
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed leading-relaxed">
                {settings.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white relative z-20">
        {/* Upper Tier - Contact Information */}
        <div className="py-16 md:py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 md:gap-16">
              {/* Email */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <motion.a
                  href={`mailto:${settings.contactEmail}`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="inline-block"
                >
                  <Mail className="w-10 h-10 mx-auto mb-4 text-white" strokeWidth={1.5} />
                </motion.a>
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="text-white hover:text-primary transition-colors text-sm md:text-base block"
                >
                  {settings.contactEmail}
                </a>
              </motion.div>

              {/* Address */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-center"
              >
                <motion.div whileHover={{ scale: 1.1, y: -5 }} className="inline-block">
                  <MapPin className="w-10 h-10 mx-auto mb-4 text-white" strokeWidth={1.5} />
                </motion.div>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  {settings.address}
                </p>
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center"
              >
                <motion.div whileHover={{ scale: 1.1, y: -5 }} className="inline-block">
                  <Phone className="w-10 h-10 mx-auto mb-4 text-white" strokeWidth={1.5} />
                </motion.div>
                <div className="space-y-1">
                  <a
                    href={`tel:${settings.phone1?.replace(/\s/g, '')}`}
                    className="text-white hover:text-primary transition-colors text-sm md:text-base block"
                  >
                    {settings.phone1}
                  </a>
                  <a
                    href={`tel:${settings.phone2?.replace(/\s/g, '')}`}
                    className="text-white hover:text-primary transition-colors text-sm md:text-base block"
                  >
                    {settings.phone2}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Lower Tier - Footer Bar */}
        <div className="border-t border-white/10 py-5 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center text-center md:text-left">
              {/* Back Top */}
              <motion.button
                onClick={scrollToTop}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center md:justify-start gap-2 text-white hover:text-primary transition-colors text-sm"
              >
                <ArrowUp className="w-4 h-4" />
                <span>Back Top</span>
              </motion.button>

              {/* Copyright */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-white/70 text-xs md:text-sm text-center"
              >
                2026 Synergeek Technologies. All rights reserved.
              </motion.p>

              {/* Follow Us */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center md:justify-end gap-2 text-white hover:text-primary transition-colors text-sm cursor-pointer"
              >
                <Link href={settings.instagramUrl || '#'} target="_blank" className="flex items-center gap-2">
                  <span>Follow Us</span>
                  <Share2 className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
