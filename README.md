# Kenneth's Portfolio Website

![Portfolio Preview](/public/profile-image.png)

## Overview

This is a modern, interactive portfolio website built with Next.js and integrated with Hygraph CMS. The portfolio features a sleek animated sidebar navigation and multiple content sections including Home, About, Resume, Certifications, Portfolio, Blog, and Contact. The site is fully responsive and includes smooth transitions between sections.

## Features

- **Animated Section Transitions**: Smooth animations when navigating between different sections
- **Responsive Design**: Optimized for all device sizes with a mobile-friendly navigation
- **CMS Integration**: Dynamic content management through Hygraph CMS
- **Interactive Elements**: 
  - Portfolio project showcase with filtering by category
  - Certification display with detailed views
  - Blog posts with full article views
  - Interactive resume with skills visualization
- **Map Integration**: Interactive map in the contact section
- **Animated Typing Effect**: Dynamic text animation on the home page
- **Category Filtering**: Filter portfolio projects and certifications by category
- **Loading States**: Skeleton loading states for better user experience during data fetching

## Technologies Used

- **Frontend**:
  - Next.js 14+ (React framework)
  - TypeScript
  - Tailwind CSS (for styling)
  - Framer Motion (for animations)
  - Lucide React (for icons)

- **CMS**:
  - Hygraph CMS (headless GraphQL CMS)

- **Maps**:
  - Leaflet (for interactive maps)

- **Other Libraries**:
  - ShadCN UI (component library)

## Project Structure

\`\`\`
├── app/                  # Next.js app directory
│   ├── layout.tsx        # Root layout component
│   ├── page.tsx          # Main page component
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── sections/         # Page section components
│   │   ├── home-section.tsx
│   │   ├── about-section.tsx
│   │   ├── resume-section.tsx
│   │   ├── certifications-section.tsx
│   │   ├── portfolio-section.tsx
│   │   ├── blogs-section.tsx
│   │   └── contact-section.tsx
│   ├── sidebar.tsx       # Navigation sidebar component
│   ├── florida-map.tsx   # Map component
│   ├── section-header.tsx # Section header component
│   └── date-badge.tsx    # Date badge component
├── lib/                  # Utility functions
│   └── hygraph.ts        # Hygraph CMS API client
├── public/               # Static assets
│   ├── profile-image.png # Profile image
│   └── ...               # Other images and assets
└── README.md             # Project documentation
\`\`\`

## Setup and Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Hygraph CMS account

### Installation Steps

1. **Clone the repository**

\`\`\`bash
git clone [https://github.com/geekythe/kenneth.git]
cd kenneth-portfolio
\`\`\`

2. **Install dependencies**

\`\`\`bash
npm install
# or
yarn install
\`\`\`

3. **Set up environment variables**

Create a `.env.local` file in the root directory with the following variables:

\`\`\`
NEXT_PUBLIC_HYGRAPH_API_URL=https://us-west-2.cdn.hygraph.com/content/cm9pvby8t01wm07wcm0lwwf5u/master
\`\`\`

4. **Run the development server**

\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000) to see the website.

## Hygraph CMS Configuration

This project uses Hygraph CMS to manage content. Here's how to set up your content models:

### Content Models

1. **Work History**
   - `date`: String
   - `title`: String
   - `company`: String
   - `description`: String

2. **Education**
   - `date`: String
   - `title`: String
   - `institution`: String
   - `description`: String

3. **Testimonials**
   - `name`: String
   - `position`: String
   - `image`: Asset (Image)
   - `text`: String

4. **Coding Skills**
   - `name`: String
   - `percentage`: Number

5. **Design Skills**
   - `name`: String
   - `percentage`: Number

6. **Portfolio Projects**
   - `number`: Number
   - `title`: String
   - `subtitle`: String
   - `category`: String
   - `image`: Asset (Image)
   - `description`: String
   - `technology`: Reference to Technology model (multiple)

7. **Technology**
   - `techused`: String

8. **Certifications**
   - `order`: Number
   - `title`: String
   - `issuer`: String
   - `date`: String
   - `category`: String
   - `image`: Asset (Image)
   - `description`: String
   - `credentialId`: String
   - `credentialurl`: String (optional)
   - `details`: String (optional)
   - `skill`: Reference to Technology model (multiple)

9. **Blogs**
   - `order`: Number
   - `title`: String
   - `excerpt`: String
   - `date`: Object
     - `day`: Number
     - `month`: String
   - `category`: String
   - `image`: Asset (Image)
   - `content`: Rich Text
   - `tags`: Reference to Technology model (multiple)

10. **About Services**
    - `description`: String
    - `service`: Reference to Service model

11. **Service**
    - `title`: String
    - `icon`: Asset (Image)

12. **About Clients**
    - `client`: Reference to Client model

13. **Client**
    - `title`: String
    - `icon`: Asset (Image)

### GraphQL Queries

The project uses the following GraphQL queries to fetch data from Hygraph CMS:

```graphql
# Work History
query WorkHistory {
  works {
    date
    title
    company
    description
  }
}

# Education
query Education {
  educations {
    date
    title
    institution
    description
  }
}

# Testimonials
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

# Design Skills
query DesignSkills {
  designskills {
    name
    percentage
  }
}

# Coding Skills
query CodingSkills {
  codingskills {
    name
    percentage
  }
}

# Portfolio Projects
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

# Certifications
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

# Blogs
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

# About Services
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

# About Clients
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
