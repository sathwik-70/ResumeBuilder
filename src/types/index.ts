export interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  linkedin: string
  website: string
  summary: string
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  startDate: string
  endDate: string
  gpa: string
  location: string
  description: string
}

export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  location: string
  description: string
  achievements: string[]
}

export interface Skill {
  id: string
  name: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  category: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  expiryDate: string
  credentialId: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url: string
  startDate: string
  endDate: string
}

export interface Language {
  id: string
  name: string
  proficiency: 'basic' | 'conversational' | 'fluent' | 'native'
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
}

export interface Interest {
  id: string
  name: string
  description: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skill[]
  certifications: Certification[]
  projects: Project[]
  languages: Language[]
  achievements: Achievement[]
  interests: Interest[]
  template: string
  layout: 'single' | 'double'
}

export interface Template {
  id: string
  name: string
  category: 'tech' | 'creative' | 'management' | 'traditional'
  style: 'modern' | 'minimalist' | 'traditional'
  preview: string
  description: string
}

export type StepType = 
  | 'personal'
  | 'education'
  | 'experience'
  | 'skills'
  | 'certifications'
  | 'projects'
  | 'languages'
  | 'achievements'
  | 'interests'
  | 'template'
  | 'preview' 