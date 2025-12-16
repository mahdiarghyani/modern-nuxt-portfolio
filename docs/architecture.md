# Portfolio & Resume Platform - Architecture Document

## Executive Summary

This architecture defines the **Modern Bilingual Portfolio Website** for Mahdi Arghyani - a Nuxt 4 application combining portfolio showcase, blog platform, and ATS-optimized resume export with server-side PDF generation. The system emphasizes performance, accessibility, and seamless bilingual support (English/Persian with RTL).

---

## Decision Summary

| Category | Decision | Version | Rationale |
|----------|----------|---------|-----------|
| Framework | Nuxt 4 | 4.1.3 | Modern Vue.js with best DX, SSR/SSG support |
| UI Library | Nuxt UI | 4.0.1 | Consistent components, Tailwind integration |
| Styling | Tailwind CSS | 4.1.14 | Utility-first, performance, customization |
| Language | TypeScript | 5.9.3 | Type safety, better DX, maintainability |
| i18n | @nuxtjs/i18n | 10.1.1 | Official Nuxt i18n, RTL support |
| Content | @nuxt/content | 3.8.0 | MDC support, file-based CMS |
| PDF Engine | Puppeteer | 24.31.0 | Best quality, font embedding, full control |
| Fonts (Primary) | Geist | via @nuxt/fonts | Modern, excellent readability |
| Fonts (Accent) | Space Grotesk | via @nuxt/fonts | Distinctive headings |
| Fonts (Alt) | DM Sans | via @nuxt/fonts | Versatile alternative |
| Image Optimization | @nuxt/image | 1.11.0 | Automatic optimization, WebP support |
| Deployment | Vercel | - | Zero-config, edge network, preview deploys |

---

## Project Structure

```
mahdi-portfolio-temp/
├── app/                           # Source directory (srcDir)
│   ├── assets/
│   │   └── css/
│   │       └── main.css          # Global styles, Tailwind imports
│   ├── components/
│   │   ├── blog/                 # Blog-specific components
│   │   │   ├── BlogCard.vue
│   │   │   ├── BlogList.vue
│   │   │   └── BlogPost.vue
│   │   ├── common/               # Shared components
│   │   │   ├── Footer.vue
│   │   │   ├── Header.vue
│   │   │   └── TopNav.vue
│   │   ├── content/              # MDC content components
│   │   ├── portfolio/            # Portfolio sections
│   │   │   ├── Hero.vue
│   │   │   ├── Skills.vue
│   │   │   ├── AIStack.vue
│   │   │   ├── WorkExperience.vue
│   │   │   ├── ProjectsList.vue
│   │   │   └── GitHubActivity.vue
│   │   ├── resume/               # Resume components
│   │   │   ├── ResumePreview.vue
│   │   │   ├── ResumeHeader.vue
│   │   │   ├── ResumeContact.vue
│   │   │   ├── ResumeSidebar.vue
│   │   │   ├── ResumeExperience.vue
│   │   │   ├── ResumeSummary.vue
│   │   │   └── ResumeDownloadButton.vue
│   │   ├── LanguageSwitcher.vue
│   │   └── ThemeSelector.vue
│   ├── composables/              # Reusable logic
│   │   ├── useBlog.ts
│   │   ├── useGitHubContributions.ts
│   │   ├── useLocaleSwitching.ts
│   │   ├── usePortfolio.ts
│   │   ├── useResumeData.ts
│   │   ├── useResumePdf.ts
│   │   └── useViewTransition.ts
│   ├── data/                     # Static data files
│   │   ├── aiStack.ts
│   │   ├── portfolio.en.ts
│   │   ├── portfolio.fa.ts
│   │   ├── portfolio.ts
│   │   ├── recommendations.ts
│   │   ├── resume.en.ts
│   │   ├── sections.ts
│   │   └── skills.ts
│   ├── layouts/
│   │   ├── default.vue           # Main layout with nav
│   │   └── marketing.vue         # Alternative layout
│   ├── middleware/
│   │   └── demo.ts               # Route middleware
│   ├── pages/
│   │   ├── blog/
│   │   │   ├── index.vue         # Blog listing
│   │   │   └── [slug].vue        # Blog post detail
│   │   ├── index.vue             # Home/Portfolio page
│   │   └── resume.vue            # Resume page (layout: false)
│   ├── plugins/
│   │   ├── remove-banners.client.ts
│   │   └── vueschool.client.ts
│   ├── types/                    # TypeScript definitions
│   │   ├── blog.ts
│   │   ├── components.types.ts
│   │   ├── github.ts
│   │   ├── global.d.ts
│   │   ├── index.ts
│   │   ├── portfolio.types.ts
│   │   ├── recommendation.types.ts
│   │   └── resume.ts
│   ├── utils/                    # Helper functions
│   │   ├── any_all.ts
│   │   ├── chipTones.ts
│   │   ├── findBy.ts
│   │   ├── getDisplayableNumber.ts
│   │   └── isSubset.ts
│   ├── app.config.ts             # App configuration
│   ├── app.vue                   # Root component
│   └── error.vue                 # Error page
├── content/                      # Blog content (MDC)
│   ├── en/
│   │   └── blog/                 # English blog posts
│   └── fa/
│       └── blog/                 # Persian blog posts
├── i18n/                         # Internationalization
│   ├── locales/
│   │   ├── en.json               # English translations
│   │   └── fa.json               # Persian translations
│   └── i18n.config.ts            # i18n configuration
├── public/                       # Static assets
│   ├── favicon/
│   ├── img/
│   └── robots.txt
├── server/                       # Server routes
│   └── api/
│       └── resume/
│           └── pdf.get.ts        # PDF generation endpoint
├── docs/                         # Project documentation
├── scripts/                      # Utility scripts
│   ├── check-i18n.mjs
│   └── check-portfolio-data.mjs
├── .bmad/                        # BMad configuration
├── nuxt.config.ts                # Nuxt configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies

```

