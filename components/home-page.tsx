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
import { format, parseISO } from "date-fns"
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
    section: 'tier1' | 'tier2' | 'tier3'
    order: number
  }>
  brands: Array<{
    _id: string
    name: string
    color: string
    order: number
  }>
  latestPosts: Array<{
    _id: string
    title: string
    slug: string
    date: string
    excerpt: string
    categories: string[]
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

export function HomePage({ services, brands, latestPosts, settings }: HomePageProps) {
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

  const violetSectionY = useTransform(servicesScrollProgress, [0, 0.5, 1], [50, 0, -50])
  const coralSectionY = useTransform(servicesScrollProgress, [0, 0.3, 0.7, 1], [100, 50, 0, -50])
  const yellowSectionY = useTransform(servicesScrollProgress, [0, 0.5, 1], [150, 75, 0])

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
    "telephone": "+91-9677741597",
    "email": "company@synergeek.in",
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
      "name": "Creative Marketing Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Media Lead Generation",
            "description": "Turning your social media into a system that consistently generates leads."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Social Media Management",
            "description": "Complete handling of your content, posting, and growth strategy."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Performance Marketing (Ads)",
            "description": "Running targeted ad campaigns to bring in qualified leads."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Content Strategy & Branding",
            "description": "Creating content plans that attract, engage, and convert your audience."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Search Engine Optimization (SEO)",
            "description": "Improving your online visibility and driving organic traffic."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Local SEO & Google Business Profile",
            "description": "Showing up in Maps and local searches with an optimized Google Business Profile and location targeting."
          }
        }
      ]
    }
  }

  const faqData = [
    {
      question: "What services does Synergeek offer?",
      answer: "Synergeek offers social media lead generation, social media management, performance marketing (Meta & Google Ads), content strategy & branding, SEO, and local SEO & Google Business Profile optimisation. We turn content, ads, and social media into measurable customer growth for businesses across India."
    },
    {
      question: "How much does it cost?",
      answer: "Pricing depends on the scope and mix of services you need. We offer flexible monthly packages tailored to your goals and budget — from focused single-service plans to full-stack marketing retainers. Contact us at company@synergeek.in for a custom quote."
    },
    {
      question: "How do I get started?",
      answer: "Simply reach out through our contact form at synergeek.in/contact or email us at company@synergeek.in. We'll schedule a free discovery call to understand your goals and recommend the right services for your business."
    },
    {
      question: "Who is Synergeek best suited for?",
      answer: "Synergeek works best with small to mid-sized businesses, D2C brands, local service providers, and startups in India who want to generate consistent leads and grow their online presence through creative, results-driven marketing."
    },
    {
      question: "Where is Synergeek located?",
      answer: "Synergeek is based in Coimbatore, Tamil Nadu, India. We work with clients across India and are equipped to partner with brands internationally."
    }
  ]

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(({ question, answer }) => ({
      "@type": "Question",
      "name": question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": answer
      }
    }))
  }

  return (
    <div ref={containerRef} className="min-h-screen">
      <StructuredData data={structuredData} />
      <StructuredData data={faqStructuredData} id="faq-schema" />
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
        {/* Tier 1 — Get Found (SEO) */}
        <motion.section
          style={{ y: violetSectionY }}
          className="relative sm:sticky sm:top-0 sm:min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#7C3AED]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 text-balance">GET FOUND</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto text-balance">
                Be the answer when your customers search.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
              {services.filter(s => s.section === 'tier1').map((service, index) => {
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
                    <Icon className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 text-[#7C3AED]" />
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{service.title}</h3>
                    <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">{service.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* Tier 2 — Convert (Lead Gen + Performance Marketing) */}
        <motion.section
          style={{ y: coralSectionY }}
          className="relative sm:sticky sm:top-0 sm:min-h-screen flex items-center justify-center overflow-hidden mt-[-30px] md:mt-0"
        >
          <div className="absolute inset-0 bg-[#FF5C5C]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 sm:py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 text-balance">CONVERT</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto text-balance">
                Turn attention into qualified leads.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto">
              {services.filter(s => s.section === 'tier2').map((service, index) => {
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
                    <Icon className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 text-[#FF5C5C]" />
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4">{service.title}</h3>
                    <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed">{service.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.section>

        {/* Tier 3 — Grow (SMM + Content Strategy) */}
        <motion.section
          style={{ y: yellowSectionY }}
          className="relative sm:sticky sm:top-0 sm:min-h-screen flex items-center justify-center overflow-hidden mt-[-49px] md:mt-0"
        >
          <div className="absolute inset-0 bg-[#FFD60A]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 sm:py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-black mb-6 text-balance">GROW</h2>
              <p className="text-lg sm:text-xl md:text-2xl text-black/80 max-w-3xl mx-auto text-balance mb-6 sm:mb-8 md:mb-12">
                Keep them coming back.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-5xl mx-auto text-left">
                {services.filter(s => s.section === 'tier3').map((service, index) => {
                  const Icon = getIcon(service.icon)
                  return (
                    <motion.div
                      key={service.title}
                      initial={{ opacity: 0, y: 50, rotate: 0 }}
                      whileInView={{ opacity: 1, y: 0, rotate: index === 0 ? -6 : 6 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                      whileHover={{ scale: 1.05, rotate: 0 }}
                      className="bg-black rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl"
                    >
                      <Icon className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 text-[#FFD60A]" />
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">{service.title}</h3>
                      <p className="text-sm md:text-base lg:text-lg text-white/80 leading-relaxed">{service.description}</p>
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
            "LEAD GENERATION",
            "SOCIAL MEDIA MANAGEMENT",
            "PERFORMANCE MARKETING",
            "CONTENT STRATEGY",
            "SEO & ORGANIC GROWTH",
            "BRAND STORYTELLING",
            "AD CREATIVE",
            "ANALYTICS & GROWTH",
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
              We've partnered with bold brands to grow audiences, leads, and revenue.
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

      {/* Latest Blog Posts Section */}
      {latestPosts && latestPosts.length > 0 && (
        <section className="py-32 px-6 bg-background">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance">Latest from our Blog</h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-balance">
                Insights on marketing, growth, and creative strategy
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {latestPosts.map((post, index) => (
                <motion.article
                  key={post._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="rounded-xl border border-border/60 bg-card/40 p-6 flex flex-col"
                >
                  <div className="text-xs text-muted-foreground mb-2">
                    {format(parseISO(post.date), "MMM d, yyyy")}
                  </div>
                  <h3 className="text-lg font-semibold leading-snug mb-3">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:underline underline-offset-4"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{post.excerpt}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline underline-offset-4"
                  >
                    Read more <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </motion.article>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mt-12"
            >
              <Link href="/blog">
                <Button variant="outline" size="lg" className="gap-2">
                  View all articles <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

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

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-background">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold tracking-tighter text-center mb-16"
          >
            Frequently Asked Questions
          </motion.h2>
          <div className="divide-y divide-border">
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="py-7"
              >
                <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">{item.question}</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.answer}</p>
              </motion.div>
            ))}
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
                2026 Synergeek. All rights reserved.
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
