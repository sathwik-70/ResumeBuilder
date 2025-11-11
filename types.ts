
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  location: string;
  image: string; // base64 encoded image
  summary: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location:string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  gradDate: string;
}

export interface Project {
    id: string;
    name: string;
    description: string;
    tech: string;
    link: string;
}

export interface Certification {
    id: string;
    name: string;
    issuer: string;
}

export interface Language {
    id: string;
    name: string;
    level: string;
    proficiency: number; // 0-5 scale
}

export interface Resume {
  personalInfo: PersonalInfo;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  profiles: string[];
  certifications: Certification[];
  languages: Language[];
  sectionOrder: Section[];
}

export enum Section {
  PERSONAL_INFO = 'Personal Info',
  EXPERIENCE = 'Experience',
  EDUCATION = 'Education',
  PROJECTS = 'Projects',
  TEMPLATES = 'Templates',
  SKILLS = 'Skills',
  PROFILES = 'Websites & Profiles',
  CERTIFICATIONS = 'Certifications',
  LANGUAGES = 'Languages',
}

export enum Template {
    CRAFTER = 'Crafter',
    ONYX = 'Onyx',
    MODERN = 'Modern',
    CLASSIC = 'Classic',
    EXECUTIVE = 'Executive',
    INFOGRAPHIC = 'Infographic',
    MIDNIGHT = 'Midnight',
    COLORFUL = 'Colorful',
    CREATIVE = 'Creative',
    MONOCHROME = 'Monochrome',
    CORPORATE_BLUE = 'Corporate Blue',
    SLATE = 'Slate',
    CAMBRIDGE = 'Cambridge',
    TECHIE = 'Techie',
    VANGUARD = 'Vanguard',
    CRIMSON = 'Crimson',
    SPECTRUM = 'Spectrum',
    SUNRISE = 'Sunrise',
    OCEAN = 'Ocean',
    ARTISAN = 'Artisan',
    MINIMAL = 'Minimal',
    TYPOGRAPHIC = 'Typographic',
    EMERALD = 'Emerald',
    RUBY = 'Ruby',
    GOLDENROD = 'Goldenrod',
}

export type ListSectionKey = 'experience' | 'education' | 'projects' | 'certifications' | 'languages';