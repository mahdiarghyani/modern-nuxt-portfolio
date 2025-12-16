/**
 * Resume Data - Mahdi Arghyani
 * Based on RESUME-STANDARDS.md (docs/RESUME-STANDARDS.md)
 * Optimized for ATS and 2025 best practices
 * Version: 1.0 - 2-Page Resume (International Remote Positions)
 * 
 * ⚠️ BEFORE EDITING: Give docs/RESUME-UPDATE-RULES.md to any AI agent
 * 
 * Quick command for AI:
 * "Read docs/RESUME-UPDATE-RULES.md and update my resume"
 */

import type { Resume } from '~/types/resume'

export const resumeData: Resume = {
  basics: {
    name: 'Mahdi Arghyani',
    label: 'Frontend Developer | Vue.js • Nuxt.js • TypeScript',
    image: '/img/profile.jpg',
    email: 'mahdiarghyani12@gmail.com',
    phone: '+98 915 430 9058',
    url: 'https://mahdiarghyani.vercel.app',
    location: {
      city: 'Tehran',
      country: 'Iran',
    },
    profiles: [
      {
        network: 'LinkedIn',
        url: 'https://linkedin.com/in/mahdi-arghyani',
        icon: 'i-mdi-linkedin',
      },
      {
        network: 'GitHub',
        url: 'https://github.com/mahdiarghyani',
        icon: 'i-mdi-github',
      },
      {
        network: 'Portfolio',
        url: 'https://mahdiarghyani.vercel.app',
        icon: 'i-mdi-web',
      },
    ],
    summary:
      'Frontend Developer with **2+ years** building high-performance Vue.js/Nuxt applications for international clients. **AI-first engineer** leveraging AI-powered tools & methodologies to accelerate development by up to **2x** while maintaining code quality. Specialized in performance optimization, scalable architecture (SSR, SSG, PWA), and accessibility. Delivered **3 production applications** with focus on maintainability and clean code architecture.',
  },

  work: [
    {
      company: 'Freelance',
      position: 'Frontend Developer (Remote)',
      location: 'Tehran, Iran',
      startDate: '2023-09',
      highlights: [
        'Delivered **3 production-grade** web applications for international clients using Vue.js/Nuxt.js, consistently achieving strong performance metrics and high client satisfaction',
        'Leveraged AI development tools to reduce development time by **at least 50%** across all projects, enabling faster client delivery and **100% on-time** project completion rate',
        '**Ideh** - Idea evaluation platform with reusable component library reducing development time by **30%** and scalable Vue.js architecture',
        '**Insho** - Advertising marketplace with advanced dynamic form handling (schema-based architecture), modern backend-frontend structure reducing integration time by at least 50%, and responsive UI for creator-brand matching',
        '**BaMashin** - Mobility rental platform with payment integration and responsive UI optimized for mobile/desktop',
        'Led client communications, translated business requirements into technical specifications, delivered iteratively with clear documentation and transparent progress updates',
      ],
    },
  ],

  education: [
    {
      institution: 'University of Tehran',
      area: 'Computer Engineering',
      studyType: 'Bachelor of Engineering',
      startDate: '2018-09',
      endDate: '2022-06',
      courses: [
        'Software Architecture',
        'Data Structures & Algorithms',
        'Web Development',
        'Database Systems',
      ],
    },
  ],

  skills: [
    {
      name: 'Frontend Core',
      keywords: [
        'Vue.js',
        'Nuxt.js',
        'TypeScript',
        'JavaScript (ES6+)',
        'HTML5',
        'CSS3',
        'Pinia',
        'Vuetify',
        'Tailwind CSS',
      ],
    },
    {
      name: 'AI-Assisted Development',
      keywords: [
        'Cursor AI',
        'GitHub Copilot',
        'Codex',
        'BMad Method',
        'Claude/ChatGPT',
        'Prompt Engineering',
        'AI-Powered Code Review',
      ],
    },
    {
      name: 'Architecture & Performance',
      keywords: [
        'SSR (Server-Side Rendering)',
        'SSG (Static Site Generation)',
        'PWA (Progressive Web Apps)',
        'Code Splitting & Lazy Loading',
        'Performance Optimization',
      ],
    },
    {
      name: 'Development Tools & Workflow',
      keywords: [
        'Git/GitHub',
        'GitHub Actions (CI/CD)',
        'ESLint/Prettier',
        'Vite',
        'VueUse',
        'REST APIs',
      ],
    },
    {
      name: 'Quality & Accessibility',
      keywords: [
        'WCAG 2.1 Compliance',
        'Lighthouse Optimization',
        'Code Review',
        'i18n Internationalization',
        'Responsive Design',
      ],
    },
  ],

  languages: [
    {
      language: 'Persian',
      fluency: 'Native',
    },
    {
      language: 'English',
      fluency: 'Upper-Intermediate',
    },
  ],

  certificates: [],

  projects: [
    {
      name: 'Ideh',
      description:
        'Idea evaluation & market insights platform with scalable architecture and reusable component library',
      highlights: [
        'Component library reduced development time by 30%',
        'Scalable Vue.js architecture',
        'Dynamic form generation system',
      ],
      keywords: ['Vue.js', 'Nuxt.js', 'Component Library'],
      startDate: '2023-09',
      url: 'https://ideh.app',
      roles: ['Frontend Developer'],
      type: 'application',
    },
    {
      name: 'Insho',
      description:
        'Media & advertising marketplace connecting agencies and creators for campaign collaboration',
      highlights: [
        'Advanced dynamic form handling with schema-based architecture enabling complex multi-functional forms with validation, conditional logic, and real-time updates',
        'Established modern structure between backend and frontend for seamless form data flow, reducing integration time by 40%',
        'Responsive UI optimized for creator-brand matching with comprehensive listing and proposal management system',
      ],
      keywords: ['Vue.js', 'Nuxt.js', 'Dynamic Forms', 'Schema-based Architecture', 'Marketplace'],
      startDate: '2023-09',
      url: 'https://insho.app',
      roles: ['Frontend Developer'],
      type: 'application',
    },
    {
      name: 'BaMashin',
      description:
        'Mobility rental platform (cars, boats, helicopters) with comprehensive booking system and accessible UI',
      highlights: [
        'Multi-category rental system',
        'WCAG 2.1 compliant interface',
        'Payment integration',
      ],
      keywords: ['Vue.js', 'TypeScript', 'Responsive Design', 'Accessibility'],
      startDate: '2023-09',
      url: 'https://bamashin.net',
      roles: ['Frontend Developer'],
      type: 'application',
    },
    {
      name: 'Modern Portfolio Website',
      description:
        'Personal portfolio built with Nuxt 4 and Nuxt UI v4, showcasing projects, skills, and bilingual blog with ATS-optimized resume export',
      highlights: [
        'Built with Nuxt 4 + Nuxt UI 4 + Tailwind CSS 4',
        'Bilingual support (EN/FA) with RTL',
        'Server-side PDF generation with Puppeteer',
        'Lighthouse score 95+',
      ],
      keywords: ['Nuxt.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'i18n', 'PDF Generation'],
      startDate: '2025-12',
      url: 'https://mahdiarghyani.vercel.app',
      roles: ['Frontend Developer'],
      type: 'application',
    },
  ],
}
