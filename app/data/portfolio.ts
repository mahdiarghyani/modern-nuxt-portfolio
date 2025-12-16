import type { PortfolioData } from '@/types/portfolio.types'

export const portfolio: PortfolioData = {
  profile: {
    name: 'Mahdi Arghyani',
    title: 'Frontend Developer',
    location: 'Tehran, Iran',
    summary:
      'Frontend Developer specializing in modern web technologies. Building scalable, performant applications with focus on user experience and clean code architecture.',
    bio: "I'm a frontend developer with a passion for creating elegant, efficient solutions to complex problems. My journey in web development has been driven by curiosity and a commitment to continuous learning. I specialize in Vue.js and Nuxt.js ecosystems, building applications that prioritize user experience, performance, and maintainability. I believe in writing clean, well-documented code and staying current with modern development practices and AI-assisted development workflows.",
    avatar: '/img/profile.jpg',
    socials: {
      github: 'https://github.com/mahdiarghyani',
      linkedin: 'https://linkedin.com/in/mahdi',
      email: 'mahdi@example.com',
      telegram: 'https://t.me/mahdiarghyani',
      instagram: 'https://www.instagram.com/mahdi.arghyani/',
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
      { label: 'Frontend Developer', icon: 'i-twemoji-laptop' },
      { label: 'Frontend Engineering', icon: 'i-twemoji-artist-palette' },
      { label: 'UI/UX Implementation', icon: 'i-twemoji-sparkles' },
    ],
  },

  experiences: [
    {
      company: 'Freelance',
      location: 'Tehran, Iran',
      type: 'Remote',
      positions: [
        {
          title: 'Frontend Developer',
          start: 'Sep 2023',
          ongoing: true,
          description: [
            'Developing modern web applications with Vue.js and Nuxt.js',
            'Implementing responsive UI with Tailwind CSS and Nuxt UI',
            'Building scalable component libraries and design systems',
            'Collaborating with international clients',
          ],
          icons: ['i-logos-vue', 'i-logos-nuxt-icon', 'i-logos-typescript-icon', 'i-logos-tailwindcss-icon'],
        },
      ],
    },
  ],

  education: [
    {
      school: 'University of Tehran',
      degree: 'Bachelor of Engineering in Computer Engineering',
      start: '2018',
      end: '2022',
      icons: ['i-material-symbols-school'],
      logo: '/img/ut-logo.png',
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
