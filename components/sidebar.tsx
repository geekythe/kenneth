"use client"

import { useState, useEffect } from "react"
import {
  Home,
  User,
  FileText,
  BookOpen,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Menu,
  Award,
  BookText,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface SidebarProps {
  sections: {
    id: string
    label: string
  }[]
  activeSection: string
  onSectionChange: (sectionId: string) => void
}

export default function Sidebar({ sections, activeSection, onSectionChange }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  // Handle section change and close mobile menu if needed
  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId)
    if (isMobile) {
      setIsMobileMenuOpen(false)
    }
  }

  const getIcon = (id: string) => {
    switch (id) {
      case "home":
        return <Home className="w-5 h-5" />
      case "about":
        return <User className="w-5 h-5" />
      case "resume":
        return <FileText className="w-5 h-5" />
        case "certifications":
        return <Award className="w-5 h-5" />
      case "portfolio":
        return <BookOpen className="w-5 h-5" />
      case "blogs":
        return <BookText className="w-5 h-5" />
      case "contact":
        return <Mail className="w-5 h-5" />
      default:
        return <Home className="w-5 h-5" />
    }
  }

  // Mobile top bar based on the provided design
  const MobileTopBar = () => (
    <div className="fixed top-0 left-0 right-0 h-14 bg-[#1C262B] flex items-center z-50 md:hidden">
      <div className="w-14 h-14 bg-gray-800 flex items-center justify-center">
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
          <Menu size={24} />
        </button>
      </div>
      <div className="flex-1 text-white font-medium text-start pl-8">Kenneth (The Brain)</div>
    </div>
  )

  // Desktop sidebar
  const DesktopSidebar = () => (
    <aside className="fixed left-0 top-0 h-full w-32 bg-[#1C262B] flex flex-col items-center z-40 hidden md:flex">
      {/* Profile Section */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full aspect-square bg-gray-800 flex items-center justify-center ">
          <img src="/profile-image.png" alt="Profile" className="w-full" />
        </div>
        <div className="w-full  items-center  items-center justify-center flex gap-2">
          
          <div className="bg-[#2BA163] py-2 px-2 flex-1">
            <p className="text-white text-md text-center font-medium">Kenneth</p>
          </div>
          <div className="bg-[#FF8C00] py-2 px-2">
            <span className="text-white text-xs text-center font-medium">
              The <br />
              Brain
            </span>
          </div>
    
         
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col items-center w-full flex-1 mt-4 overflow-y-auto">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => handleSectionClick(section.id)}
            className={`
              relative w-full py-4 flex flex-col items-center justify-center
              transition-all duration-300 border-b border-gray-800
              ${activeSection === section.id ? "text-white" : "text-gray-400 hover:text-gray-200"}
            `}
          >
            {getIcon(section.id)}
            <span className="text-[10px] mt-1 uppercase tracking-wider font-light">{section.label}</span>

            {activeSection === section.id && (
              <motion.div
                layoutId="desktopActiveSection"
                className="absolute left-0 top-0 h-full w-1 bg-green-500"
                transition={{ duration: 0.3 }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Social Icons */}
      <div className="w-full py-4 flex flex-row items-center justify-center gap-3 border-t border-gray-800">
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <Facebook className="w-4 h-4" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <Twitter className="w-4 h-4" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <Linkedin className="w-4 h-4" />
        </a>
        <a href="#" className="text-gray-400 hover:text-white transition-colors">
          <Instagram className="w-4 h-4" />
        </a>
      </div>
    </aside>
  )

  // Mobile sidebar based on the provided design
  const MobileSidebar = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "tween", duration: 0.3 }}
          className="fixed left-0 top- bottom-0 w-40 bg-[#1C262B] flex flex-col z-50 md:hidden"
        >
          {/* Profile Section */}
          <div className="w-full flex flex-col items-center">
            <div className="w-full aspect-square bg-gray-800 flex items-center justify-center p-3">
              <img src="/profile-image.png" alt="Profile" className="w-full" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col w-full flex-1 overflow-y-auto">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleSectionClick(section.id)}
                className={`
                  relative w-full py-4 flex flex-col items-center justify-center border-b border-gray-800
                  ${activeSection === section.id ? "text-white" : "text-gray-400 hover:text-gray-200"}
                `}
              >
                {getIcon(section.id)}
                <span className="text-xs mt-1 uppercase tracking-wider font-light">{section.label}</span>
              </button>
            ))}
          </nav>

          {/* Social Icons */}
          <div className="w-full py-4 flex flex-row items-center justify-center gap-4 border-t border-gray-800">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <MobileTopBar />
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}
