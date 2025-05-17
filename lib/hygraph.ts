// Hygraph API client for fetching data

const API_URL = "https://us-west-2.cdn.hygraph.com/content/cm9pvby8t01wm07wcm0lwwf5u/master"

/**
 * Fetch data from Hygraph CMS
 */
export async function fetchHygraph<T>(query: string): Promise<T> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 }, // Revalidate every minute
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`)
    }

    const { data } = await response.json()
    return data as T
  } catch (error) {
    console.error("Error fetching data from Hygraph:", error)
    throw error
  }
}

// Resume section queries
export async function getWorkHistory() {
  const query = `
    query WorkHistory {
      works {
        date
        title
        company
        description
      }
    }
  `

  const data = await fetchHygraph<{ works: WorkHistory[] }>(query)
  return data.works
}

export async function getEducation() {
  const query = `
    query Education {
      educations {
        date
        title
        institution
        description
      }
    }
  `

  const data = await fetchHygraph<{ educations: Education[] }>(query)
  return data.educations
}

export async function getTestimonials() {
  const query = `
    query Testimonials {
      testimonials {
        name
        position
        image {
          url
        }
        text
      }
    }
  `

  const data = await fetchHygraph<{ testimonials: Testimonial[] }>(query)
  return data.testimonials
}

export async function getDesignSkills() {
  const query = `
    query DesignSkills {
      designskills {
        name
        percentage
      }
    }
  `

  const data = await fetchHygraph<{ designskills: Skill[] }>(query)
  return data.designskills
}

export async function getCodingSkills() {
  const query = `
    query CodingSkills {
      codingskills {
        name
        percentage
      }
    }
  `

  const data = await fetchHygraph<{ codingskills: Skill[] }>(query)
  return data.codingskills
}

// Portfolio section queries
export async function getPortfolioProjects() {
  const query = `
    query PortfolioProjects {
      portfolios {
        number
        title
        subtitle
        category
        image {
          url
        }
        description
        technology {
          techused
        }
      }
    }
  `

  const data = await fetchHygraph<{ portfolios: PortfolioProject[] }>(query)
  return data.portfolios
}

// Certifications section queries
export async function getCertifications() {
  const query = `
    query Certifications {
      certifications {
        order
        title
        issuer
        date
        category
        image {
          url
        }
        description
        credentialId
        credentialurl
        details
        skill {
          techused
        }
      }
    }
  `

  const data = await fetchHygraph<{ certifications: Certification[] }>(query)
  return data.certifications
}

// Blog section queries
export async function getBlogs() {
  const query = `
    query Blogs {
      blogs {
        order
        title
        excerpt
        date {
          day
          month
        }
        category
        image {
          url
        }
        content {
          html
        }
        tags {
          techused
        }
      }
    }
  `

  const data = await fetchHygraph<{ blogs: Blog[] }>(query)
  return data.blogs
}

// About section queries
export async function getAboutServices() {
  const query = `
    query AboutServices {
      aboutServices {
        description
        service {
          title
          icon {
            url
          }
        }
      }
    }
  `

  const data = await fetchHygraph<{ aboutServices: AboutService[] }>(query)
  return data.aboutServices
}

export async function getAboutClients() {
  const query = `
    query AboutClients {
      aboutClients {
        client {
          title
          icon {
            url
          }
        }
      }
    }
  `

  const data = await fetchHygraph<{ aboutClients: AboutClient[] }>(query)
  return data.aboutClients
}

// Type definitions
export interface WorkHistory {
  date: string
  title: string
  company: string
  description: string
}

export interface Education {
  date: string
  title: string
  institution: string
  description: string
}

export interface Testimonial {
  name: string
  position: string
  image: {
    url: string
  }
  text: string
}

export interface Skill {
  name: string
  percentage: number
}

export interface PortfolioProject {
  number: number
  title: string
  subtitle: string
  category: string
  image: {
    url: string
  }
  description: string
  technology: {
    techused: string
  }[]
}

export interface Certification {
  order: number
  title: string
  issuer: string
  date: string
  category: string
  image: {
    url: string
  }
  description: string
  credentialId: string
  credentialurl?: string
  details?: string
  skill: {
    techused: string
  }[]
}

export interface Blog {
  order: number
  title: string
  excerpt: string
  date: {
    day: number
    month: string
  }
  category: string
  image: {
    url: string
  }
  content: {
    html: string
  }
  tags: {
    techused: string
  }[]
}

export interface AboutService {
  description: string
  service: {
    title: string
    icon: {
      url: string
    }
  }
}

export interface AboutClient {
  client: {
    title: string
    icon: {
      url: string
    }
  }
}
