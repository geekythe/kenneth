"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, ArrowLeft, Calendar, Clock } from "lucide-react"
import Image from "next/image"
import { getBlogs, type Blog } from "@/lib/hygraph"

export default function BlogsSection() {
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null)
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        setIsLoading(true)
        const blogsData = await getBlogs()

        // Sort by order if available
        const sortedBlogs = [...blogsData].sort((a, b) => (a.order || 0) - (b.order || 0))

        setBlogs(sortedBlogs)
      } catch (error) {
        console.error("Error fetching blogs:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  // Loading skeleton for blogs
  const BlogSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <div key={item} className="animate-pulse relative bg-white">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-16 h-16"></div>
          <div className="relative h-48 bg-gray-200"></div>
          <div className="p-6 text-center">
            <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto"></div>
          </div>
        </div>
      ))}
    </>
  )

  return (
    <div className="h-full w-full overflow-y-auto bg-[#E5DCC5] py-12 px-4 md:px-8">
      <AnimatePresence mode="wait">
        {selectedBlog ? (
          <motion.div
            key="blog-detail"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto"
          >
            <button
              onClick={() => setSelectedBlog(null)}
              className="flex items-center text-gray-700 hover:text-gray-900 mb-8 group"
            >
              <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
              <span>Back to all blogs</span>
            </button>

            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              <div className="h-64 md:h-80 bg-gray-200 overflow-hidden">
                <Image
                  src={selectedBlog.image.url || "/placeholder.svg"}
                  alt={selectedBlog.title}
                  width={1200}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-[#8ACB82]/20 text-[#8ACB82] text-sm rounded-full flex items-center">
                    {selectedBlog.category}
                  </span>
                  {selectedBlog.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
                      {tag.techused}
                    </span>
                  ))}
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{selectedBlog.title}</h1>

                <div className="flex items-center text-gray-500 mb-8">
                  <span className="flex items-center mr-4">
                    <Calendar size={16} className="mr-1" />
                    {selectedBlog.date.day} {selectedBlog.date.month}
                  </span>
                  <span className="flex items-center">
                    <Clock size={16} className="mr-1" />5 min read
                  </span>
                </div>

                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: selectedBlog.content.html }}
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="blog-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="flex justify-center mb-2">
                  <BookOpen className="text-gray-700" size={24} />
                </div>
                <h2 className="text-5xl font-bold text-gray-700 mb-8">blog</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                  <BlogSkeleton />
                ) : (
                  blogs.map((blog) => (
                    <div
                      key={blog.order}
                      className="relative bg-white cursor-pointer group"
                      onClick={() => setSelectedBlog(blog)}
                    >
                      {/* Date Badge */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-md">
                        <span className="text-xl font-bold text-gray-800">{blog.date.day}</span>
                        <span className="text-xs text-gray-500">{blog.date.month}</span>
                      </div>

                      {/* Blog Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={blog.image.url || "/placeholder.svg"}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>

                      {/* Blog Title */}
                      <div className="p-6 text-center">
                        <h3 className="text-gray-800 font-medium tracking-wide">{blog.title}</h3>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