---

## Architecture Patterns

### 1. Component Architecture

**Pattern:** Atomic Design + Feature-based Organization

**Structure:**
- **Atoms:** Basic UI elements (buttons, inputs) - from Nuxt UI
- **Molecules:** Simple component combinations (cards, list items)
- **Organisms:** Complex sections (Hero, Skills, WorkExperience)
- **Templates:** Page layouts (default, marketing)
- **Pages:** Route-level components

**Benefits:**
- Clear component hierarchy
- Easy to locate components
- Reusable across features
- Maintainable and scalable

### 2. Data Management

**Pattern:** File-based Static Data + Composables

**Data Flow:**
```
TypeScript Data Files (app/data/)
         ↓
Composables (app/composables/)
         ↓
Components (app/components/)
         ↓
Pages (app/pages/)
```

**Benefits:**
- Type-safe data structures
- Version controlled content
- No database overhead
- Easy to update
- Fast build times

### 3. Internationalization Architecture

**Pattern:** Route-based i18n with RTL Support

**URL Structure:**
- English (default): `/`, `/blog`, `/resume`
- Persian: `/fa`, `/fa/blog`, `/fa/resume`

**Translation Flow:**
```
i18n/locales/*.json
         ↓
@nuxtjs/i18n plugin
         ↓
useI18n() composable
         ↓
$t() in templates
```

**RTL Handling:**
- Automatic `dir="rtl"` on `<html>` for Persian
- Tailwind RTL utilities
- CSS logical properties
- Mirrored layouts where needed


### 4. Content Management (Blog)

**Pattern:** File-based CMS with MDC

**Content Structure:**
```
content/
├── en/blog/
│   ├── post-1.md
│   └── post-2.md
└── fa/blog/
    ├── post-1.md
    └── post-2.md
```

**MDC Features:**
- Markdown with Vue components
- Syntax highlighting
- Custom components in markdown
- Frontmatter metadata
- Auto-generated TOC

**Query Pattern:**
```typescript
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryContent(`/${locale.value}/blog`)
    .sort({ date: -1 })
    .find()
)
```

### 5. Resume PDF Generation

**Pattern:** Server-side Rendering with Puppeteer

**Flow:**
```
User clicks Download
         ↓
useResumePdf.ts composable
         ↓
GET /api/resume/pdf
         ↓
Puppeteer launches headless Chrome
         ↓
Navigate to /resume?print=true
         ↓
Wait for fonts & rendering
         ↓
Generate PDF buffer
         ↓
Return PDF with headers
         ↓
Browser downloads file
```

**Key Implementation:**
```typescript
// server/api/resume/pdf.get.ts
export default defineEventHandler(async (event) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless
  })
  
  const page = await browser.newPage()
  await page.goto(`${baseUrl}/resume?print=true`, {
    waitUntil: 'networkidle0'
  })
  
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  })
  
  await browser.close()
  
  return pdf
})
```

**WYSIWYG Approach:**
- Same Vue component renders web preview AND PDF source
- CSS print styles ensure consistency
- Query parameter `?print=true` hides interactive elements

---

## Data Architecture

### Resume Data Schema

```typescript
// app/types/resume.ts

export interface ResumeBasics {
  name: string
  label: string                    // Job title
  image?: string
  email: string
  phone: string
  url?: string
  location: {
    city: string
    country: string
  }
  profiles: Array<{
    network: string               // LinkedIn, GitHub, etc.
    url: string
    icon?: string                 // Iconify icon name
  }>
  summary: string                 // Professional summary
}

export interface WorkExperience {
  company: string
  position: string
  startDate: string               // YYYY-MM format
  endDate?: string                // YYYY-MM or undefined for "Present"
  location?: string
  highlights: string[]            // Achievement bullets
  keywords?: string[]             // Technologies used
}

export interface Education {
  institution: string
  area: string                    // Field of study
  studyType: string               // Degree type (Bachelor's, Master's)
  startDate: string
  endDate?: string
  gpa?: string
  courses?: string[]
}

export interface Skill {
  name: string                    // Category name
  keywords: string[]              // Individual skills
  level?: string                  // Proficiency level
}

export interface Language {
  language: string
  fluency: 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic'
}

export interface Certification {
  name: string
  issuer: string
  date: string
  url?: string
}

export interface Resume {
  basics: ResumeBasics
  work: WorkExperience[]
  education: Education[]
  skills: Skill[]
  languages?: Language[]
  certifications?: Certification[]
}
```

### Portfolio Data Schema

```typescript
// app/types/portfolio.types.ts

export interface Profile {
  name: string
  title: string
  summary: string
  avatar: string
  location: string
  email: string
  social: SocialLink[]
}

export interface SocialLink {
  name: string
  url: string
  icon: string
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  featured: boolean
  links?: {
    live?: string
    github?: string
    case_study?: string
  }
}

export interface Experience {
  company: string
  role: string
  period: string
  description: string
  achievements: string[]
  technologies: string[]
}

export interface PortfolioData {
  profile: Profile
  projects: Project[]
  experience: Experience[]
  skills: Skill[]
  recommendations: Recommendation[]
}
```

