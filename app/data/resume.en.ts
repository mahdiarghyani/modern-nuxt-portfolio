/**
 * Resume Data - Ali Arghyani
 * Based on RESUME-STANDARDS.md (docs/RESUME-STANDARDS.md)
 * Optimized for ATS and 2025 best practices
 * Version: 2.0 - 2-Page Resume (International Remote Positions)
 * 
 * ⚠️ BEFORE EDITING: Give docs/RESUME-UPDATE-RULES.md to any AI agent
 * 
 * Quick command for AI:
 * "Read docs/RESUME-UPDATE-RULES.md and update my resume"
 */

import type { Resume } from '~/types/resume'

export const resumeData: Resume = {
  basics: {
    name: 'Ali Arghyani',
    label: 'Frontend Developer | Vue.js • Nuxt.js • TypeScript',
    image: '/img/AliProfile.webp',
    email: 'aliarghyani@gmail.com',
    phone: '+98 912 322 0694',
    url: 'https://aliarghyani.vercel.app',
    location: {
      city: 'Tehran',
      country: 'Iran',
    },
    profiles: [
      {
        network: 'LinkedIn',
        url: 'https://linkedin.com/in/aliarghyani',
        icon: 'i-mdi-linkedin',
      },
      {
        network: 'GitHub',
        url: 'https://github.com/aliarghyani',
        icon: 'i-mdi-github',
      },
      {
        network: 'Portfolio',
        url: 'https://aliarghyani.vercel.app',
        icon: 'i-mdi-web',
      },
    ],
    summary:
      'Frontend Developer with **3+ years** building high-performance Vue.js/Nuxt applications for international clients. **AI-first engineer** leveraging AI-powered tools & methodologies to accelerate development by up to **2x** while maintaining code quality. Specialized in performance optimization, scalable architecture (SSR, PWA, RBAC), and accessibility. Delivered **8 production applications** with focus on maintainability and distributed team collaboration. Fluent in English (**8+ years** in fully English-speaking environment at Huawei).',
  },

  work: [
    {
      company: 'NexaPortal',
      position: 'Frontend Developer (Remote)',
      location: 'Izmir, Turkey',
      startDate: '2024-12',
      highlights: [
        'Developed **5 interconnected applications** for two medical tourism platforms (**Elara Medical** & **Artemis Clinics**): admin panels, patient dashboards, and website with **10+ language** support and PWA capabilities',
        'Built custom **PDF template editor** with drag-and-drop interface, dynamic variable injection, and multi-page support, enabling non-technical staff to create patient documents without developer intervention',
        'Engineered enterprise-grade **RBAC system** with deep permission patterns supporting field-level granularity and wildcard permissions across **40+ domain models**',
        'Developed **dynamic form builder** with **10+ field types** and drag-and-drop arrangement, reducing new form development time by **60%** through schema-based architecture',
        'Implemented real-time messaging via **Pusher WebSockets** supporting WhatsApp and in-app channels, plus custom **Canvas animations** with physics simulation for premium UX',
        'Optimized performance through code splitting, lazy loading, and Pinia state management; accelerated development by **2x** using AI-powered tools with **zero critical bugs**',
      ],
    },
    {
      company: 'Freelance',
      position: 'Frontend Developer (Remote)',
      location: 'Tehran, Iran',
      startDate: '2023-09',
      endDate: '2024-12',
      highlights: [
        'Delivered **3 production-grade** web applications for international clients using Vue.js/Nuxt.js, consistently achieving strong performance metrics and high client satisfaction',
        'Leveraged AI development tools to reduce development time by **40%** across all projects, enabling faster client delivery and **100% on-time** project completion rate',
        '**Ideh** - Idea evaluation platform with reusable component library reducing development time by **30%** and scalable Vue.js architecture',
        '**Insho** - Advertising marketplace with advanced dynamic form handling (schema-based architecture), modern backend-frontend structure reducing integration time by 40%, and responsive UI for creator-brand matching',
        '**BaMashin** - Mobility rental platform with payment integration and responsive UI optimized for mobile/desktop',
        'Led client communications, translated business requirements into technical specifications, delivered iteratively with clear documentation and transparent progress updates',
      ],
    },
    {
      company: 'Huawei Technologies',
      position: 'Senior Performance Team Lead',
      location: 'Tehran, Iran',
      startDate: '2022-04',
      endDate: '2023-08',
      highlights: [
        'Led team managing performance and availability for **14,500+ network sites** nationwide, ensuring **99.5%+ uptime** and rapid incident response across distributed infrastructure',
        'Automated Excel reporting workflows using **Python** and **Pandas**, reducing manual report generation time by **70%** and enabling real-time performance insights across **14,500+ sites**',
        'Established operational standards and best practices; mentored **10 team members** improving team efficiency by **30%** through process optimization and knowledge sharing',
        'Conducted comprehensive data analysis and KPI monitoring using advanced analytics; identified performance trends and improvement opportunities, reducing network downtime by **22%** year-over-year',
        'Owned stakeholder communication interface; delivered weekly performance reports and monthly strategic updates to **C-level executives**, translating technical metrics into business impact',
        'Built strong operational discipline (documentation, monitoring, incident management, quality gates) that directly enhances frontend engineering quality and architectural decision-making',
      ],
    },
    {
      company: 'Huawei Technologies',
      position: 'Technical & Leadership Roles',
      location: 'Tehran, Iran',
      startDate: '2016-06',
      endDate: '2022-04',
      highlights: [
        '**Senior Performance Analyst** (2018-2022): Drove network KPI analysis across 2G/3G/LTE; contributed to audits, process improvements and performance dashboards',
        '**Assistant Regional Manager** (2018): Managed **~3,000** BTS sites across Tehran Province; coordinated subcontractors and translated technical specs into implementation plans',
        '**TCHA Team Lead** (2017-2018): Built availability dashboards and drove stakeholder alignment; recognized as **outstanding fresh graduate** at Huawei annual meeting',
        '**Back Office Operations** (2016-2017): Supported OSS operations, performance checks and reporting; contributed to team efficiency and customer satisfaction',
      ],
    },
  ],

  education: [
    {
      institution: 'Qom University of Technology',
      area: 'Telecommunications Engineering',
      studyType: 'Bachelor of Science',
      startDate: '2010-09',
      endDate: '2015-06',
      courses: [
        'Software Architecture',
        'Systems Design',
        'Network Management',
        'Digital Signal Processing',
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
        'RBAC Systems',
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
        'WebSocket',
        'Agile/Scrum',
      ],
    },
    {
      name: 'Quality & Accessibility',
      keywords: [
        'WCAG 2.1 Compliance',
        'Lighthouse Optimization',
        'Cypress E2E Testing',
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
      fluency: 'Fluent',
    },
  ],

  certificates: [
    {
      name: 'Advanced English Proficiency',
      date: '2025',
      issuer: 'Duolingo English Test',
      url: '',
      summary: 'Score: 85/100 (Advanced Level)',
    },
  ],

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
      endDate: '2024-12',
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
      endDate: '2024-12',
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
      endDate: '2024-12',
      url: 'https://bamashin.net',
      roles: ['Frontend Developer'],
      type: 'application',
    },
  ],
}
