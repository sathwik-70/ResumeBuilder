
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
    name: 'JOHN DOE',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    website: 'johndoe.dev',
    linkedin: 'linkedin.com/in/johndoe',
    location: 'San Francisco, CA',
    image: '', // User can upload their own image
    summary: 'Passionate Software Engineer with expertise in building scalable web applications using React, Node.js, and modern cloud technologies. Proven track record of improving application performance and leading cross-functional teams to deliver high-quality software solutions. Dedicated to continuous learning and implementing best practices in Agile environments.',
  },
  experience: [
    {
      id: 'exp1',
      title: 'Senior Software Engineer',
      company: 'Tech Innovators Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: [
        'Architected and developed high-performance web applications using React and Node.js, resulting in a 40% improvement in page load times.',
        'Implemented complex user features including real-time collaboration tools and interactive dashboards, enhancing user engagement by 25%.',
        'Mentored a team of 4 junior developers, conducting detailed code reviews and facilitating knowledge sharing sessions to improve overall code quality.'
      ]
    }
  ],
  education: [
    {
      id: 'edu1',
      degree: 'BS Computer Science',
      school: 'University of Technology',
      location: 'New York, NY',
      gradDate: 'May 2021',
    }
  ],
  skills: [
    'JavaScript (ES6+)', 'TypeScript', 'React.js', 'Node.js', 'Next.js', 'Tailwind CSS', 'GraphQL', 'AWS', 'Docker', 'CI/CD Pipelines'
  ],
  projects: [
      {
          id: 'proj1',
          name: 'E-Commerce Analytics Dashboard',
          link: 'github.com/johndoe/dashboard',
          description: 'Developed a comprehensive real-time analytics dashboard for e-commerce clients, enabling data-driven decision making through interactive data visualization.',
          tech: 'React, D3.js, Firebase, Stripe API'
      },
      {
          id: 'proj2',
          name: 'Task Flow Manager',
          link: 'github.com/johndoe/taskmanager',
          description: 'Designed and built a drag-and-drop task management application featuring collaborative workspaces, real-time updates using WebSockets, and dark mode support.',
          tech: 'Vue.js, Node.js, MongoDB, Socket.io'
      }
  ],
  profiles: [
    'linkedin.com/in/johndoe',
    'github.com/johndoe',
    'johndoe.dev',
  ],
  certifications: [
    { id: 'cert1', name: 'AWS Certified Cloud Practitioner', issuer: 'Amazon Web Services' },
    { id: 'cert2', name: 'Meta Front-End Developer Professional Certificate', issuer: 'Coursera' },
  ],
  languages: [
    { id: 'lang1', name: 'English', level: 'Native', proficiency: 5 },
    { id: 'lang2', name: 'Spanish', level: 'Intermediate', proficiency: 3 },
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
