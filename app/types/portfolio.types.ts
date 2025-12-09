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
  projects: Project[]
}
