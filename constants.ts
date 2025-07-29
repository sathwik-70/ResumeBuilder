
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
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '+1 (123) 456-7890',
    website: 'janedoe.dev',
    linkedin: 'linkedin.com/in/janedoe',
    location: 'San Francisco, CA',
    image: '', // New field for profile picture
    summary: 'A highly motivated and results-oriented Software Engineer with 5+ years of experience in designing, developing, and deploying scalable full-stack web applications. Proven ability to translate business requirements into technical solutions and contribute to team success in fast-paced Agile environments. Eager to leverage expertise in modern JavaScript frameworks to build innovative products.',
  },
  experience: [
    {
      id: 'exp1',
      title: 'Senior Software Engineer',
      company: 'Tech Solutions Inc.',
      location: 'San Francisco, CA',
      startDate: 'Jan 2022',
      endDate: 'Present',
      description: [
        'Architected and led the development of a new microservices-based platform, improving system scalability and reducing latency by 30%.',
        'Collaborated with product managers and designers to define, design, and ship new features for the company\'s flagship product.',
        'Mentored junior engineers, conducted code reviews, and established best practices for front-end development.',
      ]
    },
    {
      id: 'exp2',
      title: 'Web Developer',
      company: 'Digital Creations Co.',
      location: 'Boston, MA',
      startDate: 'Jun 2019',
      endDate: 'Dec 2021',
      description: [
        'Developed responsive and interactive user interfaces for client websites using React and Redux.',
        'Built and maintained REST APIs with Node.js and Express to support front-end functionality.',
        'Improved application performance and resolved critical bugs, leading to a 25% increase in user satisfaction.',
      ]
    }
  ],
  education: [
    {
      id: 'edu1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'State University',
      location: 'Anytown, USA',
      gradDate: 'May 2019',
    },
  ],
  skills: [
    'JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js', 'Express.js',
    'HTML5 & CSS3', 'Tailwind CSS', 'SASS',
    'SQL (PostgreSQL)', 'NoSQL (MongoDB)',
    'REST APIs', 'GraphQL',
    'Git & GitHub', 'Docker', 'Jest', 'Agile Methodologies'
  ],
  projects: [
      {
          id: 'proj1',
          name: 'E-commerce Platform',
          link: 'github.com/janedoe/e-commerce',
          description: 'A full-featured e-commerce site with user authentication, product catalog, shopping cart, and a secure checkout process.',
          tech: 'Tech: React, Node.js, Express, MongoDB, Stripe API'
      },
      {
          id: 'proj2',
          name: 'Project Management Tool',
          link: 'github.com/janedoe/pm-tool',
          description: 'A web application to help teams manage tasks, track progress, and collaborate effectively, featuring a real-time drag-and-drop interface.',
          tech: 'Tech: TypeScript, React, Firebase, Framer Motion'
      }
  ],
  profiles: [
    'linkedin.com/in/janedoe',
    'github.com/janedoe',
    'janedoe.dev',
  ],
  certifications: [
    { id: 'cert1', name: 'Certified Cloud Practitioner', issuer: 'Major Cloud Provider' },
    { id: 'cert2', name: 'Agile & Scrum Certified', issuer: 'Professional Agile Institute' },
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
