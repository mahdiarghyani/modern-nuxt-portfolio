# mahdi-portfolio-nuxt - Product Requirements Document

**Author:** Mahdi Arghyani
**Date:** 2025-12-15
**Version:** 1.0

---

## Executive Summary

This PRD defines the **Modern Bilingual Portfolio Website** for Mahdi Arghyani - a comprehensive personal portfolio showcasing professional experience, technical skills, projects, and blog content with integrated resume export functionality.

**Context:** This is a production-ready Nuxt 4 application built with modern web technologies, emphasizing performance, accessibility, and bilingual support (English/Persian) for international reach.

### What Makes This Special

The key differentiator is the **AI-first development approach** combined with **pixel-perfect bilingual support** and **ATS-optimized resume export**. The portfolio demonstrates modern frontend expertise while maintaining exceptional performance (Lighthouse 95+) and accessibility standards.

---

## Project Classification

**Technical Type:** web_app (Personal Portfolio + Blog + Resume Platform)
**Domain:** general
**Complexity:** medium

This is a comprehensive portfolio platform combining multiple features: content management (blog), data visualization (GitHub activity), document generation (PDF resume), and bilingual support with RTL.

---

## Success Criteria

1. **Performance:** Lighthouse score 95+ across all metrics
2. **Bilingual Excellence:** Seamless EN/FA switching with proper RTL support
3. **Resume Quality:** ATS-compatible PDF matching professional standards
4. **Content Delivery:** Fast blog loading with MDC support
5. **User Experience:** Smooth navigation with View Transitions API
6. **SEO:** Proper meta tags, sitemap, and RSS feeds
7. **Accessibility:** WCAG 2.1 AA compliance

---

## Product Scope

### MVP - Minimum Viable Product (Completed)

**Portfolio Features:**
- Hero section with professional profile
- Skills showcase (technical + soft skills)
- AI Stack display
- Work experience timeline
- Projects showcase
- GitHub activity visualization
- Recommendations section

**Content Features:**
- Bilingual blog (EN/FA)
- MDC (Markdown Components) support
- RSS feeds
- Sitemap generation

**Resume Features:**
- Dedicated resume page
- PDF export with Puppeteer
- ATS-friendly format
- WYSIWYG preview

**Core Infrastructure:**
- Nuxt 4 + Vue 3
- TypeScript
- Tailwind CSS 4
- Nuxt UI 4
- i18n with RTL
- Dark/Light mode

### Growth Features (In Progress)

- Resume content personalization
- Blog content expansion
- Additional project case studies
- Enhanced GitHub integration
- Performance monitoring

### Vision (Future)

- Multiple resume templates
- Job-specific resume variants
- AI-powered content suggestions
- Interactive project demos
- Video content integration
- Newsletter subscription
- Contact form with email integration

---

## User Experience Principles

**Visual Personality:** Modern, clean, professional with emphasis on readability and visual hierarchy. Dark mode as default with smooth light mode transition.

**Typography:** 
- Primary: Geist (body text, UI elements)
- Accent: Space Grotesk (headings, emphasis)
- Alternative: DM Sans (special sections)

**Color Scheme:**
- Dark mode primary (default)
- Light mode available
- Consistent color tokens via Nuxt UI
- Proper contrast ratios for accessibility

### Key Interactions

1. **Navigation Flow:** Smooth page transitions using View Transitions API
2. **Language Switching:** Instant locale change with proper RTL/LTR direction
3. **Theme Toggle:** Seamless dark/light mode switching
4. **Resume Download:** One-click PDF generation and download
5. **Blog Reading:** Comfortable reading experience with proper typography
6. **Project Exploration:** Filterable project showcase

---

## Functional Requirements

### Portfolio Display

**FR1: Hero Section**
- Display professional profile information
- Show name, title, and summary
- Include profile image
- Provide quick access to social links

**FR2: Skills Showcase**
- Display technical skills with categories
- Show soft skills
- Include AI tools and methodologies
- Visual representation of skill levels

**FR3: Work Experience**
- Timeline view of professional experience
- Company, role, duration, and achievements
- Support for multiple positions
- Bilingual content support

**FR4: Projects Showcase**
- Grid/list view of projects
- Project filtering by technology/category
- Detailed project information
- Links to live demos and repositories

**FR5: GitHub Activity**
- Contribution graph visualization
- Real-time data from GitHub API
- Activity statistics
- Responsive display

**FR6: Recommendations**
- Display professional recommendations
- Include recommender details
- Support for multiple recommendations
- Bilingual content

### Blog System

**FR7: Blog Listing**
- Display blog posts in chronological order
- Support for both EN and FA posts
- Post metadata (date, reading time, tags)
- Responsive grid layout

**FR8: Blog Post Display**
- MDC (Markdown Components) rendering
- Syntax highlighting for code blocks
- Table of contents
- Social sharing options
- Bilingual support

**FR9: RSS Feeds**
- Generate RSS feeds for EN and FA blogs
- Include post metadata
- Automatic updates on new posts

### Resume System

**FR10: Resume Preview**
- Dedicated `/resume` route
- WYSIWYG display (matches PDF output)
- Professional two-column layout
- Standalone page (no site navigation)

**FR11: PDF Generation**
- Server-side PDF generation with Puppeteer
- ATS-compatible output (text-based, not images)
- Proper heading hierarchy
- Filename format: `Mahdi_Arghyani_Resume.pdf`
- Generation time < 3 seconds