---

## API Contracts

### GET /api/resume/pdf

**Purpose:** Generate and download resume as PDF

**Request:**
```http
GET /api/resume/pdf HTTP/1.1
Host: mahdiarghyani.vercel.app
```

**Response (Success):**
```http
HTTP/1.1 200 OK
Content-Type: application/pdf
Content-Disposition: attachment; filename="Mahdi_Arghyani_Resume.pdf"
Content-Length: [size]

[PDF binary data]
```

**Response (Error):**
```http
HTTP/1.1 500 Internal Server Error
Content-Type: application/json

{
  "error": "PDF generation failed",
  "message": "Detailed error message"
}
```

**Performance:**
- Target: < 3 seconds
- Timeout: 10 seconds
- Memory: < 512MB


---

## Technology Stack Details

### Core Framework

**Nuxt 4.1.3**
- Vue 3 Composition API
- Auto-imports for components, composables, utils
- File-based routing
- SSR + SSG support
- Built-in optimization

**Configuration Highlights:**
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  srcDir: 'app',
  experimental: {
    viewTransition: true  // Smooth page transitions
  },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/sitemap'
  ]
})
```

### UI & Styling

**Nuxt UI 4.0.1**
- Pre-built components
- Tailwind CSS integration
- Dark mode support
- Customizable theme
- Accessibility built-in

**Tailwind CSS 4.1.14**
- Utility-first CSS
- Custom design tokens
- Responsive utilities
- Dark mode variants
- RTL support

**Fonts (@nuxt/fonts 0.11.4)**
- Automatic font optimization
- Google Fonts integration
- Font subsetting
- Preloading
- Fallback fonts

**Font Stack:**
```typescript
fonts: {
  families: [
    { name: 'Geist', provider: 'google', weights: [400, 500, 600, 700] },
    { name: 'Space Grotesk', provider: 'google', weights: [500, 600, 700] },
    { name: 'DM Sans', provider: 'google', weights: [400, 500, 600, 700] }
  ]
}
```

### Content & i18n

**@nuxt/content 3.8.0**
- File-based CMS
- MDC (Markdown Components)
- Syntax highlighting
- Query builder
- Auto-generated navigation

**@nuxtjs/i18n 10.1.1**
- Route-based localization
- Translation management
- RTL support
- SEO optimization
- Language detection

**i18n Configuration:**
```typescript
i18n: {
  defaultLocale: 'en',
  strategy: 'prefix_except_default',
  locales: [
    { code: 'en', language: 'en-US', name: 'English', dir: 'ltr' },
    { code: 'fa', language: 'fa-IR', name: 'فارسی', dir: 'rtl' }
  ],
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    alwaysRedirect: false,
    redirectOn: 'root'
  }
}
```

### PDF Generation

**Puppeteer 24.31.0**
- Headless Chrome automation
- Server-side rendering
- Font embedding
- Print CSS support
- High-quality output

**@sparticuz/chromium 141.0.0**
- Serverless-optimized Chromium
- Vercel compatibility
- Reduced bundle size
- AWS Lambda support

### Image Optimization

**@nuxt/image 1.11.0**
- Automatic optimization
- WebP/AVIF support
- Responsive images
- Lazy loading
- CDN integration

**Configuration:**
```typescript
image: {
  quality: 80,
  formats: ['webp', 'jpg'],
  screens: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
  }
}
```

---

## Implementation Patterns

### Composables Pattern

**Purpose:** Reusable reactive logic

**Example: usePortfolio**
```typescript
// app/composables/usePortfolio.ts
import portfolioData from '@/data/portfolio'

export function usePortfolio() {
  const { locale } = useI18n()
  
  const portfolio = computed(() => {
    // Return locale-specific data
    return locale.value === 'fa' 
      ? portfolioDataFa 
      : portfolioData
  })
  
  return portfolio
}
```

**Usage in Components:**
```vue
<script setup lang="ts">
const portfolio = usePortfolio()
</script>

<template>
  <h1>{{ portfolio.profile.name }}</h1>
</template>
```

### Component Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Page Components | PascalCase | `index.vue`, `resume.vue` |
| Feature Components | PascalCase | `Hero.vue`, `WorkExperience.vue` |
| Common Components | PascalCase | `Header.vue`, `Footer.vue` |
| Composables | camelCase + `use` | `usePortfolio.ts` |
| Utils | camelCase | `findBy.ts`, `chipTones.ts` |
| Types | PascalCase | `Resume`, `PortfolioData` |

### Error Handling Pattern

**Client-side:**
```typescript
// Composable with error handling
export function useResumePdf() {
  const isGenerating = ref(false)
  const toast = useToast()

  async function downloadPdf() {
    isGenerating.value = true
    try {
      const response = await $fetch('/api/resume/pdf', {
        responseType: 'blob'
      })
      // Handle download
      const url = URL.createObjectURL(response)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Mahdi_Arghyani_Resume.pdf'
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('PDF generation failed:', error)
      toast.add({
        title: 'Error',
        description: 'Failed to generate PDF. Please try again.',
        color: 'error'
      })
    } finally {
      isGenerating.value = false
    }
  }

  return { isGenerating, downloadPdf }
}
```

**Server-side:**
```typescript
// API route with error handling
export default defineEventHandler(async (event) => {
  try {
    const pdf = await generatePdf()
    
    setResponseHeaders(event, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Mahdi_Arghyani_Resume.pdf"'
    })
    
    return pdf
  } catch (error) {
    console.error('PDF generation error:', error)
    throw createError({
      statusCode: 500,
      message: 'PDF generation failed'
    })
  }
})
```

### Loading States Pattern

```vue
<template>
  <UButton
    :loading="isGenerating"
    :disabled="isGenerating"
    @click="downloadPdf"
  >
    {{ isGenerating ? 'Generating...' : 'Download PDF' }}
  </UButton>
