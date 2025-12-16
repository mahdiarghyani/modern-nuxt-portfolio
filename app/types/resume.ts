/**
 * Resume Types - JSON Resume Schema Compatible
 * Based on https://jsonresume.org/schema/
 */

export interface ResumeLocation {
  city: string
  country: string
  address?: string
  postalCode?: string
  region?: string
}

export interface ResumeProfile {
  network: string
  url: string
  username?: string
  icon?: string
}

export interface ResumeBasics {
  name: string
  label: string
  image?: string
  email: string
  phone?: string
  url?: string
  summary: string
  location: ResumeLocation
  profiles?: ResumeProfile[]
}

export interface ResumeWorkExperience {
  company: string
  position: string
  location?: string
  url?: string
  startDate: string
  endDate?: string
  summary?: string
  highlights: string[]
}

export interface ResumeEducation {
  institution: string
  area: string
  studyType: string
  startDate: string
  endDate?: string
  score?: string
  courses?: string[]
}

export interface ResumeSkillCategory {
  name: string
  level?: string
  keywords: string[]
}

export interface ResumeLanguage {
  language: string
  fluency: string
}

export interface ResumeCertificate {
  name: string
  date?: string
  issuer?: string
  url?: string
}

export interface ResumeProject {
  name: string
  description: string
  highlights: string[]
  keywords: string[]
  startDate?: string
  endDate?: string
  url?: string
  roles?: string[]
  entity?: string
  type?: string
}

export interface Resume {
  basics: ResumeBasics
  work: ResumeWorkExperience[]
  education: ResumeEducation[]
  skills: ResumeSkillCategory[]
  languages?: ResumeLanguage[]
  certificates?: ResumeCertificate[]
  projects?: ResumeProject[]
}

// Legacy types for backward compatibility (if needed)
export interface LegacyResumeProfile {
  name: string
  title: string
  email: string
  phone?: string
  location: string
  linkedin?: string
  github?: string
  website?: string
  summary: string
}

export interface ResumePdfOptions {
  format?: 'A4' | 'Letter'
  margin?: {
    top?: string
    right?: string
    bottom?: string
    left?: string
  }
  printBackground?: boolean
  preferCSSPageSize?: boolean
}
