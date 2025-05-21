"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Sidebar from "@/components/sidebar"
import HomeSection from "@/components/sections/home-section"
import AboutSection from "@/components/sections/about-section"
import ResumeSection from "@/components/sections/resume-section"
import PortfolioSection from "@/components/sections/portfolio-section"
import CertificationsSection from "@/components/sections/certifications-section"
import BlogsSection from "@/components/sections/blogs-section"
import ContactSection from "@/components/sections/contact-section"

export default function Home() {
  const [activeSection, setActiveSection] = useState("home")
  const [direction, setDirection] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const sections = [
    { id: "home", label: "Home", component: HomeSection },
    { id: "about", label: "About", component: AboutSection },
    { id: "resume", label: "Resume", component: ResumeSection },
    { id: "certifications", label: "Certifications", component: CertificationsSection },
    { id: "portfolio", label: "Portfolio", component: PortfolioSection },
    { id: "blogs", label: "Blogs", component: BlogsSection },
    { id: "contact", label: "Contact", component: ContactSection },
  ]

  const handleSectionChange = (sectionId: string) => {
    if (sectionId === activeSection) return

    const currentIndex = sections.findIndex((section) => section.id === activeSection)
    const newIndex = sections.findIndex((section) => section.id === sectionId)

    setDirection(newIndex > currentIndex ? 1 : -1)
    setActiveSection(sectionId)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = sections.findIndex((section) => section.id === activeSection)

      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        const nextIndex = (currentIndex + 1) % sections.length
        handleSectionChange(sections[nextIndex].id)
      } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        const prevIndex = (currentIndex - 1 + sections.length) % sections.length
        handleSectionChange(sections[prevIndex].id)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeSection])

  // Animation variants with a vertical pushing effect
  const slideVariants = {
  enter: (direction: number) => ({
    y: direction > 0 ? "100%" : "-100%",
    zIndex: 1,
  }),
  center: {
    y: 0,
    zIndex: 2,
    transition: {
      y: {
        type: "tween",
        ease: "linear",
        duration: 1,
      },
    },
  },
  exit: (direction: number) => ({
    y: direction > 0 ? "-100%" : "100%",
    zIndex: 0,
    transition: {
      y: {
        type: "tween",
        ease: "linear",
        duration: 1,
      },
    },
  }),
}


  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar sections={sections} activeSection={activeSection} onSectionChange={handleSectionChange} />

      <main className={`flex-1 relative overflow-hidden ${isMobile ? "mt-14" : "md:ml-32"}`}>
        <AnimatePresence initial={false} custom={direction} mode="sync">
          {sections.map((section) => {
            if (section.id === activeSection) {
              return (
                <motion.div
                  key={section.id}
                  className="absolute inset-0 w-full h-full"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                >
                  <section.component />
                </motion.div>
              )
            }
            return null
          })}
        </AnimatePresence>
      </main>
    </div>
  )
}
