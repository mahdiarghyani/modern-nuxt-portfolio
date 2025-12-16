# mahdi-portfolio-nuxt Documentation

Welcome to the comprehensive documentation for Mahdi Arghyani's portfolio website.

## 📚 Documentation Overview

This documentation follows the **BMad Method** for structured project documentation, covering all aspects from requirements to implementation.

### Quick Links

- **[Project Overview](./project-overview.md)** - High-level project summary
- **[PRD](./prd.md)** - Product Requirements Document
- **[Architecture](./architecture.md)** - Technical architecture and decisions
- **[BMM Workflow Status](./bmm-workflow-status.yaml)** - Project workflow tracking

---

## 🎯 Project Summary

**mahdi-portfolio-nuxt** is a modern, bilingual portfolio website showcasing professional experience, technical skills, projects, and blog content with integrated ATS-optimized resume export.

**Live Site:** [mahdiarghyani.vercel.app](https://mahdiarghyani.vercel.app)

**Key Features:**
- 🌍 Bilingual support (English/Persian with RTL)
- 📄 ATS-friendly resume with PDF export
- 📝 Blog with MDC (Markdown Components)
- 🎨 Modern UI with Nuxt UI 4 + Tailwind CSS 4
- ⚡ High performance (Lighthouse 95+)
- 🌙 Dark/Light mode
- 📊 GitHub activity visualization

---

## 📖 Documentation Structure

### 1. Planning & Requirements

**[Product Requirements Document (PRD)](./prd.md)**
- Executive summary
- Success criteria
- Functional requirements
- User personas
- Risk assessment

### 2. Technical Design

**[Architecture Document](./architecture.md)**
- System architecture
- Technology stack
- Data schemas
- API contracts
- Performance optimization
- Security considerations
- Deployment strategy

### 3. Implementation Guides

**Development Guide** (Coming soon)
- Local setup
- Development workflow
- Code standards
- Testing procedures

**Component Inventory** (Coming soon)
- Component catalog
- Usage examples
- Props documentation

### 4. Deployment & Operations

**Deployment Guide** (Coming soon)
- Vercel deployment
- Environment configuration
- CI/CD pipeline
- Monitoring setup

### 5. Project Management

**[BMM Workflow Status](./bmm-workflow-status.yaml)**
- Workflow tracking
- Phase completion status
- Project milestones

**Epics & Stories** (Coming soon)
- Feature breakdown
- User stories
- Sprint planning

---

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.20.0
- pnpm 9.x

### Installation

```bash
# Clone repository
git clone [repo-url]
cd mahdi-portfolio-temp

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Visit: http://localhost:5000

### Available Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm typecheck        # Type checking

# Validation
pnpm check:i18n       # Check translations
pnpm check:data       # Validate data

# Build
pnpm build            # Build for production
pnpm generate         # Generate static site
pnpm preview          # Preview production build

# Code Quality
pnpm format           # Check formatting
pnpm format:write     # Fix formatting
```

---

## 🏗️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Nuxt | 4.1.3 |
| UI Library | Nuxt UI | 4.0.1 |
| Styling | Tailwind CSS | 4.1.14 |
| Language | TypeScript | 5.9.3 |
| Content | @nuxt/content | 3.8.0 |
| i18n | @nuxtjs/i18n | 10.1.1 |
| PDF | Puppeteer | 24.31.0 |
| Fonts | @nuxt/fonts | 0.11.4 |
| Images | @nuxt/image | 1.11.0 |

---

## 📁 Project Structure

```
mahdi-portfolio-temp/
├── app/                    # Source code (srcDir)
│   ├── components/        # Vue components
│   ├── composables/       # Reusable logic
│   ├── data/             # Static data
│   ├── layouts/          # Layouts
│   ├── pages/            # Routes
│   ├── types/            # TypeScript types
│   └── utils/            # Utilities
├── content/              # Blog content (MDC)
│   ├── en/blog/         # English posts
│   └── fa/blog/         # Persian posts
├── i18n/                # Translations
├── server/              # API routes
├── public/              # Static assets
└── docs/                # Documentation
```

---

## 🎨 Design System

### Typography

- **Primary Font:** Geist (body, UI)
- **Accent Font:** Space Grotesk (headings)
- **Alternative:** DM Sans (special sections)

### Color Scheme

- **Primary:** Blue (brand color)
- **Neutral:** Slate (gray scale)
- **Modes:** Dark (default) + Light

### Responsive Breakpoints

- **sm:** 640px (Mobile landscape)
- **md:** 768px (Tablet)
- **lg:** 1024px (Desktop)
- **xl:** 1280px (Large desktop)
- **2xl:** 1536px (Extra large)

---

## 🌍 Internationalization

### Supported Languages

- **English (en)** - Default at `/`
- **Persian (fa)** - At `/fa` with RTL support

### URL Structure

| Page | English | Persian |
|------|---------|---------|
| Home | `/` | `/fa` |
| Blog | `/blog` | `/fa/blog` |
| Blog Post | `/blog/[slug]` | `/fa/blog/[slug]` |
| Resume | `/resume` | `/fa/resume` |

---

## 📊 Performance Metrics

Current performance scores (Lighthouse):

- **Performance:** 95+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

**Core Web Vitals:**
- **LCP:** < 2.0s
- **FID:** < 100ms
- **CLS:** < 0.05

---

## 🔒 Security

- HTTPS only in production
- Content Security Policy headers
- XSS protection
- Secure environment variables
- Rate limiting on API endpoints

---

## 📝 Content Management

### Portfolio Data

Location: `app/data/`
- `portfolio.en.ts` - English portfolio data
- `portfolio.fa.ts` - Persian portfolio data
- `resume.en.ts` - Resume data
- `skills.ts` - Skills data
- `aiStack.ts` - AI tools data

### Blog Content

Location: `content/`
- Markdown files with frontmatter
- MDC (Markdown Components) support
- Syntax highlighting
- Bilingual support

---

## 🚢 Deployment

### Vercel Deployment

**Production:** [mahdiarghyani.vercel.app](https://mahdiarghyani.vercel.app)

**Deployment Process:**
1. Push to `main` branch
2. Vercel auto-deploys
3. Preview deployments for PRs
4. Edge network distribution

**Environment Variables:**
```env
NUXT_PUBLIC_SITE_URL=https://mahdiarghyani.vercel.app
NUXT_PUBLIC_GITHUB_TOKEN=  # Optional
NUXT_PUBLIC_LOAD_PLAUSIBLE=false  # Optional
```

---

## 🤝 Contributing

This is a personal portfolio project. For suggestions or issues:

1. Review existing documentation
2. Check [Architecture](./architecture.md) for technical details
3. Follow code standards and conventions
4. Test thoroughly before submitting

---

## 📞 Support & Contact

**Author:** Mahdi Arghyani

- **GitHub:** [@mahdiarghyani](https://github.com/mahdiarghyani)
- **LinkedIn:** [Mahdi Arghyani](https://linkedin.com/in/mahdi)
- **Portfolio:** [mahdiarghyani.vercel.app](https://mahdiarghyani.vercel.app)

---

## 📄 License

MIT License - see LICENSE file for details

---

## 🔄 Documentation Updates

**Last Updated:** 2025-12-15

**Version:** 1.0

**Status:** Active Development

---

_This documentation is maintained using the BMad Method for structured project documentation._
