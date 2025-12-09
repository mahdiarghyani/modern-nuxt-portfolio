export interface Profile {
  name: string
  title: string
  avatar: string | null
  bio: string
  location: string
  email: string
  github?: string
  linkedin?: string
  twitter?: string
  website?: string
}

export interface Education {
  degree: string
  field: string
  institution: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  description?: string
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'ai' | 'other'
  level: 'expert' | 'proficient' | 'familiar'
  icon?: string
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  tags: string[]
  links?: {
    github?: string
    demo?: string
    website?: string
  }
  featured?: boolean
  startDate?: string
  endDate?: string
  status?: 'completed' | 'in-progress' | 'archived'
}

export interface WorkExperience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string | 'present'
  description: string
  achievements: string[]
  technologies: string[]
  logo?: string
}

export interface PortfolioData {
  profile: Profile
  education: Education[]
  skills: Skill[]
  projects: Project[]
  workExperience: WorkExperience[]
}
