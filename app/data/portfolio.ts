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
    {
      school: 'University Name',
      degree: 'Bachelor of Science in Computer Science',
      start: '2018',
      end: '2022',
      icons: ['i-material-symbols-school'],
      logo: null,
    },
  ],



  projects: [
    {
      name: 'vue-cursor-rules',
      description:
        'Contract-driven Cursor rules for Vue 3 + TypeScript with a focus on DX, a11y, security and production-ready outputs.',
      links: [
        {
          label: 'GitHub',
          to: 'https://github.com/aliarghyani/vue-cursor-rules',
          icon: 'i-mdi-github',
        },
      ],
      icons: ['i-logos-vue', 'i-logos-typescript-icon'],
      status: 'Active',
      opensource: true,
    },
    {
      name: 'Ideh — Innovating Ideas Platform',
      description: 'Dynamic, scalable platform for idea evaluation and market insights.',
      thumbnail: '/img/projects/ideh.png',
      status: 'Active',
      opensource: false,
      links: [{ label: 'Website', to: 'https://ideh.app/', icon: 'i-mdi-link' }],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue'],
    },
    {
      name: 'Insho Advertising Marketplace',
      description:
        'Media marketplace that helps agencies and creators collaborate on high-impact advertising campaigns.',
      thumbnail: '/img/projects/insho.png',
      status: 'Active',
      opensource: false,
      links: [{ label: 'Website', to: 'https://insho.app/', icon: 'i-mdi-link' }],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue', 'i-logos-tailwindcss-icon'],
    },
    {
      name: 'BaMashin Mobility Rentals',
      description:
        'Rental platform for booking cars, boats, helicopters, vans, bikes, and more across Iran.',
      thumbnail: '/img/projects/bamashin.png',
      status: 'Active',
      opensource: false,
      links: [{ label: 'Website', to: 'https://bamashin.net/', icon: 'i-mdi-link' }],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue'],
    },
    {
      name: 'NuxtUi-Portfolio-Mahdi',
      description: 'My portfolio built with Nuxt 4 and Nuxt UI v4, showcasing projects, skills, and experiences.',
      status: 'Active',
      opensource: true,
      links: [
        {
          label: 'GitHub',
          to: 'https://github.com/mahdiarghyani/modern-nuxt-portfolio',
          icon: 'i-mdi-github',
        },
      ],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue', 'i-logos-typescript-icon', 'i-logos-tailwindcss-icon'],
    },
  ],
}