</template>

<script setup lang="ts">
const { isGenerating, downloadPdf } = useResumePdf()
</script>
```

---

## Performance Architecture

### Optimization Strategies

**1. Code Splitting**
- Automatic route-based splitting
- Dynamic imports for heavy components
- Lazy loading for below-fold content

**2. Image Optimization**
- WebP format with JPEG fallback
- Responsive images with srcset
- Lazy loading with Intersection Observer
- Proper sizing to avoid layout shift

**3. Font Loading**
- Preload critical fonts
- Font subsetting
- Font-display: swap
- System font fallbacks

**4. CSS Optimization**
- Tailwind CSS purging
- Critical CSS inlining
- Minimal custom CSS
- CSS modules for components

**5. JavaScript Optimization**
- Tree shaking
- Minification
- Compression (gzip/brotli)
- Minimal third-party scripts

### Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse Performance | 95+ | 95+ |
| First Contentful Paint | < 1.5s | ~1.2s |
| Largest Contentful Paint | < 2.5s | ~2.0s |
| Time to Interactive | < 3.5s | ~3.0s |
| Cumulative Layout Shift | < 0.1 | < 0.05 |
| Total Blocking Time | < 300ms | ~200ms |

### Caching Strategy

**Static Assets:**
```typescript
// nuxt.config.ts
routeRules: {
  '/blog': { swr: 3600 },        // 1 hour cache
  '/fa/blog': { swr: 3600 },
  '/blog/**': { swr: 3600 },
  '/fa/blog/**': { swr: 3600 }
}
```

**Images:**
- CDN caching via Vercel
- Browser caching with proper headers
- Immutable assets with hashed filenames


---

## Security Architecture

### Client-side Security

**XSS Prevention:**
- Vue's automatic HTML escaping
- Sanitized user input (if any)
- Content Security Policy headers
- No `v-html` with user content

**Data Protection:**
- No sensitive data in client code
- Environment variables for secrets
- Secure cookie settings
- HTTPS only in production

### Server-side Security

**API Security:**
```typescript
// server/api/resume/pdf.get.ts
export default defineEventHandler(async (event) => {
  // Rate limiting (via Vercel)
  // Timeout protection
  const timeoutPromise = new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), 10000)
  )
  
  try {
    const pdf = await Promise.race([
      generatePdf(),
      timeoutPromise
    ])
    return pdf
  } catch (error) {
    // Sanitized error messages
    throw createError({
      statusCode: 500,
      message: 'PDF generation failed'
    })
  }
})
```

**Puppeteer Security:**
- Sandboxed browser execution
- No user input in PDF generation
- Timeout limits
- Resource limits
- No external resource loading

### Deployment Security

**Vercel Configuration:**
- Automatic HTTPS
- DDoS protection
- Edge network security
- Environment variable encryption
- Preview deployment isolation

**Headers:**
```typescript
// nuxt.config.ts
nitro: {
  routeRules: {
    '/**': {
      headers: {
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
      }
    }
  }
}
```

---

## Accessibility Architecture

### WCAG 2.1 AA Compliance

**Semantic HTML:**
```vue
<template>
  <header role="banner">
    <nav role="navigation" aria-label="Main navigation">
      <!-- Navigation items -->
    </nav>
  </header>
  
  <main role="main">
    <article>
      <h1>Page Title</h1>
      <!-- Content -->
    </article>
  </main>
  
  <footer role="contentinfo">
    <!-- Footer content -->
  </footer>
