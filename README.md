# Mahdi Portfolio - Modern Nuxt Portfolio

A modern, bilingual (English/Persian) portfolio website built with Nuxt 4, Nuxt UI 4, and Tailwind CSS 4.

## 🚀 Features

- ✨ Built with **Nuxt 4** (latest)
- 🎨 **Nuxt UI 4** components with Tailwind CSS 4
- 🌍 **Bilingual** support (English/Persian) with RTL
- 🌙 **Dark mode** with system preference detection
- 📝 **Blog** with MDC (Markdown Components)
- 📄 **Resume** with PDF export
- ⚡ **Performance optimized** (Lighthouse 95+)
- 🔍 **SEO friendly** with sitemap and meta tags
- 📱 **Fully responsive** design

## 🛠️ Tech Stack

- **Framework**: Nuxt 4.2.1
- **UI Library**: Nuxt UI 4.0.1
- **Styling**: Tailwind CSS 4.1.14
- **Content**: Nuxt Content 3.8.0
- **i18n**: @nuxtjs/i18n 10.1.1
- **TypeScript**: 5.9.3
- **Package Manager**: pnpm

## 📦 Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview

# Generate static site
pnpm generate
```

## 🏗️ Project Structure

```
mahdi-portfolio-temp/
├── app/
│   ├── assets/css/          # Global styles
│   ├── components/          # Vue components
│   │   ├── blog/           # Blog components
│   │   ├── common/         # Shared components
│   │   ├── content/        # Content components
│   │   ├── portfolio/      # Portfolio components
│   │   └── resume/         # Resume components
│   ├── composables/        # Vue composables
│   ├── data/              # Static data files
│   ├── layouts/           # Layout components
│   ├── pages/             # Page components
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
├── content/               # Blog content (MDC)
│   ├── en/blog/          # English blog posts
│   └── fa/blog/          # Persian blog posts
├── i18n/                 # i18n translations
│   └── locales/
│       ├── en.json       # English translations
│       └── fa.json       # Persian translations
├── public/               # Static assets
└── server/               # Server routes & API
```

## 🌐 Environment Variables

Create a `.env` file in the root directory:

```env
# Site URL
NUXT_PUBLIC_SITE_URL=https://mahdiarghyani.vercel.app

# Analytics (optional)
NUXT_PUBLIC_LOAD_PLAUSIBLE=false
```

## 📝 Development

The project uses:
- **srcDir**: `app/` - All source code is in the app directory
- **Port**: 5000 - Development server runs on http://localhost:5000
- **i18n**: English (default) at `/`, Persian at `/fa`

## 🚢 Deployment

The project is configured for deployment on Vercel:

```bash
# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

## 📄 License

MIT License - see LICENSE file for details

## 👤 Author

**Mahdi Arghyani**
- GitHub: [@mahdiarghyani](https://github.com/mahdiarghyani)
- LinkedIn: [Mahdi Arghyani](https://linkedin.com/in/mahdi)

---

Built with ❤️ using Nuxt 4
