export interface ResumeProfile {
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

export interface ResumeEducation {
  degree: string
  field: string
  institution: string
  location: string
  startDate: string
  endDate: string
  gpa?: string
  honors?: string[]
}

export interface ResumeWorkExperience {
  company: string
  position: string
  location: string
  startDate: string
  endDate: string | 'Present'
  achievements: string[]
  technologies?: string[]
}

export interface ResumeProject {
  title: string
  description: string
  technologies: string[]
  link?: string
  highlights: string[]
}

export interface ResumeSkillCategory {
  category: string
  skills: string[]
}

export interface ResumeCertification {
  name: string
  issuer: string
  date: string
  link?: string
}

export interface ResumeLanguage {
  language: string
  proficiency: string
  certification?: string
}

export interface Resume {
  profile: ResumeProfile
  education: ResumeEducation[]
  workExperience: ResumeWorkExperience[]
  projects: ResumeProject[]
  skills: ResumeSkillCategory[]
  certifications?: ResumeCertification[]
  languages?: ResumeLanguage[]
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
