"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Award, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { getCertifications, type Certification } from "@/lib/hygraph"

export default function CertificationsSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null)
  const [certifications, setCertifications] = useState<Certification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    async function fetchCertifications() {
      try {
        setIsLoading(true)
        const certificationsData = await getCertifications()

        // Sort by order if available
        const sortedCertifications = [...certificationsData].sort((a, b) => (a.order || 0) - (b.order || 0))

        setCertifications(sortedCertifications)

        // Extract unique categories for filters
        const uniqueCategories = Array.from(new Set(certificationsData.map((cert) => cert.category)))
        setCategories(uniqueCategories)
      } catch (error) {
        console.error("Error fetching certifications:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCertifications()
  }, [])

  const filteredCertifications =
    activeFilter === "all"
      ? certifications
      : certifications.filter((certification) => certification.category === activeFilter)

  // Create filter buttons including "ALL"
  const filters = [
    { id: "all", label: "ALL" },
    ...categories.map((category) => ({
      id: category,
      label: category.toUpperCase(),
    })),
  ]

  // Loading skeleton for certifications
  const CertificationSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="animate-pulse bg-white rounded-md overflow-hidden shadow-md">
          <div className="h-48 bg-gray-200 flex items-center justify-center">
            <div className="w-32 h-32 bg-gray-300 rounded-md"></div>
          </div>
          <div className="p-6 text-center">
            <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      ))}
    </>
  )

  return (
    <div className="h-full w-full bg-[#60D7A9] overflow-y-auto py-12 px-4 md:px-8 relative">
      <AnimatePresence>
        {selectedCertification ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-emerald-400 z-50 overflow-y-auto"
          >
            <div className="min-h-screen py-8 px-4 md:px-8">
              <div className="max-w-6xl mx-auto">
                <button
                  onClick={() => setSelectedCertification(null)}
                  className="flex items-center text-gray-700 hover:text-gray-900 mb-8 group"
                >
                  <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to certifications</span>
                </button>

                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                                   <div className="h-64 md:h-90 lg:h-124 xl:h-[36rem] border border-2 border-black shadow-xl bg-background/20 flex items-center justify-center">

                     <img
                        src={selectedCertification.image.url || "/placeholder.svg"}
                        alt={selectedCertification.title}
                    
                        className="w-full h-full object-cover"
                      />
                    
                  </div>

                  <div className="p-8">
                    <div className="max-w-4xl mx-auto">
                      <div className="flex justify-between items-start mb-4">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{selectedCertification.title}</h1>
                        <span className="text-sm font-medium text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                          {selectedCertification.date}
                        </span>
                      </div>
                      <p className="text-gray-500 text-lg mb-8">Issued by {selectedCertification.issuer}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="md:col-span-2">
                          <h2 className="text-xl font-semibold text-gray-700 mb-4">Certification Overview</h2>
                          <p className="text-gray-600 mb-6 leading-relaxed">{selectedCertification.description}</p>
                          {selectedCertification.details && (
                            <p className="text-gray-600 leading-relaxed">{selectedCertification.details}</p>
                          )}
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold text-gray-700 mb-4">Certification Details</h2>

                          <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">CATEGORY</h3>
                            <p className="text-gray-700">
                              {selectedCertification.category.charAt(0).toUpperCase() +
                                selectedCertification.category.slice(1)}
                            </p>
                          </div>

                          <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">CREDENTIAL ID</h3>
                            <p className="text-gray-700">{selectedCertification.credentialId}</p>
                          </div>

                          {selectedCertification.skill && selectedCertification.skill.length > 0 && (
                            <div className="mb-6">
                              <h3 className="text-sm font-medium text-gray-500 mb-2">SKILLS</h3>
                              <div className="flex flex-wrap gap-2">
                                {selectedCertification.skill.map((skill, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full"
                                  >
                                    {skill.techused}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {selectedCertification.credentialurl && (
                            <div>
                              <a
                                href={selectedCertification.credentialurl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full text-center px-6 py-3 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition-colors"
                              >
                                Verify Credential
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="max-w-6xl mx-auto">
            {/* Certifications Header */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-2">
                <Award className="text-gray-700" size={24} />
              </div>
              <h2 className="text-5xl font-bold text-gray-700 mb-12">Certifications</h2>

              {/* Filter Buttons */}
              <div className="flex flex-wrap justify-center gap-8 mb-12">
                {filters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`text-sm tracking-wider ${
                      activeFilter === filter.id ? "text-gray-800 font-medium" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Certifications Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                <CertificationSkeleton />
              ) : (
                <AnimatePresence>
                  {filteredCertifications.map((certification) => (
                    <motion.div
                      key={certification.credentialId}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-md overflow-hidden shadow-md cursor-pointer"
                      onClick={() => setSelectedCertification(certification)}
                    >
                      <div className="h-48 overflow-hidden bg-emerald-600 flex items-center justify-center">
                        
                          <img
                            src={certification.image.url || "/placeholder.svg"}
                            alt={certification.title}
                         
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-800">{certification.title}</h3>
                        <p className="text-sm text-gray-500">{certification.issuer}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
