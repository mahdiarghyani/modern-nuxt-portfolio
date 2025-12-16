import type { PortfolioData } from '@/types/portfolio.types'

export default {
  profile: {
    name: 'مهدی ارغیانی',
    title: 'توسعه‌دهنده فرانت‌اند',
    location: 'تهران، ایران',
    summary:
      'توسعه‌دهنده فرانت‌اند با تخصص در فناوری‌های مدرن وب. ساخت اپلیکیشن‌های مقیاس‌پذیر و سریع با تمرکز بر تجربه کاربری و معماری کد تمیز.',
    bio: 'من یک توسعه‌دهنده فرانت‌اند هستم و از ساخت راه‌حل‌های ساده و کارآمد برای مسائل پیچیده لذت می‌برم. مسیر من در توسعه وب با کنجکاوی و یادگیری مداوم شکل گرفته است. در اکوسیستم Vue.js و Nuxt.js تخصص دارم و اپلیکیشن‌هایی می‌سازم که تجربه کاربری، عملکرد و قابلیت نگهداری در آن‌ها اولویت دارند. به کدنویسی تمیز، مستندسازی مناسب و همگام بودن با روش‌های مدرن توسعه و گردش‌کارهای کمک‌شده با هوش مصنوعی باور دارم.',
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
      { label: 'توسعه‌دهنده فرانت‌اند', icon: 'i-twemoji-laptop' },
      { label: 'مهندسی فرانت‌اند', icon: 'i-twemoji-artist-palette' },
      { label: 'پیاده‌سازی UI/UX', icon: 'i-twemoji-sparkles' },
    ],
  },

  experiences: [
    {
      company: 'فریلنسر',
      location: 'تهران، ایران',
      type: 'دورکاری',
      positions: [
        {
          title: 'توسعه‌دهنده فرانت‌اند',
          start: 'سپتامبر ۲۰۲۳',
          ongoing: true,
          description: [
            'توسعه اپلیکیشن‌های مدرن وب با Vue.js و Nuxt.js',
            'پیاده‌سازی رابط کاربری ریسپانسیو با Tailwind CSS و Nuxt UI',
            'ساخت کتابخانه‌های کامپوننت مقیاس‌پذیر و سیستم‌های طراحی',
            'همکاری با مشتریان بین‌المللی',
          ],
          icons: ['i-logos-vue', 'i-logos-nuxt-icon', 'i-logos-typescript-icon', 'i-logos-tailwindcss-icon'],
        },
      ],
    },
  ],

  education: [
    {
      school: 'دانشگاه تهران',
      degree: 'کارشناسی مهندسی کامپیوتر',
      start: '۲۰۱۸',
      end: '۲۰۲۲',
      icons: ['i-material-symbols-school'],
      logo: '/img/ut-logo.png',
    },
  ],

  projects: [
    {
      name: 'vue-cursor-rules',
      description:
        'قوانین Cursor مبتنی بر قرارداد برای Vue 3 و TypeScript با تمرکز بر DX، دسترس‌پذیری، امنیت و خروجی‌های آماده تولید.',
      links: [
        {
          label: 'GitHub',
          to: 'https://github.com/aliarghyani/vue-cursor-rules',
          icon: 'i-mdi-github',
        },
      ],
      icons: ['i-logos-vue', 'i-logos-typescript-icon'],
      status: 'فعال',
      opensource: true,
    },
    {
      name: 'Ideh — Innovating Ideas Platform',
      description: 'پلتفرم پویا و مقیاس‌پذیر برای ارزیابی ایده‌ها و تحلیل بینش‌های بازار.',
      thumbnail: '/img/projects/ideh.png',
      status: 'فعال',
      opensource: false,
      links: [{ label: 'وب‌سایت', to: 'https://ideh.app/', icon: 'i-mdi-link' }],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue'],
    },
    {
      name: 'Insho Advertising Marketplace',
      description: 'مارکت‌پلیس رسانه که همکاری آژانس‌ها و کریتور‌ها را برای کمپین‌های تبلیغاتی تسهیل می‌کند.',
      thumbnail: '/img/projects/insho.png',
      status: 'فعال',
      opensource: false,
      links: [{ label: 'وب‌سایت', to: 'https://insho.app/', icon: 'i-mdi-link' }],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue', 'i-logos-tailwindcss-icon'],
    },
    {
      name: 'BaMashin Mobility Rentals',
      description: 'پلتفرم اجاره برای رزرو خودرو، قایق، هلیکوپتر، ون، دوچرخه و موارد دیگر در سراسر ایران.',
      thumbnail: '/img/projects/bamashin.png',
      status: 'فعال',
      opensource: false,
      links: [{ label: 'وب‌سایت', to: 'https://bamashin.net/', icon: 'i-mdi-link' }],
      icons: ['i-logos-nuxt-icon', 'i-logos-vue'],
    },
    {
      name: 'NuxtUi-Portfolio-Mahdi',
      description: 'پرتفولیوی من با Nuxt 4 و Nuxt UI v4؛ نمایش پروژه‌ها، مهارت‌ها و تجربیات.',
      status: 'فعال',
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
} satisfies PortfolioData