**FR12: Resume Data Management**
- Structured TypeScript data file
- Support for: basics, work, education, skills, languages, certifications
- Independent from portfolio data
- Easy to update and maintain

### Internationalization

**FR13: Language Support**
- English (default) at `/`
- Persian at `/fa`
- Automatic RTL for Persian
- Language switcher component
- Persistent language preference

**FR14: Translation Management**
- JSON-based translation files
- Separate files for EN and FA
- Support for nested translations
- Type-safe translation keys

### Theme System

**FR15: Dark/Light Mode**
- Dark mode as default
- Light mode option
- System preference detection
- Persistent theme preference
- Smooth transitions

### Performance & SEO

**FR16: Performance Optimization**
- SSR + SSG for optimal loading
- Image optimization with @nuxt/image
- Code splitting
- Lazy loading for below-fold content
- Lighthouse score 95+

**FR17: SEO Optimization**
- Dynamic meta tags per page
- Open Graph tags
- Twitter Card tags
- Sitemap generation
- Robots.txt
- Canonical URLs

---

## Non-Functional Requirements

### Performance

- **Page Load:** < 2 seconds (LCP)
- **First Contentful Paint:** < 1.5 seconds
- **Time to Interactive:** < 3.5 seconds
- **Cumulative Layout Shift:** < 0.1
- **PDF Generation:** < 3 seconds

### Accessibility

- **WCAG 2.1 AA compliance**
- Semantic HTML structure
- Proper heading hierarchy
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast
- Focus indicators

### Browser Compatibility

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari 15+
- iOS Safari 15+
- No IE11 support

### Security

- HTTPS only in production
- No sensitive data in client-side code
- Secure API endpoints
- Content Security Policy headers
- XSS protection

### Maintainability

- TypeScript for type safety
- Component-based architecture
- Reusable composables
- Consistent code style (Prettier)
- Comprehensive documentation
- Version control with Git

---

## Technical Notes (for Architecture phase)

**Key Technical Decisions:**
- Nuxt 4 for modern Vue.js development
- Nuxt UI 4 for consistent component library
- Tailwind CSS 4 for utility-first styling
- Puppeteer for server-side PDF generation
- @nuxt/content for MDC blog support
- @nuxtjs/i18n for bilingual support

**Data Architecture:**
- File-based data storage (TypeScript files)
- Separate data files for portfolio, resume, skills
- Type-safe data structures
- Easy to update and version control

**Deployment:**
- Vercel for hosting
- Automatic deployments from Git
- Preview deployments for PRs
- Environment variables for configuration

---

## User Personas

### Primary Persona: International Recruiters/Hiring Managers

**Goals:**
- Quickly assess technical skills and experience
- Download professional resume
- View project portfolio
- Verify GitHub activity

**Pain Points:**
- Need ATS-compatible resume format
- Want to see real project examples
- Limited time for evaluation

**How We Solve:**
- One-click ATS-friendly PDF download
- Clear skills showcase
- Detailed project case studies
- GitHub activity proof

### Secondary Persona: Technical Peers/Collaborators

**Goals:**
- Understand technical expertise
- Read blog posts
- Explore project implementations
- Connect professionally

**Pain Points:**
- Want technical depth
- Need code examples
- Looking for thought leadership

**How We Solve:**
- Technical blog with code examples
- Detailed project descriptions
- GitHub integration
- Social links for connection

---

## Metrics & Analytics

### Key Performance Indicators (KPIs)

1. **Traffic Metrics:**
   - Page views
   - Unique visitors
   - Session duration
   - Bounce rate

2. **Engagement Metrics:**
   - Resume downloads
   - Blog post reads
   - Project clicks
   - Social link clicks

3. **Technical Metrics:**
   - Lighthouse scores
   - Core Web Vitals
   - Error rates
   - API response times

4. **Content Metrics:**
   - Most viewed projects
   - Popular blog posts
   - Language preference distribution

---

## Risk Assessment

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| PDF generation fails | High | Low | Error handling, fallback to print |
| Slow page load | High | Low | Performance monitoring, optimization |
| i18n bugs | Medium | Low | Comprehensive testing, validation scripts |
| GitHub API rate limits | Medium | Medium | Caching, fallback data |
| Content outdated | Low | High | Regular content reviews, easy update process |

---

## Dependencies

### External Services

- **GitHub API:** For contribution data (optional, has fallback)
- **Vercel:** For hosting and deployment
- **Google Fonts API:** For font loading (via @nuxt/fonts)

### Third-party Libraries

- **Puppeteer:** PDF generation (critical)
- **@nuxt/content:** Blog functionality (critical)
- **@nuxtjs/i18n:** Internationalization (critical)
- **Nuxt UI:** Component library (critical)

---

## Future Considerations

### Phase 2 Enhancements

- Multiple resume templates
- Resume customization UI
- Job-specific resume variants
- Enhanced blog features (comments, likes)
- Newsletter integration
- Contact form

### Phase 3 Vision

- AI-powered content suggestions
- Interactive project demos
- Video content integration
- Case study deep dives
- Community features
- API for portfolio data

---

_This PRD captures the Modern Bilingual Portfolio Website for Mahdi Arghyani - a comprehensive platform showcasing professional expertise with emphasis on performance, accessibility, and international reach._

_Created through BMad Method collaborative discovery._
