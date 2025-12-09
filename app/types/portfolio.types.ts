export interface Profile {
  name: string
  title: string
  avatar: string | null
  location: string
  summary: string
  socials: {
    email?: string
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
    telegram?: string
    whatsapp?: string
    instagram?: string
    [key: string]: string | undefined
  }
}

export interface Education {
  institution: string
  degree: string
  field: string
  location: string
  start: string
  end: string
  gpa?: string
  description?: string
  honors?: string[]
}

export interface Skill {
  name: string
  level: 'expert' | 'proficient' | 'familiar'
  icon?: string
}

export interface SkillCategory {
  name: string
  skills: Skill[]
}

export interface IconItem {
  label: string
  icon: string
  description?: string
}

export interface ValueItem extends IconItem {
  description: string
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

export interface Position {
  title: string
  start: string
  end?: string
  ongoing?: boolean
  description: string[]
  icons?: string[]
  link?: string
  linkLabel?: string
}

export interface WorkExperience {
  company: string
  logo?: string
  link?: string
  location: string
  type: string
  positions: Position[]
}

export interface PortfolioData {
  profile: Profile
  mainTools: {
    title: string
    items: IconItem[]
  }
  roles: {
    title: string
    items: IconItem[]
  }
  values: {
    title: string
    items: ValueItem[]
  }
  experiences: WorkExperience[]
  education: Education[]
  skills: {
    title: string
    categories: SkillCategory[]
  }
  projects: Project[]
}
