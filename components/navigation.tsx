"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        <div className="flex items-center justify-between h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }}>
              <Image
                src="/synergeek-logo.png"
                alt="Synergeek"
                width={240}
                height={80}
                className="h-16 w-auto object-contain"
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  ease: "easeOut",
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <Link href={item.href} className="relative group">
                  <motion.span
                    className={cn(
                      "text-lg font-medium transition-colors inline-block",
                      pathname === item.href ? "text-foreground" : "text-muted-foreground",
                    )}
                    animate={{
                      scale: hoveredIndex === index ? 1.15 : 1,
                      color: hoveredIndex === index ? "rgb(234, 179, 8)" : undefined,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    {item.name}
                  </motion.span>

                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary origin-left shadow-[0_0_8px_rgba(234,179,8,0.6)]"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />

                  {/* Active indicator */}
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(234,179,8,0.6)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 text-foreground"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border bg-background/95 backdrop-blur-lg"
        >
          <div className="px-8 py-6 space-y-5">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={item.href} onClick={() => setMobileMenuOpen(false)} className="block">
                  <motion.div
                    className={cn(
                      "text-lg font-medium transition-colors py-3 px-5 rounded-lg",
                      pathname === item.href ? "text-primary bg-primary/10" : "text-muted-foreground",
                    )}
                    whileTap={{
                      scale: 1.05,
                      backgroundColor: "rgba(234, 179, 8, 0.2)",
                      boxShadow: "0 0 20px rgba(234, 179, 8, 0.3)",
                    }}
                    whileHover={{
                      scale: 1.08,
                      backgroundColor: "rgba(234, 179, 8, 0.15)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
