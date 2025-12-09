import type { PortfolioData } from '@/types/portfolio.types'

export const portfolio: PortfolioData = {
  profile: {
    name: 'Mahdi Arghyani',
    title: 'Full-stack Developer',
    location: 'Tehran, Iran',
    summary:
      'Passionate Full-stack Developer specializing in modern web technologies. Building scalable, performant applications with focus on user experience and clean code architecture.',
    avatar: null, // TODO: Add avatar image
    socials: {
      github: 'https://github.com/mahdiarghyani',
      linkedin: 'https://linkedin.com/in/mahdi', // TODO: Update LinkedIn URL
      email: 'mahdi@example.com', // TODO: Update email
    },
  },

  mainTools: {
    title: 'Main tools',
    items: [
      { label: 'Vue.js', icon: 'i-logos-vue' },
      { label: 'Nuxt.js', icon: 'i-logos-nuxt-icon' },
      { label: 'TypeScript', icon: 'i-logos-typescript-icon' },
      { label: 'Tailwind CSS', icon: 'i-logos-tailwindcss-icon' },
      { label: 'Node.js', icon: 'i-logos-nodejs-icon' },
      { label: 'Git/GitHub', icon: 'i-mdi-github' },
    ],
  },

  roles: {
    title: 'Roles',
    items: [
      { label: 'Full-stack Developer', icon: 'i-twemoji-laptop' },
      { label: 'Frontend Engineering', icon: 'i-twemoji-artist-palette' },
      { label: 'Backend Development', icon: 'i-twemoji-gear' },
      { label: 'UI/UX Implementation', icon: 'i-twemoji-sparkles' },
    ],
  },

  values: {
    title: 'Values',
    items: [
      {
        label: 'Clean Code',
        icon: 'i-twemoji-sparkles',
        description: 'Write maintainable, readable code that others can understand.',
      },
      {
        label: 'Continuous Learning',
        icon: 'i-twemoji-books',
        description: 'Always learning new technologies and best practices.',
      },
      {
        label: 'Problem Solving',
        icon: 'i-twemoji-light-bulb',
        description: 'Analytical approach to complex technical challenges.',
      },
      {
        label: 'Team Collaboration',
        icon: 'i-twemoji-people-holding-hands',
        description: 'Effective communication and knowledge sharing.',
      },
    ],
  },

  experiences: [
    // TODO: Add work experiences
    {
      company: 'Example Company',
      location: 'Tehran, Iran',
      type: 'Full-time',
      positions: [
        {
          title: 'Full-stack Developer',
          start: 'Jan 2023',
          ongoing: true,
          description: [
            'Developing modern web applications with Vue.js and Nuxt.js',
            'Building RESTful APIs with Node.js and Express',
            'Implementing responsive UI with Tailwind CSS',
            'Collaborating with cross-functional teams',
          ],
          icons: ['i-logos-vue', 'i-logos-nuxt-icon', 'i-logos-nodejs-icon', 'i-logos-tailwindcss-icon'],
        },
      ],
    },
  ],

  education: [
    // TODO: Add education details
    {
      institution: 'University Name',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Tehran, Iran',
      start: '2018',
      end: '2022',
      gpa: '3.8/4.0',
      description: 'Focused on software engineering and web development.',
    },
  ],

  skills: {
    title: 'Technical Skills',
    categories: [
      {
        name: 'Frontend',
        skills: [
          { name: 'Vue.js', level: 'expert', icon: 'i-logos-vue' },
          { name: 'Nuxt.js', level: 'expert', icon: 'i-logos-nuxt-icon' },
          { name: 'TypeScript', level: 'proficient', icon: 'i-logos-typescript-icon' },
          { name: 'Tailwind CSS', level: 'expert', icon: 'i-logos-tailwindcss-icon' },
          { name: 'HTML/CSS', level: 'expert', icon: 'i-logos-html-5' },
        ],
      },
      {
        name: 'Backend',
        skills: [
          { name: 'Node.js', level: 'proficient', icon: 'i-logos-nodejs-icon' },
          { name: 'Express', level: 'proficient', icon: 'i-logos-express' },
          { name: 'REST APIs', level: 'proficient', icon: 'i-mdi-api' },
        ],
      },
      {
        name: 'Tools & Others',
        skills: [
          { name: 'Git', level: 'expert', icon: 'i-mdi-git' },
          { name: 'VS Code', level: 'expert', icon: 'i-logos-visual-studio-code' },
          { name: 'Figma', level: 'familiar', icon: 'i-logos-figma' },
        ],
      },
    ],
  },

  projects: [
    // TODO: Add projects
    {
      id: 'modern-portfolio',
      title: 'Modern Portfolio Website',
      description: 'A modern, bilingual portfolio built with Nuxt 4 and Nuxt UI 4',
      tags: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'i18n'],
      featured: true,
      status: 'in-progress',
      links: {
        github: 'https://github.com/mahdiarghyani/modern-nuxt-portfolio',
      },
    },
  ],
}
