"use client"

import { useEffect, useState } from "react"
import { FileText, GraduationCap, Briefcase } from "lucide-react"
import SectionHeader from "@/components/section-header"
import DateBadge from "@/components/date-badge"
import Image from "next/image"
import {
  getWorkHistory,
  getEducation,
  getTestimonials,
  getDesignSkills,
  getCodingSkills,
  type WorkHistory,
  type Education,
  type Testimonial,
  type Skill,
} from "@/lib/hygraph"

export default function ResumeSection() {
  const [workHistory, setWorkHistory] = useState<WorkHistory[]>([])
  const [education, setEducation] = useState<Education[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [codingSkills, setCodingSkills] = useState<Skill[]>([])
  const [designSkills, setDesignSkills] = useState<Skill[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true)
        const [workData, educationData, testimonialsData, codingData, designData] = await Promise.all([
          getWorkHistory(),
          getEducation(),
          getTestimonials(),
          getCodingSkills(),
          getDesignSkills(),
        ])

        setWorkHistory(workData)
        setEducation(educationData)
        setTestimonials(testimonialsData)
        setCodingSkills(codingData)
        setDesignSkills(designData)
      } catch (error) {
        console.error("Error fetching resume data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Loading skeleton for work history and education
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>

      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
    </div>
  )

  return (
    <div className="h-full w-full overflow-y-auto bg-[#EBF0DF] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Resume Header */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="flex justify-center mb-4">
            <FileText className="text-gray-700" size={32} />
          </div>
          <h1 className="text-5xl font-bold text-gray-700">Resume</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Work History & Education */}
          <div>
            {/* Work History Section */}
            <div className="mb-16">
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-[#8ACB82] flex items-center justify-center mr-4">
                  <Briefcase className="text-white" size={20} />
                </div>
                <h2 className="text-xl text-gray-700 font-medium">WORK HISTORY</h2>
              </div>

              <div className="relative pl-6">
                {/* Timeline line */}
                <div className="absolute left-[26px] top-0 bottom-0 w-0.5 bg-white"></div>

                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  workHistory.map((job, index) => (
                    <div key={index} className="relative mb-12 pl-8">
                      {/* Timeline dot - positioned so the line cuts through it */}
                      <div className="absolute left-[-3px] top-2 w-3 h-3 rounded-full bg-[#8ACB82] z-10"></div>

                      <DateBadge date={job.date} className="mb-4" />

                      <h3 className="text-lg font-semibold text-gray-700 mb-1">{job.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{job.company}</p>
                      <p className="text-gray-600">{job.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Education Section */}
            <div>
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 rounded-full bg-[#8ACB82] flex items-center justify-center mr-4">
                  <GraduationCap className="text-white" size={20} />
                </div>
                <h2 className="text-xl text-gray-700 font-medium">EDUCATION</h2>
              </div>

              <div className="relative pl-6">
                {/* Timeline line */}
                <div className="absolute left-[26px] top-0 bottom-0 w-0.5 bg-white"></div>

                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  education.map((edu, index) => (
                    <div key={index} className="relative mb-12 pl-8">
                      {/* Timeline dot - positioned so the line cuts through it */}
                      <div className="absolute left-[-3px] top-2 w-3 h-3 rounded-full bg-[#8ACB82] z-10"></div>

                      <DateBadge date={edu.date} className="mb-4" />

                      <h3 className="text-lg font-semibold text-gray-700 mb-1">{edu.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{edu.institution}</p>
                      <p className="text-gray-600">{edu.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Download CV Button */}
            <div className="mt-8">
              <button className="border-2 border-gray-700 text-gray-700 px-6 py-3 flex items-center hover:bg-gray-700 hover:text-white transition-colors">
                <FileText className="mr-2" size={18} />
                DOWNLOAD CV
              </button>
            </div>
          </div>

          {/* Right Column - Skills & Testimonials */}
          <div>
            {/* Coding Skills Section */}
            <div className="mb-16">
              <div className="flex justify-center mb-8">
                <SectionHeader title="CODING SKILLS" className="mb-0" />
              </div>

              <div className="space-y-6">
                {isLoading ? (
                  <div className="animate-pulse space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-[40px]"></div>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                        <div className="h-4 bg-gray-200 rounded w-[40px]"></div>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                ) : (
                  codingSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-gray-500">{skill.percentage}</span>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#8ACB82] rounded-full"
                          style={{ width: `${skill.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Design Skills Section */}
            <div className="mb-16">
              <div className="flex justify-center mb-8">
                <SectionHeader title="DESIGN SKILLS" className="mb-0" />
              </div>

              <div className="space-y-6">
                {isLoading ? (
                  <div className="animate-pulse space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-[40px]"></div>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <div className="h-4 bg-gray-200 rounded w-1/5"></div>
                        <div className="h-4 bg-gray-200 rounded w-[40px]"></div>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                ) : (
                  designSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700">{skill.name}</span>
                        <span className="text-gray-500">{skill.percentage}</span>
                      </div>
                      <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#8ACB82] rounded-full"
                          style={{ width: `${skill.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Testimonials Section */}
            <div>
              <div className="flex justify-center mb-8">
                <SectionHeader title="TESTIMONIALS" className="mb-0" />
              </div>

              <div className="space-y-8">
                {isLoading ? (
                  <div className="animate-pulse">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-gray-200 mb-5"></div>
                      <div className="bg-white flex flex-col items-center pt-12 px-8 pb-8 rounded-lg">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  testimonials.map((testimonial, index) => (
                    <div key={index} className="relative max-w-md">
                      <div className="flex flex-col items-center">
                        <div className="w-20 absolute top-12 h-20 rounded-full overflow-hidden mb-5 relative">
                          <Image
                            src={testimonial.image.url || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="bg-white flex flex-col items-center pt-12 px-8 pb-8 rounded-lg shadow-sm">
                          <h3 className="font-medium text-gray-700 text-lg mb-1">{testimonial.name}</h3>
                          <p className="text-xs text-gray-400 uppercase tracking-wider mb-6">{testimonial.position}</p>
                          <p className="text-gray-600 text-center leading-relaxed">{testimonial.text}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
