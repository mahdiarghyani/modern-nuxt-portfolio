/**
 * رزومه - مهدی ارغیانی
 * نسخه فارسی
 * بهینه‌شده برای بازار کار ایران
 * نسخه: 1.0 - رزومه ۲ صفحه‌ای
 */

import type { Resume } from '~/types/resume'

export const resumeData: Resume = {
  basics: {
    name: 'مهدی ارغیانی',
    label: 'توسعه‌دهنده فرانت‌اند (Vue.js / Nuxt.js)',
    image: '/img/profile.jpg',
    email: 'mahdiarghyani12@gmail.com',
    phone: '0915 430 9058',
    url: 'https://mahdiarghyani.vercel.app',
    location: {
      city: 'تهران',
      country: 'ایران',
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
      'توسعه‌دهنده فرانت‌اند با بیش از **۲ سال** تجربه در طراحی و پیاده‌سازی اپلیکیشن‌های وب با عملکرد بالا (High-Performance) برای مشتریان واقعی. پیشگام در توسعه نرم‌افزار با رویکرد هوش مصنوعی (AI-Augmented Development) و استفاده از ابزارهای مدرن جهت افزایش سرعت توسعه تا **۲ برابر** و ارتقای کیفیت کد. متخصص در بهینه‌سازی پرفورمنس، معماری مقیاس‌پذیر (SSR, SSG) و تجربه کاربری. دارای سابقه موفق در تحویل **۳ پروژه تجاری** (Production-Grade) با تمرکز بر کدنویسی تمیز و قابلیت نگهداری بالا.',
  },

  work: [
    {
      company: 'فریلنسر',
      position: 'توسعه‌دهنده فرانت‌اند (ریموت)',
      location: 'تهران، ایران',
      startDate: '۱۴۰۲-۰۶',
      highlights: [
        'پیاده‌سازی و استقرار **۳ پلتفرم تحت وب** تجاری با Vue.js و Nuxt.js (Ideh، Insho، BaMashin) از MVP تا انتشار برای مشتریان واقعی',
        'کاهش **حداقل ۵۰ درصدی** زمان توسعه در تمامی پروژه‌ها با بهره‌گیری مؤثر از ابزارهای هوش مصنوعی و مهندسی پرامپت، منجر به تحویل سریع‌تر و تکمیل **۱۰۰٪** پروژه‌ها در زمان مقرر',
        '**پروژه Ideh** (پلتفرم اعتبارسنجی ایده): طراحی معماری مقیاس‌پذیر و ایجاد کتابخانه کامپوننت‌های با قابلیت استفاده مجدد (Reusable Component Library) که منجر به کاهش **۳۰ درصدی** زمان توسعه گردید',
        '**پروژه Insho** (مارکت‌پلیس تبلیغاتی): توسعه سیستم مدیریت فرم‌های داینامیک پیشرفته (معماری Schema-based) و بهینه‌سازی ساختار فرانت‌اند-بک‌اند با کاهش حدود **۴۰ درصدی** زمان یکپارچه‌سازی (Integration)',
        '**پروژه BaMashin** (پلتفرم اجاره خودرو): طراحی و پیاده‌سازی رابط کاربری واکنش‌گرا (Responsive) و بهینه‌سازی شده برای موبایل و دسکتاپ به همراه پیاده‌سازی درگاه پرداخت',
        'مدیریت تعاملات فنی با کارفرما، تبدیل نیازمندی‌های کسب‌وکار به مستندات فنی دقیق (Technical Specs) و ارائه گزارش‌های پیشرفت شفاف',
      ],
    },
  ],

  education: [
    {
      institution: 'دانشگاه تهران',
      area: 'مهندسی کامپیوتر',
      studyType: 'کارشناسی',
      startDate: '۱۳۹۷-۰۶',
      endDate: '۱۴۰۱-۰۳',
      courses: [
        'معماری نرم‌افزار',
        'ساختمان داده و الگوریتم',
        'توسعه وب',
        'سیستم‌های پایگاه داده',
      ],
    },
  ],

  skills: [
    {
      name: 'تکنولوژی‌های اصلی',
      keywords: [
        'Vue.js',
        'Nuxt.js',
        'TypeScript',
        'JavaScript (ES6+)',
        'HTML5',
        'CSS3',
        'Pinia',
        'Tailwind CSS',
      ],
    },
    {
      name: 'ابزارهای هوش مصنوعی',
      keywords: [
        'Cursor AI',
        'GitHub Copilot',
        'ChatGPT/Claude',
        'Prompt Engineering',
        'AI Code Review',
      ],
    },
    {
      name: 'معماری و پرفورمنس',
      keywords: [
        'SSR',
        'SSG',
        'PWA',
        'Lazy Loading',
        'Web Performance Optimization',
      ],
    },
    {
      name: 'ابزارها و ورک‌فلو',
      keywords: [
        'Git',
        'GitHub Actions (CI/CD)',
        'Vite',
        'REST APIs',
        'ESLint',
      ],
    },
  ],

  languages: [
    {
      language: 'فارسی',
      fluency: 'Native',
    },
    {
      language: 'انگلیسی',
      fluency: 'Upper-Intermediate',
    },
  ],

  certificates: [],

  projects: [
    {
      name: 'Ideh',
      description:
        'پلتفرم ارزیابی ایده و بینش‌های بازار با معماری مقیاس‌پذیر و کتابخانه کامپوننت قابل استفاده مجدد',
      highlights: [
        'کتابخانه کامپوننت زمان توسعه را ۳۰٪ کاهش داد',
        'معماری مقیاس‌پذیر Vue.js',
        'سیستم تولید فرم پویا',
      ],
      keywords: ['Vue.js', 'Nuxt.js', 'کتابخانه کامپوننت'],
      startDate: '۱۴۰۲-۰۶',
      url: 'https://ideh.app',
      roles: ['توسعه‌دهنده فرانت‌اند'],
      type: 'application',
    },
    {
      name: 'Insho',
      description:
        'مارکت‌پلیس رسانه و تبلیغات که آژانس‌ها و کریتورها را برای همکاری در کمپین متصل می‌کند',
      highlights: [
        'مدیریت فرم پویای پیشرفته با معماری مبتنی بر schema که فرم‌های چندکاره پیچیده با اعتبارسنجی، منطق شرطی و به‌روزرسانی‌های لحظه‌ای را امکان‌پذیر می‌کند',
        'ایجاد ساختار مدرن بین بک‌اند و فرانت‌اند برای جریان یکپارچه داده فرم، کاهش زمان یکپارچه‌سازی به میزان ۴۰٪',
        'رابط کاربری ریسپانسیو بهینه‌شده برای تطبیق کریتور-برند با سیستم جامع لیست و مدیریت پیشنهاد',
      ],
      keywords: ['Vue.js', 'Nuxt.js', 'فرم‌های پویا', 'معماری Schema-based', 'مارکت‌پلیس'],
      startDate: '۱۴۰۲-۰۶',
      url: 'https://insho.app',
      roles: ['توسعه‌دهنده فرانت‌اند'],
      type: 'application',
    },
    {
      name: 'BaMashin',
      description:
        'پلتفرم اجاره وسایل نقلیه (خودرو، قایق، هلیکوپتر) با سیستم رزرو جامع و رابط کاربری قابل دسترس',
      highlights: [
        'سیستم اجاره چند دسته‌ای',
        'رابط منطبق با WCAG 2.1',
        'یکپارچه‌سازی پرداخت',
      ],
      keywords: ['Vue.js', 'TypeScript', 'طراحی ریسپانسیو', 'دسترس‌پذیری'],
      startDate: '۱۴۰۲-۰۶',
      url: 'https://bamashin.net',
      roles: ['توسعه‌دهنده فرانت‌اند'],
      type: 'application',
    },
    {
      name: 'وب‌سایت پرتفولیوی مدرن',
      description:
        'پرتفولیوی شخصی ساخته‌شده با Nuxt 4 و Nuxt UI v4، نمایش پروژه‌ها، مهارت‌ها و وبلاگ دوزبانه با خروجی رزومه بهینه‌شده برای ATS',
      highlights: [
        'ساخته‌شده با Nuxt 4 + Nuxt UI 4 + Tailwind CSS 4',
        'پشتیبانی دوزبانه (EN/FA) با RTL',
        'تولید PDF سمت سرور با Puppeteer',
        'راه‌اندازی بهینه برای عملکرد و سئو',
      ],
      keywords: ['Nuxt.js', 'Vue.js', 'TypeScript', 'Tailwind CSS', 'i18n', 'تولید PDF'],
      startDate: '۱۴۰۳-۰۹',
      url: 'https://mahdiarghyani.vercel.app',
      roles: ['توسعه‌دهنده فرانت‌اند'],
      type: 'application',
    },
  ],
}
