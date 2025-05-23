"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { getPortfolioProjects, type PortfolioProject } from "@/lib/hygraph"

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null)
  const [projects, setProjects] = useState<PortfolioProject[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    async function fetchProjects() {
      try {
        setIsLoading(true)
        const projectsData = await getPortfolioProjects()
        setProjects(projectsData)

        // Extract unique categories for filters
        const uniqueCategories = Array.from(new Set(projectsData.map((project) => project.category)))
        setCategories(uniqueCategories)
      } catch (error) {
        console.error("Error fetching portfolio projects:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  // Create filter buttons including "ALL"
  const filters = [
    { id: "all", label: "ALL" },
    ...categories.map((category) => ({
      id: category,
      label: category.toUpperCase(),
    })),
  ]

  // Loading skeleton for projects
  const ProjectSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="animate-pulse bg-white rounded-md overflow-hidden shadow-md">
          <div className="h-48 bg-gray-200"></div>
          <div className="p-6 text-center">
            <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      ))}
    </>
  )

  return (
    <div className="h-full w-full bg-[#7B573F] overflow-y-auto py-12 px-4 md:px-8 relative">
      <AnimatePresence>
        {selectedProject ? (
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
                  onClick={() => setSelectedProject(null)}
                  className="flex items-center text-gray-700 hover:text-gray-900 mb-8 group"
                >
                  <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                  <span>Back to portfolio</span>
                </button>

                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                  <div className="h-64 md:h-96 bg-gray-200 overflow-hidden">
                    <img
                      src={selectedProject.image.url || "/placeholder.svg"}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-8">
                    <div className="max-w-4xl mx-auto">
                      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{selectedProject.title}</h1>
                      <p className="text-gray-500 text-lg mb-8">{selectedProject.subtitle}</p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div className="md:col-span-2">
                          <h2 className="text-xl font-semibold text-gray-700 mb-4">Project Overview</h2>
                          <p className="text-gray-600 mb-6 leading-relaxed">{selectedProject.description}</p>
                          <p className="text-gray-600 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus
                            hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend
                            nibh porttitor. Ut in nulla enim.
                          </p>
                        </div>

                        <div>
                          <h2 className="text-xl font-semibold text-gray-700 mb-4">Project Details</h2>

                          <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">CATEGORY</h3>
                            <p className="text-gray-700">
                              {selectedProject.category.charAt(0).toUpperCase() + selectedProject.category.slice(1)}
                            </p>
                          </div>

                          <div className="mb-6">
                            <h3 className="text-sm font-medium text-gray-500 mb-2">TECHNOLOGIES</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.technology.map((tech, index) => (
                                <span
                                  key={index}
                                  className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm rounded-full"
                                >
                                  {tech.techused}
                                </span>
                              ))}
                            </div>
                          </div>
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
            {/* Portfolio Header */}
            <div className="text-center mb-16">
              <div className="flex justify-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-700"
                >
                  <circle cx="12" cy="12" r="2"></circle>
                  <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
                </svg>
              </div>
              <h2 className="text-5xl font-bold text-gray-700 mb-12">Portfolio</h2>

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

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? (
                <ProjectSkeleton />
              ) : (
                <AnimatePresence>
                  {filteredProjects.map((project) => (
                    <motion.div
                      key={project.number}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-md overflow-hidden shadow-md cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="h-48 overflow-hidden bg-gray-200">
                        <img
                          src={project.image.url || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                      <div className="p-6 text-center">
                        <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                        <p className="text-sm text-gray-500">{project.subtitle}</p>
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
