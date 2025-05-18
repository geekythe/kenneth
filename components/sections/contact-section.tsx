"use client"

import type React from "react"
import { useState } from "react"
import dynamic from "next/dynamic"
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Check,
  HomeIcon,
  User,
  FileText,
  Briefcase,
  BookOpen,
  PhoneCall,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import SectionHeader from "@/components/section-header"

// Import Leaflet map with no SSR
const FloridaMap = dynamic(() => import("@/components/florida-map"), {
  ssr: false,
})

export default function ContactPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log({ name, email, message })
  }

  return (
    <div className="flex h-screen bg-[#7D989C] text-white overflow-hidden">
     

      {/* Main Content */}
      <div className="flex-1 relative overflow-y-auto">
        {/* Map Background */}
        <div className="fixed inset-0 z-0">
          <FloridaMap />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col items-center min-h-full py-10 px-4 pb-20">
          <div className="w-full max-w-5xl flex flex-col items-center">
            {/* Contact Header */}
            <div className="flex flex-col items-center mb-16">
              <PhoneCall size={48} className="mb-4 text-[#8ACB82]" strokeWidth={1} />
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Contact</h1>
            </div>

            {/* Reach Me Section */}
            <div className="w-full mb-16">
              <div className="relative mb-12 flex justify-center">
                <SectionHeader title="REACH ME" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                <div className="flex flex-col items-center lg:flex-row ">
                  <div className="w-20 h-20 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
                    <MapPin size={42} strokeWidth={1} />
                  </div>
                  <div className="text-xs font-medium text-center lg:text-left">
                    <div>BASED IN</div>
                    <div>RIVERVIEW</div>
                    <div>FLORIDA, USA</div>
                  </div>
                </div>

                <div className="flex flex-col items-center lg:flex-row ">
                  <div className="w-20 h-20 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
                    <Phone size={42} strokeWidth={1} />
                  </div>
                  <div className="text-xs font-medium text-center lg:text-left">TEL: (813) 419-9723</div>
                </div>

                <div className="flex flex-col items-center lg:flex-row ">
                  <div className="w-20 h-20 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
                    <Mail size={42} strokeWidth={1} />
                  </div>
                  <div className="text-xs font-medium text-center lg:text-left lowercase">KennethWebber @geekyandthebra.in</div>
                </div>

                <div className="flex flex-col items-center lg:flex-row ">
                  <div className="w-20 h-20 flex items-center justify-center mb-3 lg:mb-0 flex-shrink-0">
                    <Linkedin size={42} strokeWidth={1} />
                  </div>
                  <div className="text-xs font-medium text-center lg:text-left">FREELANCE AVAILABLE</div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="max-w-8xl">
              <div className="relative mb-12 flex justify-center">
                <SectionHeader title="DROP ME A LINE" />
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs ">NAME</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent border border-gray-400 text-white flex h-10 w-full  border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs ">EMAIL</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent border border-gray-400 text-white flex h-10 w-full  border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs">MESSAGE</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-40 bg-transparent border border-gray-400 text-white flex min-h-[80px] w-full  border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>
                <div className="md:col-span-2 flex justify-center mt-4">
                  <button
                    type="submit"
                    className="hover:bg-[#8ACB82] hover:border-none text-white px-4 border border-gray-100 py-2 text-sm font-medium"
                  >
                    SEND
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
