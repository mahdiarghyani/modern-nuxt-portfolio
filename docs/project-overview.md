# Project Overview

## mahdi-portfolio-nuxt

A modern, bilingual portfolio website built with Nuxt 4, featuring English and Persian (RTL) support with dark mode as default.

🔗 **Live Demo:** [mahdiarghyani.vercel.app](https://mahdiarghyani.vercel.app)

## Purpose

Personal portfolio website showcasing:
- Professional experience and skills
- Project portfolio with detailed case studies
- Blog with bilingual content (English/Persian)
- AI/Tech stack expertise and AI-assisted development approach
- GitHub activity and contributions
- Recommendations and testimonials
- Professional resume with PDF export

## Tech Stack Summary

| Layer | Technology |
|-------|------------|
| Framework | Nuxt 4.1.3 (Vue 3 + Vite) |
| UI | Nuxt UI 4.0.1 |
| Styling | Tailwind CSS 4.1.14 |
| Language | TypeScript 5.9.3 |
| i18n | @nuxtjs/i18n 10.1.1 |
| Content | @nuxt/content 3.8.0 (MDC) |
| Fonts | Geist, Space Grotesk, DM Sans |

## Architecture Type

**Component-based SPA with Static Site Generation (SSG)**

- Monolith structure
- File-based routing
- Pre-rendered at build time
- Bilingual support (EN/FA with RTL)
- Server-side PDF generation for resume

## Repository Structure

```
mahdi-portfolio-temp/           # Monolith
├── app/                        # Source code (srcDir)
│   ├── components/            # Vue components
│   ├── composables/           # Reusable logic
│   ├── data/                  # Static data files
│   ├── layouts/               # Layout components
│   ├── pages/                 # Page routes
│   ├── types/                 # TypeScript definitions
│   └── utils/                 # Helper functions
├── content/                   # Blog content (MDC)
│   ├── en/blog/              # English blog posts
│   └── fa/blog/              # Persian blog posts
├── i18n/                     # Translations
│   └── locales/
│       ├── en.json           # English translations
│       └── fa.json           # Persian translations
├── server/                   # API routes
│   └── api/                  # Server endpoints
├── public/                   # Static assets
└── docs/                     # Project documentation
```

## Key Features

### Core Features
- ✅ Nuxt 4 with `app/` directory structure
- ✅ Nuxt UI 4 with custom theming
- ✅ Tailwind CSS 4 with custom utilities
- ✅ Full TypeScript support
- ✅ English & Persian with automatic RTL
- ✅ Dark mode default with light option
- ✅ Responsive images with @nuxt/image
- ✅ View Transitions API for smooth navigation

### Portfolio Features
- ✅ Hero section with profile information
- ✅ Skills showcase (technical & soft skills)
- ✅ AI Stack display (AI tools & methodologies)
- ✅ GitHub Activity visualization
- ✅ Work Experience timeline
- ✅ Projects showcase with filtering
- ✅ Recommendations section

### Content Features
- ✅ Blog with MDC (Markdown Components)
- ✅ Bilingual blog posts (EN/FA)
- ✅ RSS feeds for both languages
- ✅ Sitemap generation
- ✅ SEO optimization

### Resume Features
- ✅ Dedicated resume page (`/resume`)
- ✅ ATS-friendly PDF export
- ✅ Server-side PDF generation with Puppeteer
- ✅ WYSIWYG preview (what you see = what you download)
- ✅ Professional two-column layout
- ✅ Optimized for international job applications

## Documentation Index

- [Architecture](./architecture.md) - System design and technical decisions
- [PRD](./prd.md) - Product Requirements Document
- [Epics](./epics.md) - Feature breakdown and user stories
- [Component Inventory](./component-inventory.md) - UI components catalog
- [Development Guide](./development-guide.md) - Setup and workflow
- [Deployment Guide](./deployment-guide.md) - Hosting and CI/CD
- [Source Tree Analysis](./source-tree-analysis.md) - Directory structure details
- [BMM Workflow Status](./bmm-workflow-status.yaml) - BMad workflow tracking

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit: http://localhost:5000

## Development Commands

```bash
# Type checking
pnpm typecheck

# Check i18n translations
pnpm check:i18n

# Check portfolio data integrity
pnpm check:data

# Format code
pnpm format

# Build for production
pnpm build

# Generate static site
pnpm generate

# Preview production build
pnpm preview
```

## Environment Variables

```env
# Site URL
NUXT_PUBLIC_SITE_URL=https://mahdiarghyani.vercel.app

# GitHub Token (optional - for contributions API)
NUXT_PUBLIC_GITHUB_TOKEN=

# Analytics (optional)
NUXT_PUBLIC_LOAD_PLAUSIBLE=false
```

## Project Status

**Current Phase:** Production-ready with ongoing enhancements

**Completed:**
- ✅ Core portfolio features
- ✅ Resume with PDF export
- ✅ Blog with bilingual support
- ✅ GitHub activity integration
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Performance optimization (Lighthouse 95+)

**In Progress:**
- 🔄 Resume content personalization
- 🔄 Blog content expansion
- 🔄 Additional project case studies

## Performance Metrics

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s
- **Cumulative Layout Shift:** < 0.1

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari 15+
- iOS Safari 15+

## License

MIT License - see LICENSE file for details

## Author

**Mahdi Arghyani**
- GitHub: [@mahdiarghyani](https://github.com/mahdiarghyani)
- LinkedIn: [Mahdi Arghyani](https://linkedin.com/in/mahdi)
- Portfolio: [mahdiarghyani.vercel.app](https://mahdiarghyani.vercel.app)

---

Built with ❤️ using Nuxt 4 and AI-assisted development methodologies
