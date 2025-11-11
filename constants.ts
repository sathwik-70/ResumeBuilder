
import { Resume, Section } from './types';

export const SECTIONS = [
  Section.PERSONAL_INFO,
  Section.EXPERIENCE,
  Section.EDUCATION,
  Section.PROJECTS,
  Section.TEMPLATES,
  Section.SKILLS,
  Section.PROFILES,
  Section.CERTIFICATIONS,
  Section.LANGUAGES,
];

export const REORDERABLE_SECTIONS = [
  Section.EXPERIENCE,
  Section.EDUCATION,
  Section.PROJECTS,
  Section.SKILLS,
  Section.PROFILES,
  Section.CERTIFICATIONS,
  Section.LANGUAGES,
];

export const INITIAL_RESUME_DATA: Resume = {
  personalInfo: {
    name: 'SATHWIK PAMU',
    email: 'sathwikpamu@gmail.com',
    phone: '+919676074942',
    website: 'homesteadhaven.netlify.app',
    linkedin: 'https://www.linkedin.com/in/sathwik-pamu/',
    location: 'Karimnagar, IN 505415',
    image: '', // New field for profile picture
    summary: 'Passionate full-stack developer skilled in building scalable, modern web applications with React, TypeScript, Firebase, and Node.js. Strong background in UI/UX design, authentication systems, cloud deployment, and 3D visual interfaces. Adept at transforming ideas into robust digital products.',
  },
  experience: [], // Experience section was empty in the image, can be added by user.
  education: [
    {
      id: 'edu1',
      degree: 'B.Tech: Computer Science Engineering',
      school: 'Malla Reddy University',
      location: 'Hyderabad',
      gradDate: 'Expected in June 2026',
    },
    {
      id: 'edu2',
      degree: 'High School Diploma',
      school: 'Alphores Junior College',
      location: 'Karimnagar, India',
      gradDate: 'March 2022',
    },
  ],
  skills: [
    'JavaScript', 'TypeScript', 'Python', 'Java',
    'React', 'Node.js', 'Express', 'Tailwind CSS', 'Framer Motion', 'Firebase Functions',
    'MongoDB', 'SQLite',
    'Git', 'GitHub', 'Netlify', 'Google OAuth', 'REST APIs', 'Postman', 'JWT', 'VS Code',
    'Friendly, positive attitude'
  ],
  projects: [
      {
          id: 'proj1',
          name: 'Homestead Haven',
          link: 'https://homesteadhaven.netlify.app/',
          description: 'A home rental property platform with Google login, property booking, admin dashboard, and responsive design.',
          tech: 'Tech: React, TypeScript, Tailwind CSS, Firebase'
      },
      {
          id: 'proj2',
          name: 'QuRe - QR Health Report System',
          link: 'https://github.com/sathwik-70/QuRe.git',
          description: 'Python app to store and access health reports using QR codes for hospitals.',
          tech: 'Tech: Python, SQLite, QRCode'
      }
  ],
  profiles: [
    'linkedin.com/in/sathwik-pamu',
    'github.com/sathwik-70',
    'jupymate.netlify.app',
    'homesteadhaven.netlify.app',
  ],
  certifications: [
    { id: 'cert1', name: 'Python Programmer Certification', issuer: 'Fundamentals of Java' },
    { id: 'cert2', name: 'Introduction to Scripting in Python Specialization', issuer: 'Rice University' },
    { id: 'cert3', name: 'Python 3 Programming Specialization', issuer: 'University of Michigan' },
    { id: 'cert4', name: 'Computational Thinking with Beginning C Programming', issuer: 'Belgium University' },
  ],
  languages: [
    { id: 'lang1', name: 'English', level: 'Advanced (C1)', proficiency: 4 },
  ],
  sectionOrder: [
    Section.EXPERIENCE,
    Section.EDUCATION,
    Section.PROJECTS,
    Section.SKILLS,
    Section.PROFILES,
    Section.CERTIFICATIONS,
    Section.LANGUAGES
  ],
};
