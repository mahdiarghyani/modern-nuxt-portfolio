import type { PortfolioData } from '@/types/portfolio.types'

// Persian version of portfolio data
export default {
  profile: {
    name: 'مهدی ارغیانی',
    title: 'توسعه‌دهنده فول‌استک',
    location: 'تهران، ایران',
    summary:
      'توسعه‌دهنده فول‌استک با تمرکز بر تکنولوژی‌های مدرن وب. ساخت اپلیکیشن‌های مقیاس‌پذیر و با کارایی بالا با تمرکز بر تجربه کاربری و معماری کد تمیز.',
    avatar: null,
    socials: {
      github: 'https://github.com/mahdiarghyani',
      linkedin: 'https://linkedin.com/in/mahdi',
      email: 'mahdi@example.com',
    },
  },

  mainTools: {
    title: 'ابزارهای اصلی',
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
    title: 'نقش‌ها',
    items: [
      { label: 'توسعه‌دهنده فول‌استک', icon: 'i-twemoji-laptop' },
      { label: 'مهندسی فرانت‌اند', icon: 'i-twemoji-artist-palette' },
      { label: 'توسعه بک‌اند', icon: 'i-twemoji-gear' },
      { label: 'پیاده‌سازی UI/UX', icon: 'i-twemoji-sparkles' },
    ],
  },

  values: {
    title: 'ارزش‌ها',
    items: [
      {
        label: 'کد تمیز',
        icon: 'i-twemoji-sparkles',
        description: 'نوشتن کد قابل نگهداری و خوانا که دیگران بتوانند درک کنند.',
      },
      {
        label: 'یادگیری مستمر',
        icon: 'i-twemoji-books',
        description: 'همیشه در حال یادگیری تکنولوژی‌ها و بهترین شیوه‌های جدید.',
      },
      {
        label: 'حل مسئله',
        icon: 'i-twemoji-light-bulb',
        description: 'رویکرد تحلیلی به چالش‌های فنی پیچیده.',
      },
      {
        label: 'همکاری تیمی',
        icon: 'i-twemoji-people-holding-hands',
        description: 'ارتباط موثر و به اشتراک‌گذاری دانش.',
      },
    ],
  },

  experiences: [
    {
      company: 'شرکت نمونه',
      location: 'تهران، ایران',
      type: 'تمام‌وقت',
      positions: [
        {
          title: 'توسعه‌دهنده فول‌استک',
          start: 'فروردین ۱۴۰۲',
          ongoing: true,
          description: [
            'توسعه اپلیکیشن‌های وب مدرن با Vue.js و Nuxt.js',
            'ساخت API های RESTful با Node.js و Express',
            'پیاده‌سازی رابط کاربری ریسپانسیو با Tailwind CSS',
            'همکاری با تیم‌های چندوظیفه‌ای',
          ],
          icons: ['i-logos-vue', 'i-logos-nuxt-icon', 'i-logos-nodejs-icon', 'i-logos-tailwindcss-icon'],
        },
      ],
    },
  ],

  education: [
    {
      institution: 'نام دانشگاه',
      degree: 'کارشناسی',
      field: 'علوم کامپیوتر',
      location: 'تهران، ایران',
      start: '۱۳۹۷',
      end: '۱۴۰۱',
      gpa: '۳.۸/۴.۰',
      description: 'تمرکز بر مهندسی نرم‌افزار و توسعه وب.',
    },
  ],

  skills: {
    title: 'مهارت‌های فنی',
    categories: [
      {
        name: 'فرانت‌اند',
        skills: [
          { name: 'Vue.js', level: 'expert', icon: 'i-logos-vue' },
          { name: 'Nuxt.js', level: 'expert', icon: 'i-logos-nuxt-icon' },
          { name: 'TypeScript', level: 'proficient', icon: 'i-logos-typescript-icon' },
          { name: 'Tailwind CSS', level: 'expert', icon: 'i-logos-tailwindcss-icon' },
          { name: 'HTML/CSS', level: 'expert', icon: 'i-logos-html-5' },
        ],
      },
      {
        name: 'بک‌اند',
        skills: [
          { name: 'Node.js', level: 'proficient', icon: 'i-logos-nodejs-icon' },
          { name: 'Express', level: 'proficient', icon: 'i-logos-express' },
          { name: 'REST APIs', level: 'proficient', icon: 'i-mdi-api' },
        ],
      },
      {
        name: 'ابزارها و سایر',
        skills: [
          { name: 'Git', level: 'expert', icon: 'i-mdi-git' },
          { name: 'VS Code', level: 'expert', icon: 'i-logos-visual-studio-code' },
          { name: 'Figma', level: 'familiar', icon: 'i-logos-figma' },
        ],
      },
    ],
  },

  projects: [
    {
      id: 'modern-portfolio',
      title: 'وب‌سایت پورتفولیو مدرن',
      description: 'یک پورتفولیوی مدرن و دوزبانه ساخته شده با Nuxt 4 و Nuxt UI 4',
      tags: ['Nuxt 4', 'Vue 3', 'TypeScript', 'Tailwind CSS', 'i18n'],
      featured: true,
      status: 'in-progress',
      links: {
        github: 'https://github.com/mahdiarghyani/modern-nuxt-portfolio',
      },
    },
  ],
} satisfies PortfolioData
