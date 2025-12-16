export interface Profile {
  name: string
  title: string
  avatar: string | null
  location: string
  summary: string
  bio?: string
  socials: {
    email?: string
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
    telegram?: string
    whatsapp?: string
    instagram?: string
    x?: string
    spotify?: string
    bento?: string
    [key: string]: string | undefined
  }
}

export interface Education {
  school: string
  degree: string
  start: string
  end: string
  icons?: string[]
  logo?: string | null
}

export type SkillType =
  | 'Language'
  | 'Framework'
  | 'Library'
  | 'Tool'
  | 'Service'
  | 'DevOps'
  | 'Testing'
  | 'Data'

export const SKILL_TYPES: readonly SkillType[] = [
  'Language',
  'Framework',
  'Library',
  'Tool',
  'Service',
  'DevOps',
  'Testing',
  'Data',
] as const

export type Tag = {
  label: string
  icon?: string
  description?: string
  to?: string
  type?: SkillType
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
  name: string
  description: string
  thumbnail?: string
  status?: string
  opensource?: boolean
  links?: Array<{
    label: string
    to: string
    icon?: string
  }>
  icons?: string[]
  category?: 'current' | 'freelance' | 'public'
}

// Backward-compatible single-position experience
export interface Experience {
  company: string
  role: string
  start: string
  end?: string
  ongoing?: boolean
  description: string[]
  icons?: string[]
  location?: string
  type?: string
  link?: string
  linkLabel?: string
  logo?: string
}

// Position inside a company timeline (LinkedIn-style)
export interface Position {
  title: string
  start: string
  end?: string
  ongoing?: boolean
  description: string[]
  icons?: string[]
  location?: string
  type?: string
  link?: string
  linkLabel?: string
  logo?: string
}

// Company grouping multiple positions
export interface CompanyExperience {
  company: string
  link?: string
  logo?: string
  location?: string
  type?: string
  positions: Position[]
}

// Alias for backward compatibility
export interface WorkExperience extends CompanyExperience {}

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
  values?: {
    title: string
    items: ValueItem[]
  }
  // Supports both single experiences and grouped company timelines
  experiences: Array<Experience | CompanyExperience>
  education: Education[]
  projects: Project[]
}