</template>
```

**Keyboard Navigation:**
- All interactive elements focusable
- Visible focus indicators
- Logical tab order
- Skip to content link
- Keyboard shortcuts documented

**Screen Reader Support:**
- ARIA labels where needed
- Alt text for images
- Descriptive link text
- Form labels
- Status announcements

**Color Contrast:**
- Minimum 4.5:1 for normal text
- Minimum 3:1 for large text
- Tested with contrast checkers
- Dark mode maintains contrast

**Responsive Design:**
- Mobile-first approach
- Touch-friendly targets (44x44px minimum)
- Readable font sizes (16px minimum)
- No horizontal scrolling
- Zoom support up to 200%

---

## Deployment Architecture

### Vercel Deployment

**Build Configuration:**
```json
// vercel.json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".output/public",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "framework": "nuxtjs",
  "functions": {
    "server/api/resume/pdf.get.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

**Environment Variables:**
```env
# Production
NUXT_PUBLIC_SITE_URL=https://mahdiarghyani.vercel.app
NUXT_PUBLIC_GITHUB_TOKEN=[encrypted]
NUXT_PUBLIC_LOAD_PLAUSIBLE=false

# Preview
NUXT_PUBLIC_SITE_URL=https://[preview-url].vercel.app
```

**Deployment Flow:**
```
Git Push to main
       ↓
Vercel detects change
       ↓
Install dependencies (pnpm)
       ↓
Run build command
       ↓
Generate static pages (SSG)
       ↓
Deploy to Edge Network
       ↓
Invalidate CDN cache
       ↓
Production live
```

### CI/CD Pipeline

**Automatic Checks:**
1. TypeScript type checking
2. i18n validation
3. Portfolio data validation
4. Build success
5. Preview deployment

**Preview Deployments:**
- Every PR gets preview URL
- Automatic deployment on push
- Comment with preview link
- Isolated environment

**Production Deployment:**
- Merge to main → auto-deploy
- Zero-downtime deployment
- Automatic rollback on failure
- Health checks

---

## Monitoring & Analytics

### Performance Monitoring

**Core Web Vitals:**
- LCP (Largest Contentful Paint)
- FID (First Input Delay)
- CLS (Cumulative Layout Shift)
- TTFB (Time to First Byte)

**Vercel Analytics:**
- Real user monitoring
- Performance insights
- Error tracking
- Traffic analysis

### Error Tracking

**Client-side:**
```typescript
// app/plugins/error-handler.ts
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('vue:error', (error, instance, info) => {
    console.error('Vue error:', error, info)
    // Send to error tracking service
  })
})
```

**Server-side:**
```typescript
// server/middleware/error-handler.ts
export default defineEventHandler((event) => {
  event.node.res.on('error', (error) => {
    console.error('Server error:', error)
    // Send to error tracking service
  })
})
```

### Usage Analytics (Optional)

**Plausible Analytics:**
- Privacy-friendly
- No cookies
- GDPR compliant
- Lightweight script
- Page views, referrers, devices

---

## Testing Strategy

### Type Safety

**TypeScript Configuration:**
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

**Type Checking:**
```bash
pnpm typecheck
```

### Data Validation

**i18n Validation:**
```bash
pnpm check:i18n
# Checks for missing translations
# Validates translation keys
```

**Portfolio Data Validation:**
```bash
pnpm check:data
# Validates data structure
# Checks for required fields
# Ensures type consistency
```

### Manual Testing Checklist

**Functionality:**
- [ ] All pages load correctly
- [ ] Language switching works (EN/FA)
- [ ] RTL layout correct for Persian
- [ ] Dark/Light mode toggle works
- [ ] Resume PDF downloads successfully
- [ ] Blog posts display correctly
- [ ] GitHub activity loads
- [ ] All links work

**Performance:**
- [ ] Lighthouse score 95+
- [ ] Images load optimized
- [ ] No layout shift
- [ ] Fast page transitions

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast sufficient
- [ ] Focus indicators visible

**Cross-browser:**
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## Architecture Decision Records (ADRs)

### ADR-001: Nuxt 4 Framework Choice

**Decision:** Use Nuxt 4 as the primary framework

**Context:** Need modern Vue.js framework with SSR/SSG, excellent DX, and strong ecosystem

**Alternatives Considered:**
- Next.js (React) - Different ecosystem, team prefers Vue
- SvelteKit - Smaller ecosystem, less mature
- Astro - Limited interactivity, not ideal for SPA features

**Consequences:**
- (+) Excellent DX with auto-imports
- (+) Built-in SSR/SSG support
- (+) Strong Vue ecosystem
- (+) Official modules for common needs
- (-) Smaller community than Next.js
- (-) Some modules still in beta

---

### ADR-002: Server-side PDF Generation

**Decision:** Use Puppeteer server-side instead of client-side libraries

**Context:** Need pixel-perfect, ATS-compatible PDF with proper font embedding

**Alternatives Considered:**
- html2pdf.js (client) - Poor quality, converts to canvas/image
- jsPDF (client) - Manual layout, no CSS support
- Print to PDF (browser) - Inconsistent across browsers
- Third-party API - Cost, dependency, privacy concerns

**Consequences:**
- (+) Perfect quality with font embedding
- (+) Consistent output across all clients
- (+) Full CSS support
- (+) WYSIWYG approach
- (-) Requires server resources
- (-) Slightly slower than client-side
- (-) Vercel function memory requirements

---

### ADR-003: File-based Data Storage

**Decision:** Store portfolio/resume data in TypeScript files

**Context:** Need simple, version-controlled, type-safe data management

**Alternatives Considered:**
- Database (PostgreSQL, MongoDB) - Overkill for static data
- CMS (Contentful, Sanity) - Added complexity, cost
- JSON files - No type safety
- Markdown frontmatter - Limited structure

**Consequences:**
- (+) Type-safe with TypeScript
- (+) Version controlled with Git
- (+) No database overhead
- (+) Fast build times
- (+) Easy to update
- (-) Requires rebuild for updates
- (-) Not suitable for frequent changes
- (-) No admin UI

---

### ADR-004: Nuxt UI Component Library

**Decision:** Use Nuxt UI 4 as the primary component library

**Context:** Need consistent, accessible, customizable components with Tailwind integration

**Alternatives Considered:**
- Headless UI - More manual work
- Vuetify - Material Design, heavier
- PrimeVue - Different design system
- Custom components - Time-consuming

**Consequences:**
- (+) Consistent design system
- (+) Built-in accessibility
- (+) Tailwind integration
- (+) Dark mode support
- (+) Active development
- (-) Opinionated design
- (-) Learning curve for customization

---

### ADR-005: Bilingual Route Strategy

**Decision:** Use `prefix_except_default` strategy for i18n routes

**Context:** Need SEO-friendly URLs with English as default

**URL Structure:**
- English: `/`, `/blog`, `/resume`
- Persian: `/fa`, `/fa/blog`, `/fa/resume`

**Alternatives Considered:**
- `prefix` - All routes prefixed (including `/en`)
- `no_prefix` - Language in query/cookie only
- Domain-based - Separate domains for languages

**Consequences:**
- (+) Clean URLs for default language
- (+) SEO-friendly structure
- (+) Easy to understand
- (+) Standard practice
- (-) Slightly more complex routing logic

---

### ADR-006: Font Selection

**Decision:** Use Geist, Space Grotesk, and DM Sans

**Context:** Need modern, readable fonts with good international support

**Font Roles:**
- **Geist:** Primary body text, UI elements
- **Space Grotesk:** Headings, emphasis
- **DM Sans:** Alternative sections

**Alternatives Considered:**
- Inter + Vazirmatn (Ali's choice) - Good but wanted different identity
- System fonts only - Less distinctive
- Single font family - Less visual hierarchy

**Consequences:**
- (+) Modern, professional appearance
- (+) Excellent readability
- (+) Good weight variety
- (+) Distinctive brand identity
- (-) Slightly larger font files
- (-) Need to ensure Persian fallback

---

## Consistency Rules

### Color Scheme

**Nuxt UI Theme Tokens:**
```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'slate'
  }
})
```

**Usage:**
- Primary actions: `text-primary`, `bg-primary`
- Text: `text-gray-900 dark:text-gray-100`
- Borders: `border-gray-200 dark:border-gray-800`
- Backgrounds: `bg-white dark:bg-gray-900`

### Typography Scale

| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| H1 | 2.5rem (40px) | 700 | 1.2 |
| H2 | 2rem (32px) | 600 | 1.3 |
| H3 | 1.5rem (24px) | 600 | 1.4 |
| H4 | 1.25rem (20px) | 600 | 1.5 |
| Body | 1rem (16px) | 400 | 1.6 |
| Small | 0.875rem (14px) | 400 | 1.5 |

### Spacing System

**Tailwind Spacing Scale:**
- xs: 0.5rem (8px)
- sm: 0.75rem (12px)
- md: 1rem (16px)
- lg: 1.5rem (24px)
- xl: 2rem (32px)
- 2xl: 3rem (48px)

**Component Spacing:**
- Section gap: `space-y-16` (4rem)
- Card padding: `p-6` (1.5rem)
- Button padding: `px-4 py-2`
- Input padding: `px-3 py-2`

### Responsive Breakpoints

```typescript
// Tailwind breakpoints
{
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
}
```

**Usage Pattern:**
```vue
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Responsive grid -->
</div>
```

---

## Development Workflow

### Local Development

```bash
# Install dependencies
pnpm install

# Start dev server (http://localhost:5000)
pnpm dev

# Type checking
pnpm typecheck

# Validate i18n
pnpm check:i18n

# Validate data
pnpm check:data

# Format code
pnpm format

# Format and fix
pnpm format:write
```

### Adding New Features

**1. Create Component:**
```bash
app/components/feature/NewComponent.vue
```

**2. Add Types:**
```typescript
// app/types/feature.ts
export interface NewFeature {
  // Type definitions
}
```

**3. Create Composable (if needed):**
```typescript
// app/composables/useNewFeature.ts
export function useNewFeature() {
  // Reusable logic
}
```

**4. Add Translations:**
```json
// i18n/locales/en.json
{
  "feature": {
    "title": "New Feature"
  }
}

// i18n/locales/fa.json
{
  "feature": {
    "title": "ویژگی جدید"
  }
}
```

**5. Test:**
- Manual testing in browser
- Check both EN and FA
- Test dark/light mode
- Verify responsive design
- Run validation scripts

---

## Maintenance Guidelines

### Content Updates

**Portfolio Data:**
```typescript
// app/data/portfolio.en.ts
// Update projects, experience, skills
```

**Resume Data:**
```typescript
// app/data/resume.en.ts
// Follow RESUME-STANDARDS.md guidelines
```

**Blog Posts:**
```markdown
// content/en/blog/new-post.md
---
title: "Post Title"
date: "2025-12-15"
description: "Post description"
---

Content here...
```

### Dependency Updates

```bash
# Check for updates
pnpm outdated

# Update dependencies
pnpm update

# Update specific package
pnpm update nuxt@latest

# Test after updates
pnpm dev
pnpm build
```

### Performance Monitoring

**Regular Checks:**
- Run Lighthouse audits monthly
- Monitor Core Web Vitals
- Check bundle size
- Review error logs
- Test PDF generation

---

## Future Enhancements

### Planned Improvements

**Phase 2:**
- Multiple resume templates
- Resume customization UI
- Enhanced blog features (search, tags)
- Newsletter integration
- Contact form

**Phase 3:**
- Admin dashboard for content
- API for portfolio data
- Interactive project demos
- Video content support
- Community features

### Scalability Considerations

**If Traffic Increases:**
- Enable Vercel Edge caching
- Implement CDN for assets
- Add rate limiting
- Consider database for dynamic content
- Implement proper analytics

**If Content Grows:**
- Pagination for blog
- Search functionality
- Content categorization
- Archive system
- RSS feed optimization

---

_Generated by BMad Architecture Workflow_
_Date: 2025-12-15_
_For: Mahdi Arghyani_
_Project: mahdi-portfolio-nuxt_

---

## Security Architecture

### Client-side Security

**XSS Prevention:**
- Vue's automatic HTML escaping
- Sanitized user input (if any)
- Content Security Policy headers
- No `v-html` with user content

**Data Protection:**
- No sensitive data in client code
- Environment variables for secrets
- HTTPS only in production
- Secure cookie settings

### Server-side Security

**API Security:**
- Rate limiting on PDF generation
- Timeout limits (10s max)
- Input validation
- Error message sanitization

**PDF Generation Security:**
- Puppeteer sandboxing
- No user input in PDF content
- Controlled navigation URLs
- Resource limits

**Environment Variables:**
```env
# Public (safe to expose)
NUXT_PUBLIC_SITE_URL=https://mahdiarghyani.vercel.app
NUXT_PUBLIC_GITHUB_TOKEN=  # Optional, for GitHub API

# Private (server-only)
# None currently needed
```

### Deployment Security

**Vercel Configuration:**
- Automatic HTTPS
- DDoS protection
- Edge network security
- Environment variable encryption

---

## Deployment Architecture

### Vercel Deployment

**Build Configuration:**
```json
// vercel.json
{
  "functions": {
    "server/api/resume/pdf.get.ts": {
      "memory": 1024,
      "maxDuration": 10
    }
  }
}
```

**Build Process:**
```bash
# Install dependencies
pnpm install

# Generate static site
pnpm generate

# Output: .output/public/
```

**Deployment Flow:**
```
Git Push to main
         ↓
Vercel detects change
         ↓
Install dependencies
         ↓
Run nuxt generate
         ↓
Deploy to edge network
         ↓
Invalidate CDN cache
         ↓
Live at mahdiarghyani.vercel.app
```

### Environment-specific Configuration

**Development:**
- Port: 5000
- Hot reload enabled
- Source maps enabled
- No optimization

**Production:**
- SSG pre-rendering
- Minification
- Compression
- CDN caching
- Error tracking

### Serverless Functions

**PDF Generation Function:**
- Runtime: Node.js 18.x
- Memory: 1024 MB
- Timeout: 10 seconds
- Region: Auto (closest to user)

**Puppeteer on Vercel:**
```typescript
// Uses @sparticuz/chromium for serverless
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

const browser = await puppeteer.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: chromium.headless
})
```

---

## Consistency Rules

### Design System

**Color Tokens:**
```typescript
// Nuxt UI theme configuration
colors: {
  primary: 'blue',    // Main brand color
  gray: 'slate'       // Neutral colors
}
```

**Spacing Scale:**
- Base unit: 4px (0.25rem)
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96
- Consistent use of Tailwind spacing utilities

**Typography Scale:**
```css
/* Headings */
h1: 2.5rem (40px) - font-bold
h2: 2rem (32px) - font-semibold
h3: 1.5rem (24px) - font-semibold
h4: 1.25rem (20px) - font-medium

/* Body */
base: 1rem (16px) - font-normal
small: 0.875rem (14px) - font-normal
xs: 0.75rem (12px) - font-normal
```

**Font Families:**
```css
/* Primary (body, UI) */
font-sans: Geist, system-ui, sans-serif

/* Accent (headings) */
font-display: 'Space Grotesk', sans-serif

/* Alternative */
font-alt: 'DM Sans', sans-serif
```

### Component Patterns

**Button Variants:**
- Primary: Solid background, white text
- Secondary: Outline, transparent background
- Ghost: No border, transparent background
- Link: Text only, underline on hover

**Card Pattern:**
```vue
<UCard>
  <template #header>
    <h3>Card Title</h3>
  </template>
  
  <p>Card content</p>
  
  <template #footer>
    <UButton>Action</UButton>
  </template>
</UCard>
```

**Layout Pattern:**
```vue
<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Content -->
  </div>
</template>
```

### Responsive Breakpoints

```typescript
// Tailwind breakpoints
screens: {
  'sm': '640px',   // Mobile landscape
  'md': '768px',   // Tablet
  'lg': '1024px',  // Desktop
  'xl': '1280px',  // Large desktop
  '2xl': '1536px'  // Extra large
}
```

**Usage Pattern:**
```vue
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Responsive grid -->
</div>
```

---

## Testing Strategy

### Type Safety

**TypeScript Configuration:**
```json
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler",
    "paths": {
      "@": ["./app"],
      "@/*": ["./app/*"]
    }
  }
}
```

**Type Checking:**
```bash
# Run type check
pnpm typecheck
```

### Data Validation

**Portfolio Data Check:**
```bash
# Validate portfolio data structure
pnpm check:data
```

**i18n Validation:**
```bash
# Check translation completeness
pnpm check:i18n
```

### Manual Testing Checklist

**Functionality:**
- [ ] All pages load correctly
- [ ] Language switching works (EN/FA)
- [ ] RTL layout correct for Persian
- [ ] Dark/Light mode toggle works
- [ ] Resume PDF downloads successfully
- [ ] Blog posts render correctly
- [ ] GitHub activity displays
- [ ] All links work

**Performance:**
- [ ] Lighthouse score 95+
- [ ] Images load optimized
- [ ] No layout shift
- [ ] Fast page transitions

**Accessibility:**
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Proper heading hierarchy
- [ ] Sufficient color contrast
- [ ] Focus indicators visible

**Cross-browser:**
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari
- [ ] Mobile browsers

---

## Monitoring & Analytics

### Performance Monitoring

**Vercel Analytics:**
- Real User Monitoring (RUM)
- Core Web Vitals tracking
- Page load times
- Error tracking

**Lighthouse CI:**
- Automated performance checks
- Regression detection
- Performance budgets

### Optional Analytics

**Plausible Analytics:**
```typescript
// nuxt.config.ts
runtimeConfig: {
  public: {
    loadPlausible: process.env.NUXT_PUBLIC_LOAD_PLAUSIBLE || 'false'
  }
}
```

**Tracked Events:**
- Page views
- Resume downloads
- Blog post reads
- Language switches
- External link clicks

---

## Development Workflow

### Local Development

**Setup:**
```bash
# Clone repository
git clone [repo-url]

# Install dependencies
pnpm install

# Start dev server
pnpm dev
```

**Development Server:**
- URL: http://localhost:5000
- Hot reload enabled
- TypeScript checking
- Auto-imports

### Code Quality

**Prettier Configuration:**
```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

**Commands:**
```bash
# Check formatting
pnpm format

# Fix formatting
pnpm format:write

# Type check
pnpm typecheck
```

### Git Workflow

**Branch Strategy:**
- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

**Commit Convention:**
```
feat: Add new feature
fix: Fix bug
docs: Update documentation
style: Format code
refactor: Refactor code
perf: Improve performance
test: Add tests
chore: Update dependencies
```

---

## Architecture Decision Records (ADRs)

### ADR-001: Nuxt 4 Framework Choice

**Decision:** Use Nuxt 4 as the primary framework

**Context:** Need modern Vue.js framework with SSR/SSG, good DX, and performance

**Alternatives Considered:**
- Next.js (React) - Different ecosystem
- SvelteKit - Less mature ecosystem
- Astro - Limited interactivity

**Consequences:**
- (+) Excellent Vue.js integration
- (+) Auto-imports and conventions
- (+) Strong TypeScript support
- (+) Great performance out of the box
- (-) Nuxt 4 is relatively new (potential bugs)

---

### ADR-002: Server-side PDF Generation

**Decision:** Use Puppeteer server-side for PDF generation

**Context:** Need high-quality, ATS-compatible PDF with proper fonts

**Alternatives Considered:**
- Client-side html2pdf.js - Poor quality, image-based
- Client-side jsPDF - Manual layout, no CSS
- Browser print - Inconsistent across browsers

**Consequences:**
- (+) Perfect quality and font embedding
- (+) Consistent output across all clients
- (+) Full CSS support
- (-) Requires server resources
- (-) Slightly slower than client-side
- (-) Serverless function overhead

---

### ADR-003: File-based Data Storage

**Decision:** Store portfolio/resume data in TypeScript files

**Context:** Need simple, version-controlled data management

**Alternatives Considered:**
- Database (PostgreSQL, MongoDB) - Overkill for static data
- CMS (Contentful, Sanity) - Unnecessary complexity
- JSON files - No type safety

**Consequences:**
- (+) Type-safe data structures
- (+) Version controlled
- (+) No database overhead
- (+) Fast build times
- (+) Easy to update
- (-) Requires rebuild for updates
- (-) Not suitable for frequent changes

---

### ADR-004: Nuxt UI Component Library

**Decision:** Use Nuxt UI 4 as the primary component library

**Context:** Need consistent, accessible components with Tailwind integration

**Alternatives Considered:**
- Headless UI - More manual work
- Custom components - Time-consuming
- Vuetify - Material Design (not desired)

**Consequences:**
- (+) Pre-built accessible components
- (+) Tailwind CSS integration
- (+) Dark mode support
- (+) Customizable theme
- (+) Active maintenance
- (-) Learning curve for Nuxt UI specifics
- (-) Some customization limitations

---

### ADR-005: Bilingual Route Strategy

**Decision:** Use `prefix_except_default` strategy for i18n

**Context:** Need SEO-friendly URLs with English as default

**URL Structure:**
- English: `/`, `/blog`, `/resume`
- Persian: `/fa`, `/fa/blog`, `/fa/resume`

**Alternatives Considered:**
- `prefix` - All routes prefixed (including `/en`)
- `no_prefix` - Language in query/cookie only
- Domain-based - Separate domains per language

**Consequences:**
- (+) Clean English URLs (no `/en` prefix)
- (+) SEO-friendly structure
- (+) Clear language separation
- (+) Easy to share localized links
- (-) Slightly more complex routing logic

---

## Future Architecture Considerations

### Scalability

**Content Growth:**
- Current: File-based content works well
- Future: Consider headless CMS if content team grows
- Threshold: 100+ blog posts or frequent updates

**Traffic Growth:**
- Current: Vercel edge network handles well
- Future: Consider CDN optimization for assets
- Threshold: 100k+ monthly visitors

### Feature Additions

**Potential Enhancements:**
1. **Multiple Resume Templates**
   - Template selection UI
   - Template preview
   - Custom styling per template

2. **Interactive Project Demos**
   - Embedded demos
   - Code sandboxes
   - Video walkthroughs

3. **Contact Form**
   - Form validation
   - Email integration (SendGrid, Resend)
   - Spam protection

4. **Newsletter**
   - Email collection
   - Newsletter service integration
   - Subscription management

5. **Comments System**
   - Blog post comments
   - Moderation system
   - Spam filtering

### Technology Updates

**Monitoring:**
- Nuxt 4 stable release
- Tailwind CSS updates
- Nuxt UI updates
- Security patches

**Upgrade Strategy:**
- Test in development first
- Check breaking changes
- Update dependencies incrementally
- Maintain backward compatibility

---

_Generated by BMad Architecture Workflow_
_Date: 2025-12-15_
_For: Mahdi Arghyani_
_Project: mahdi-portfolio-nuxt_
