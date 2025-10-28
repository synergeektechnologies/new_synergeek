"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import {
  ArrowRight,
  Code,
  Cloud,
  Shield,
  Database,
  Lightbulb,
  TrendingUp,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
  Share2,
  Webhook,
  Globe,
  Camera,
  PenTool,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
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

  const redSectionY = useTransform(servicesScrollProgress, [0, 0.5, 1], [100, 0, -100])
  const orangeSectionY = useTransform(servicesScrollProgress, [0, 0.3, 0.7, 1], [200, 100, 0, -100])
  const purpleSectionY = useTransform(servicesScrollProgress, [0, 0.5, 1], [300, 150, 0])

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

  const brands = [
    { name: "Studio Miradia", color: "#3B82F6" },
    { name: "The Urban Elephant", color: "#8B5CF6" },
    { name: "Sasvi Creation", color: "#10B981" },
    { name: "VIP Polymers", color: "#F59E0B" },
    { name: "Kaai Kari", color: "#EF4444" },
    { name: "Bay Body Space", color: "#06B6D4" },
    { name: "Hundreds", color: "#EC4899" },
    { name: "A&D Batters", color: "#14B8A6" },
  ]

  return (
    <div ref={containerRef} className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        style={{ opacity, scale }}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8">
              <span className="block text-balance inline-flex">
                {letters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.05 }}
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
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-md mt-[-30px] md:text-lg lg:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed text-balance"
            style={{ fontFamily: "var(--font-roboto-condensed)" }}
          >
            {
              "We are a Creative Marketing Agency, specialized in Digital marketing, Web design and development, Video Production and Branding."
            }
          </motion.p>
        </div>
      </motion.section>

      <div ref={servicesRef} className="relative min-h-[300vh]">
        {/* Red/Coral Section - Software Development */}
        <motion.section
          style={{ y: redSectionY }}
          className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#E53935]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">DIGITAL EXCELLENCE</h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto text-balance">
                Transforming ideas into powerful digital solutions
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  icon: PenTool,
                  title: "UI/UX Design",
                  description: "Create engaging and user-friendly interfaces for your products and services",
                  rotation: -8,
                },
                {
                  icon: Code,
                  title: "App Development",
                  description: "Custom mobile applications to showcase your products and services",
                  rotation: 0,
                },
                {
                  icon: Globe,
                  title: "Web Design & Development",
                  description: "Create stunning and responsive websites to showcase your products and services",
                  rotation: 8,
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: service.rotation }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="bg-white rounded-2xl p-8 shadow-2xl"
                >
                  <service.icon className="w-16 h-16 mb-6 text-[#E53935]" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          style={{ y: orangeSectionY }}
          className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#F5A962]" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">EXPERT MARKETING</h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto text-balance">
                Expert marketing strategies to grow your business
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
              {[
                {
                  icon: Share2,
                  title: "Social Media Marketing",
                  description: "Grow your brand on social media with targeted campaigns",
                  rotation: -6,
                },
                {
                  icon: Rocket,
                  title: "Meta Ads & Google Ads",
                  description: "Create targeted ads to reach your audience and drive conversions",
                  rotation: 6,
                },
              ].map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50, rotate: 0 }}
                  whileInView={{ opacity: 1, y: 0, rotate: service.rotation }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className="bg-white rounded-2xl p-10 shadow-2xl"
                >
                  <service.icon className="w-16 h-16 mb-6 text-[#F5A962]" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Purple Section - Innovation */}
        // same as red section
        <motion.section
          style={{ y: purpleSectionY }}
          className="sticky top-0 min-h-screen flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-700" />
          <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance">CONTENT PRODUCTION</h2>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto text-balance mb-12">
                Create engaging content to showcase your products and services
              </p>
              <div className="grid md:grid-cols-3 gap-8 md:gap-12 text-left">
                {
                  [
                    {
                      icon: Lightbulb,
                      title: "Video Production",
                      description: "Create engaging videos to showcase your products",
                      rotation: -8,
                    },
                    {
                      icon: Camera,
                      title: "Product Photography",
                      description: "Create engaging product photography to showcase your products",
                      rotation: 0,
                    },
                    {
                      icon: Lightbulb,
                      title: "Model and Influencer Shoots",
                      description: "Create engaging model and influencer shoots to showcase your products",
                      rotation: 8,
                    },
                  ]
                  .map((service, index) => (
                    <motion.div key={service.title} initial={{ opacity: 0, y: 50, rotate: 0 }} whileInView={{ opacity: 1, y: 0, rotate: service.rotation }} viewport={{ once: true }} transition={{ duration: 0.8, delay: index * 0.2 }} whileHover={{ scale: 1.05, rotate: 0 }} className="bg-white rounded-2xl p-8 shadow-2xl">
                      <service.icon className="w-16 h-16 mb-6 text-[#F5A962]" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-lg">{service.description}</p>
                    </motion.div>
                  ))
                }
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
            "SOCIAL MEDIA MANAGEMENT",
            "DIGITAL MEDIA MARKETING",
            "BRANDING",
            "CONTENT PRODUCTION",
            "AD CAMPAIGNS",
            "SEARCH ENGINE OPTIMIZATION",
            "WEB DESIGN & DEVELOPMENT",
            "ECOMMERCE SOLUTIONS",
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
                  className="flex-shrink-0 w-64 h-32 rounded-xl border border-border bg-card flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
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
              {[...brands.slice().reverse(), ...brands.slice().reverse(), ...brands.slice().reverse()].map(
                (brand, index) => (
                  <motion.div
                    key={`${brand.name}-reverse-${index}`}
                    whileHover={{ scale: 1.1, y: -10 }}
                    className="flex-shrink-0 w-64 h-32 rounded-xl border border-border bg-card flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-primary/50 hover:shadow-lg"
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
                  href="mailto:synergeektechnologies@gmail.com"
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="inline-block"
                >
                  <Mail className="w-10 h-10 mx-auto mb-4 text-white" strokeWidth={1.5} />
                </motion.a>
                <a
                  href="mailto:synergeektechnologies@gmail.com"
                  className="text-white hover:text-primary transition-colors text-sm md:text-base block"
                >
                  synergeektechnologies@gmail.com
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
                  182, Subramanium road,
                  <br />
                  RS Puram, Coimbatore.
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
                    href="tel:+919677741597"
                    className="text-white hover:text-primary transition-colors text-sm md:text-base block"
                  >
                    +91 96777 41597
                  </a>
                  <a
                    href="tel:+919786763705"
                    className="text-white hover:text-primary transition-colors text-sm md:text-base block"
                  >
                    +91 97867 63705
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
                2025 Synergeek Technologies. All rights reserved.
              </motion.p>

              {/* Follow Us */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center md:justify-end gap-2 text-white hover:text-primary transition-colors text-sm cursor-pointer"
              >
                <Link href="https://www.instagram.com/synergeek/" target="_blank" className="flex items-center gap-2">
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
