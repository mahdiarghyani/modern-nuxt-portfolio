# Blog System Design Document

## Overview

This document outlines the technical design for implementing a fully-featured blog system in the Nuxt 4 portfolio application using Nuxt Content v3. The design integrates seamlessly with the existing architecture, leveraging Nuxt UI components, i18n for bilingual support, and modern performance optimization techniques.

### Design Goals

1. **Content-First Architecture**: Use file-based markdown content management for simplicity and version control
2. **Seamless Integration**: Maintain consistency with existing portfolio design system and navigation
3. **Bilingual Support**: Full English and Persian (RTL) support with locale-specific content
4. **Performance**: Optimize for fast page loads, SEO, and Core Web Vitals
5. **Developer Experience**: Hot-reload, TypeScript safety, and intuitive content authoring
6. **Extensibility**: Support for MDC components, custom frontmatter, and future enhancements

### Technology Stack

- **Content Management**: @nuxt/content v3.x
- **UI Components**: Nuxt UI v4 (existing)
- **Styling**: Tailwind CSS v4 (existing)
- **Internationalization**: @nuxtjs/i18n (existing)
- **Image Optimization**: @nuxt/image (existing)
- **Syntax Highlighting**: Shiki (built-in with Nuxt Content)
- **Type Safety**: TypeScript with custom interfaces

## Architecture

### High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Nuxt 4 Application                       │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐                     │
│  │   Pages      │      │  Components  │                     │
│  │              │      │              │                     │
│  │ /blog/       │─────▶│ BlogList     │                     │
│  │ index.vue    │      │ BlogCard     │                     │
│  │              │      │ BlogSearch   │                     │
│  │ /blog/       │      │ TagFilter    │                     │
│  │ [...slug]    │─────▶│ BlogPost     │                     │
│  │ .vue         │      │ TableOfContents                    │
│  └──────────────┘      │ BlogNav      │                     │
│         │              └──────────────┘                     │
│         │                      │                             │
│         ▼                      ▼                             │
│  ┌─────────────────────────────────────┐                    │
│  │      Nuxt Content Module            │                    │
│  │  - queryContent() API               │                    │
│  │  - ContentDoc component             │                    │
│  │  - ContentRenderer component        │                    │
│  │  - useContentHead() composable      │                    │
│  └─────────────────────────────────────┘                    │
│         │                                                    │
│         ▼                                                    │
│  ┌─────────────────────────────────────┐                    │
│  │      Content Directory              │                    │
│  │  content/                           │                    │
│  │    ├── en/blog/*.md                 │                    │
│  │    └── fa/blog/*.md                 │                    │
│  └─────────────────────────────────────┘                    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```


### Directory Structure

```
project-root/
├── content/                          # Content directory (new)
│   ├── en/
│   │   └── blog/
│   │       ├── my-first-post.md
│   │       ├── nuxt-tips.md
│   │       └── tutorials/
│   │           └── getting-started.md
│   └── fa/
│       └── blog/
│           ├── first-post-fa.md
│           └── nuxt-tips-fa.md
│
├── app/
│   ├── pages/
│   │   └── blog/
│   │       ├── index.vue             # Blog listing page (existing, to be updated)
│   │       └── [...slug].vue         # Blog detail page (existing, to be updated)
│   │
│   ├── components/
│   │   └── blog/                     # Blog components (new)
│   │       ├── BlogCard.vue
│   │       ├── BlogList.vue
│   │       ├── BlogSearch.vue
│   │       ├── BlogTagFilter.vue
│   │       ├── BlogPost.vue
│   │       ├── BlogTableOfContents.vue
│   │       ├── BlogNavigation.vue
│   │       └── BlogEmpty.vue
│   │
│   ├── composables/
│   │   └── useBlog.ts                # Blog utilities composable (new)
│   │
│   ├── types/
│   │   └── blog.ts                   # Blog TypeScript types (new)
│   │
│   └── public/
│       └── img/
│           └── blog/                 # Blog images (new)
│               └── default-cover.jpg
│
├── server/
│   └── routes/
│       └── blog/
│           └── rss.xml.ts            # RSS feed generator (new)
│
└── nuxt.config.ts                    # Updated with @nuxt/content
```

### Content Flow

1. **Content Creation**: Developer writes markdown files in `content/{locale}/blog/`
2. **Content Parsing**: Nuxt Content parses markdown and frontmatter on server start
3. **Content Query**: Pages use `queryContent()` to fetch filtered/sorted content
4. **Content Rendering**: `ContentRenderer` transforms markdown to HTML with Vue components
5. **Content Display**: Nuxt UI components style the rendered content

## Components and Interfaces

### Page Components

#### 1. Blog Listing Page (`app/pages/blog/index.vue`)

**Purpose**: Display all published blog posts with search and filtering capabilities

**Key Features**:
- Fetch posts using `queryContent()`
- Search functionality with debounce
- Tag filtering
- Responsive grid layout
- Empty state handling
- Locale-aware content fetching

**Component Structure**:
```vue
<template>
  <UContainer>
    <BlogSearch v-model="searchQuery" />
    <BlogTagFilter v-model="selectedTag" :tags="allTags" />
    <BlogList :posts="filteredPosts" />
    <BlogEmpty v-if="filteredPosts.length === 0" />
  </UContainer>
</template>
```

**Data Fetching Strategy**:
```typescript
const { locale } = useI18n()
const route = useRoute()

// Fetch posts for current locale
const { data: posts } = await useAsyncData('blog-posts', () => 
  queryContent(`${locale.value}/blog`)
    .where({ draft: { $ne: true } })
    .sort({ date: -1 })
    .only(['title', 'description', 'date', 'tags', '_path', 'image'])
    .find()
)
```


#### 2. Blog Detail Page (`app/pages/blog/[...slug].vue`)

**Purpose**: Render individual blog post with full content and metadata

**Key Features**:
- Fetch single post by slug
- Render markdown content with syntax highlighting
- Display metadata (title, date, tags, reading time)
- Table of contents for long posts
- Previous/next post navigation
- SEO meta tags
- Breadcrumb navigation

**Component Structure**:
```vue
<template>
  <UContainer>
    <UBreadcrumb :links="breadcrumbs" />
    <article>
      <BlogPost :post="post" />
      <ContentRenderer :value="post" />
      <BlogTableOfContents v-if="post.body?.toc" :toc="post.body.toc" />
    </article>
    <BlogNavigation :prev="prevPost" :next="nextPost" />
  </UContainer>
</template>
```

**Data Fetching Strategy**:
```typescript
const { locale } = useI18n()
const route = useRoute()
const slug = route.params.slug as string[]

// Fetch current post
const { data: post } = await useAsyncData(`blog-post-${slug.join('/')}`, () =>
  queryContent(`${locale.value}/blog`)
    .where({ _path: `/${locale.value}/blog/${slug.join('/')}` })
    .findOne()
)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}

// Fetch adjacent posts for navigation
const { data: adjacentPosts } = await useAsyncData('adjacent-posts', () =>
  queryContent(`${locale.value}/blog`)
    .where({ draft: { $ne: true } })
    .sort({ date: -1 })
    .only(['title', '_path', 'date'])
    .find()
)
```

### UI Components

#### 1. BlogCard Component

**Purpose**: Display blog post preview in listing page

**Props**:
```typescript
interface BlogCardProps {
  post: BlogPost
}
```

**Features**:
- Cover image with lazy loading
- Title and description
- Formatted date
- Reading time estimate
- Tags as badges
- Hover effects
- Click to navigate

**Implementation Notes**:
- Use `UCard` from Nuxt UI as base
- Use `NuxtImg` for optimized images
- Use `UBadge` for tags
- Use `localePath()` for navigation

#### 2. BlogSearch Component

**Purpose**: Search input for filtering posts

**Props**:
```typescript
interface BlogSearchProps {
  modelValue: string
}

interface BlogSearchEmits {
  'update:modelValue': [value: string]
}
```

**Features**:
- Debounced input (300ms)
- Clear button
- Search icon
- Placeholder text (i18n)

**Implementation Notes**:
- Use `UInput` with icon slots
- Use `useDebounceFn` from VueUse
- Emit updates to parent

#### 3. BlogTagFilter Component

**Purpose**: Display and filter by tags

**Props**:
```typescript
interface BlogTagFilterProps {
  tags: string[]
  modelValue: string | null
}
```

**Features**:
- Display all unique tags
- Highlight active tag
- Clear filter option
- Responsive layout

**Implementation Notes**:
- Use `UButton` or `UBadge` for tags
- Use query parameters for state persistence
- Horizontal scroll on mobile


#### 4. BlogTableOfContents Component

**Purpose**: Display navigable table of contents for long posts

**Props**:
```typescript
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

interface BlogTableOfContentsProps {
  toc: {
    links: TocLink[]
  }
}
```

**Features**:
- Nested heading structure
- Active section highlighting
- Smooth scroll to sections
- Sticky positioning on desktop
- Collapsible on mobile

**Implementation Notes**:
- Use `IntersectionObserver` for active tracking
- Use `scrollIntoView({ behavior: 'smooth' })` for navigation
- Use `UAccordion` for mobile collapsible version

#### 5. BlogNavigation Component

**Purpose**: Previous/next post navigation

**Props**:
```typescript
interface BlogNavigationProps {
  prev: BlogPost | null
  next: BlogPost | null
}
```

**Features**:
- Previous and next post links
- Post titles
- Directional arrows
- Keyboard navigation support

**Implementation Notes**:
- Use `UButton` with icon slots
- Use `@keydown` for arrow key navigation
- Use flexbox for layout

#### 6. BlogPost Component

**Purpose**: Display post metadata header

**Props**:
```typescript
interface BlogPostProps {
  post: BlogPost
}
```

**Features**:
- Post title (h1)
- Formatted publish date
- Reading time estimate
- Author info (if available)
- Tags
- Cover image

**Implementation Notes**:
- Use semantic HTML (`<article>`, `<header>`, `<time>`)
- Use `useDateFormat` from VueUse for date formatting
- Calculate reading time from word count

## Data Models

### BlogPost Interface

```typescript
import type { ParsedContent } from '@nuxt/content/dist/runtime/types'

export interface BlogPost extends ParsedContent {
  // Required fields
  title: string
  description: string
  date: string // ISO 8601 format
  tags: string[]
  
  // Optional fields
  image?: string // Cover image path
  author?: string
  draft?: boolean
  updatedAt?: string
  
  // Custom SEO
  head?: {
    title?: string
    description?: string
    image?: string
  }
  
  // Computed by Nuxt Content
  _path: string
  _dir: string
  _draft: boolean
  _partial: boolean
  _locale: string
  _empty: boolean
  body: {
    type: string
    children: any[]
    toc?: {
      title: string
      searchDepth: number
      depth: number
      links: TocLink[]
    }
  }
}
```

### Frontmatter Example

```yaml
---
title: "Getting Started with Nuxt Content"
description: "Learn how to build a blog with Nuxt Content v3 and TypeScript"
date: "2024-11-09"
tags: ["nuxt", "vue", "typescript", "tutorial"]
image: "/img/blog/nuxt-content-cover.jpg"
author: "Ali Arghyani"
draft: false
---
```


## Composables

### useBlog Composable

**Purpose**: Centralize blog-related utilities and logic

**Location**: `app/composables/useBlog.ts`

**Exports**:

```typescript
export function useBlog() {
  const { locale } = useI18n()
  const route = useRoute()
  
  /**
   * Calculate reading time from word count
   */
  const calculateReadingTime = (content: any): number => {
    if (!content?.body?.children) return 0
    
    const text = JSON.stringify(content.body.children)
    const wordCount = text.split(/\s+/).length
    return Math.ceil(wordCount / 200) // 200 words per minute
  }
  
  /**
   * Format date for display
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }
  
  /**
   * Get all unique tags from posts
   */
  const extractUniqueTags = (posts: BlogPost[]): string[] => {
    const tagSet = new Set<string>()
    posts.forEach(post => {
      post.tags?.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }
  
  /**
   * Get blog path for current locale
   */
  const getBlogPath = (): string => {
    return `${locale.value}/blog`
  }
  
  /**
   * Filter posts by search query
   */
  const filterPostsBySearch = (posts: BlogPost[], query: string): BlogPost[] => {
    if (!query) return posts
    
    const lowerQuery = query.toLowerCase()
    return posts.filter(post => 
      post.title?.toLowerCase().includes(lowerQuery) ||
      post.description?.toLowerCase().includes(lowerQuery) ||
      post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }
  
  /**
   * Filter posts by tag
   */
  const filterPostsByTag = (posts: BlogPost[], tag: string | null): BlogPost[] => {
    if (!tag) return posts
    return posts.filter(post => post.tags?.includes(tag))
  }
  
  return {
    calculateReadingTime,
    formatDate,
    extractUniqueTags,
    getBlogPath,
    filterPostsBySearch,
    filterPostsByTag
  }
}
```

## Nuxt Content Configuration

### nuxt.config.ts Updates

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxt/content',  // Add before other modules
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxtjs/color-mode',
    '@nuxt/image'
  ],
  
  content: {
    // Highlight code blocks with Shiki
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark'
      },
      preload: ['typescript', 'javascript', 'vue', 'css', 'bash', 'json']
    },
    
    // Enable MDC syntax
    markdown: {
      mdc: true,
      toc: {
        depth: 3,
        searchDepth: 3
      }
    },
    
    // Document-driven mode disabled (we use custom pages)
    documentDriven: false,
    
    // Respect gitignore
    respectPathCase: true
  },
  
  // Prerender blog routes
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/blog', '/fa/blog']
    }
  },
  
  // Route rules for blog
  routeRules: {
    '/blog': { swr: 3600 },
    '/fa/blog': { swr: 3600 },
    '/blog/**': { swr: 3600 },
    '/fa/blog/**': { swr: 3600 }
  }
})
```


## Styling and Theming

### Prose Components Customization

Nuxt UI provides Prose components for styling markdown content. We'll customize them to match the portfolio design.

**Approach**:
1. Use Nuxt UI's built-in Prose components (ProseH1, ProseP, ProseCode, etc.)
2. Override styles via `app.config.ts` if needed
3. Apply consistent spacing and typography

**Example Prose Styling**:

```typescript
// app.config.ts additions
export default defineAppConfig({
  ui: {
    prose: {
      // Customize prose components
      h1: {
        base: 'text-4xl font-semibold mb-4 mt-8',
        color: 'text-gray-900 dark:text-gray-100'
      },
      h2: {
        base: 'text-3xl font-semibold mb-3 mt-6',
        color: 'text-gray-900 dark:text-gray-100'
      },
      p: {
        base: 'text-lg leading-relaxed mb-4',
        color: 'text-gray-700 dark:text-gray-300'
      },
      code: {
        base: 'font-mono text-sm',
        inline: 'px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800'
      }
    }
  }
})
```

### Blog-Specific Styles

**Content Width**: 
- Max width: 65ch for optimal readability
- Wider for code blocks and images

**Typography**:
- Body text: 18px / 1.75 line-height
- Headings: Existing font stack (Fraunces for headings, Inter for body)

**Code Blocks**:
- Syntax highlighting with Shiki
- Copy button overlay
- Language label
- Line numbers for long blocks

**Images**:
- Responsive with `NuxtImg`
- Lazy loading
- Caption support via markdown

### RTL Support

**CSS Direction Handling**:

```vue
<template>
  <div :dir="locale === 'fa' ? 'rtl' : 'ltr'" class="blog-content">
    <ContentRenderer :value="post" />
  </div>
</template>

<style scoped>
.blog-content[dir="rtl"] {
  /* RTL-specific adjustments */
  text-align: right;
}

.blog-content[dir="rtl"] code {
  /* Keep code LTR even in RTL context */
  direction: ltr;
  text-align: left;
}
</style>
```

## SEO Implementation

### Meta Tags Strategy

**Page-Level SEO** (`app/pages/blog/[...slug].vue`):

```typescript
const { locale } = useI18n()
const config = useAppConfig()

// Use Nuxt Content's built-in SEO helper
useContentHead(post)

// Additional custom meta tags
useSeoMeta({
  title: `${post.value.title} | Blog | ${config.siteName}`,
  description: post.value.description,
  ogTitle: post.value.title,
  ogDescription: post.value.description,
  ogImage: post.value.image || '/img/blog/default-cover.jpg',
  ogType: 'article',
  ogUrl: `${config.siteUrl}${post.value._path}`,
  twitterCard: 'summary_large_image',
  twitterTitle: post.value.title,
  twitterDescription: post.value.description,
  twitterImage: post.value.image || '/img/blog/default-cover.jpg',
  articlePublishedTime: post.value.date,
  articleModifiedTime: post.value.updatedAt || post.value.date,
  articleAuthor: post.value.author || 'Ali Arghyani',
  articleTag: post.value.tags
})

// JSON-LD structured data
useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.value.title,
        description: post.value.description,
        image: post.value.image,
        datePublished: post.value.date,
        dateModified: post.value.updatedAt || post.value.date,
        author: {
          '@type': 'Person',
          name: post.value.author || 'Ali Arghyani'
        },
        publisher: {
          '@type': 'Person',
          name: 'Ali Arghyani'
        }
      })
    }
  ]
})
```


## RSS Feed Implementation

### Server Route Design

**Location**: `server/routes/blog/rss.xml.ts`

**Implementation**:

```typescript
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const locale = event.node.req.url?.includes('/fa/') ? 'fa' : 'en'
  
  // Fetch published posts
  const posts = await serverQueryContent(event, `${locale}/blog`)
    .where({ draft: { $ne: true } })
    .sort({ date: -1 })
    .limit(20)
    .find()
  
  // Generate RSS XML
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Ali Arghyani - Blog</title>
    <link>${config.public.siteUrl}/${locale}/blog</link>
    <description>Stories and notes from Ali Arghyani</description>
    <language>${locale}</language>
    <atom:link href="${config.public.siteUrl}/${locale}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts.map(post => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${config.public.siteUrl}${post._path}</link>
      <guid>${config.public.siteUrl}${post._path}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>
    `).join('')}
  </channel>
</rss>`
  
  event.node.res.setHeader('Content-Type', 'application/rss+xml')
  return rss
})

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case "'": return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}
```

## Error Handling

### 404 Handling

When a blog post is not found:

```typescript
// In [...slug].vue
const { data: post } = await useAsyncData(`blog-post-${slug}`, () =>
  queryContent(getBlogPath())
    .where({ _path: `/${getBlogPath()}/${slug.join('/')}` })
    .findOne()
)

if (!post.value) {
  throw createError({
    statusCode: 404,
    message: 'Blog post not found',
    fatal: true
  })
}
```

This will trigger the existing `app/error.vue` page.

### Content Parsing Errors

Nuxt Content will show errors in development mode with:
- File path
- Line number
- Error description

In production, malformed markdown files will be skipped.

### Missing Translations

When a post exists in one language but not another:

```typescript
// In blog listing
const { data: posts } = await useAsyncData('blog-posts', async () => {
  try {
    return await queryContent(getBlogPath())
      .where({ draft: { $ne: true } })
      .sort({ date: -1 })
      .find()
  } catch (error) {
    // Return empty array if content directory doesn't exist
    return []
  }
})
```

Display a message: "This post is not available in [language]. View in [other language]."

## Testing Strategy

### Manual Testing Checklist

**Content Creation**:
- [ ] Create markdown file with valid frontmatter
- [ ] Create markdown file with missing required fields
- [ ] Create draft post
- [ ] Create post with cover image
- [ ] Create post with code blocks
- [ ] Create post with MDC components

**Blog Listing**:
- [ ] View listing page in English
- [ ] View listing page in Persian
- [ ] Test search functionality
- [ ] Test tag filtering
- [ ] Test empty state (no posts)
- [ ] Test responsive layout (mobile, tablet, desktop)

**Blog Detail**:
- [ ] View post in English
- [ ] View post in Persian (RTL)
- [ ] Test table of contents navigation
- [ ] Test previous/next navigation
- [ ] Test code block copy functionality
- [ ] Test 404 for non-existent post
- [ ] Verify SEO meta tags in browser dev tools

**Performance**:
- [ ] Run Lighthouse audit
- [ ] Check image lazy loading
- [ ] Verify static generation
- [ ] Test hot-reload in development

**Accessibility**:
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast
- [ ] Focus indicators


## Performance Optimization

### Image Optimization

**Strategy**:
1. Use `NuxtImg` for all blog images
2. Generate responsive srcsets
3. Lazy load images below fold
4. Use modern formats (WebP, AVIF)

**Implementation**:

```vue
<!-- In markdown or components -->
<NuxtImg
  :src="post.image"
  :alt="post.title"
  width="1200"
  height="630"
  format="webp"
  loading="lazy"
  sizes="sm:100vw md:80vw lg:1200px"
/>
```

### Code Splitting

**Approach**:
- Blog components are auto-imported (lazy by default)
- Use `defineAsyncComponent` for heavy components like TOC
- Separate chunks for blog routes

**Example**:

```typescript
// In blog/index.vue
const BlogTableOfContents = defineAsyncComponent(
  () => import('~/components/blog/BlogTableOfContents.vue')
)
```

### Content Query Optimization

**Best Practices**:
1. Use `.only()` to fetch minimal fields for listings
2. Use `.without()` to exclude heavy fields like body
3. Cache queries with `useAsyncData`
4. Limit results with `.limit()`

**Example**:

```typescript
// Listing page - only fetch necessary fields
const { data: posts } = await useAsyncData('blog-posts', () =>
  queryContent(getBlogPath())
    .where({ draft: { $ne: true } })
    .sort({ date: -1 })
    .only(['title', 'description', 'date', 'tags', '_path', 'image'])
    .find()
)

// Detail page - fetch full content
const { data: post } = await useAsyncData(`blog-post-${slug}`, () =>
  queryContent(getBlogPath())
    .where({ _path: `/${getBlogPath()}/${slug}` })
    .findOne()
)
```

### Static Generation

**Configuration**:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: async () => {
        // Dynamically generate routes for all blog posts
        const { $content } = useNuxtApp()
        const enPosts = await $content('en/blog').only(['_path']).find()
        const faPosts = await $content('fa/blog').only(['_path']).find()
        
        return [
          '/blog',
          '/fa/blog',
          ...enPosts.map(p => p._path),
          ...faPosts.map(p => p._path)
        ]
      }
    }
  }
})
```

### Caching Strategy

**Route Rules**:
- Blog listing: SWR 1 hour
- Blog posts: SWR 1 hour
- RSS feed: SWR 1 hour

```typescript
routeRules: {
  '/blog': { swr: 3600 },
  '/fa/blog': { swr: 3600 },
  '/blog/**': { swr: 3600 },
  '/fa/blog/**': { swr: 3600 },
  '/blog/rss.xml': { swr: 3600 },
  '/fa/blog/rss.xml': { swr: 3600 }
}
```

## Internationalization Integration

### Locale-Based Content Fetching

**Pattern**:

```typescript
const { locale } = useI18n()
const { localePath } = useI18n()

// Fetch content for current locale
const posts = await queryContent(`${locale.value}/blog`).find()

// Generate localized links
const postLink = localePath(`/blog/${post.slug}`)
```

### Translation Keys

**New i18n keys to add**:

```json
{
  "blog": {
    "title": "Blog",
    "explore": "Stories & notes",
    "empty": "No posts yet. Check back soon!",
    "readMore": "Read article",
    "readingTime": "{minutes} min read",
    "publishedOn": "Published on",
    "updatedOn": "Updated on",
    "backToBlog": "Back to Blog",
    "previousPost": "Previous",
    "nextPost": "Next",
    "tableOfContents": "Table of Contents",
    "searchPlaceholder": "Search posts...",
    "filterByTag": "Filter by tag",
    "allPosts": "All posts",
    "noResults": "No posts found matching your search",
    "copyCode": "Copy code",
    "codeCopied": "Copied!",
    "subscribe": "Subscribe via RSS"
  }
}
```

### RTL Layout Adjustments

**CSS Strategy**:

```css
/* Automatic RTL with Tailwind */
.blog-content {
  @apply text-start; /* Uses start instead of left */
}

/* Force LTR for code */
.blog-content pre,
.blog-content code {
  direction: ltr;
  text-align: left;
}

/* RTL-aware spacing */
.blog-content ul,
.blog-content ol {
  @apply ps-6; /* padding-inline-start */
}
```

## Migration from Existing Blog Pages

### Current State

The existing blog pages (`app/pages/blog/index.vue` and `app/pages/blog/[...slug].vue`) have placeholder content indicating Nuxt Content is disabled.

### Migration Steps

1. **Backup existing files** (if needed)
2. **Replace page content** with new implementations
3. **Add i18n translations** for blog-specific keys
4. **Create sample blog posts** for testing
5. **Update navigation** to enable blog link in TopNav

### Backward Compatibility

No breaking changes expected since:
- Routes remain the same (`/blog`, `/fa/blog`)
- i18n structure is preserved
- Existing components are not affected


## MDC Component Examples

### Custom Components in Markdown

Nuxt Content's MDC syntax allows embedding Vue components in markdown.

**Example 1: Alert Component**

```markdown
::alert{type="info"}
This is an informational alert using MDC syntax.
::
```

**Example 2: Code Group**

```markdown
::code-group
```bash [npm]
npm install @nuxt/content
\```

```bash [pnpm]
pnpm add @nuxt/content
\```
::
```

**Example 3: Custom Blog Component**

```markdown
::blog-callout{title="Pro Tip"}
Use `queryContent()` with `.only()` to optimize performance.
::
```

**Component Implementation** (`app/components/content/BlogCallout.vue`):

```vue
<template>
  <UCard class="my-6 border-l-4 border-primary-500">
    <template #header>
      <h4 class="font-semibold">{{ title }}</h4>
    </template>
    <div class="prose prose-sm">
      <slot />
    </div>
  </UCard>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>
```

## Development Workflow

### Content Authoring Workflow

1. **Create markdown file** in `content/{locale}/blog/`
2. **Add frontmatter** with required fields
3. **Write content** using markdown and MDC syntax
4. **Preview in dev mode** (drafts visible)
5. **Test in both locales** if bilingual
6. **Set draft: false** when ready to publish
7. **Commit to git** (content is version controlled)

### Hot Reload Experience

Nuxt Content provides instant feedback:
- **Markdown changes**: Hot-reload without page refresh
- **Frontmatter changes**: Hot-reload
- **New files**: Detected automatically
- **Component changes**: Standard Nuxt HMR

### Debugging Tools

**1. Content API Endpoint**:
```
http://localhost:3000/api/_content/query
```

**2. Dev Tools**:
- Nuxt DevTools shows content queries
- Vue DevTools for component inspection

**3. Console Logging**:
```typescript
const posts = await queryContent('en/blog').find()
console.log('Fetched posts:', posts)
```

## Security Considerations

### Content Sanitization

Nuxt Content automatically sanitizes HTML in markdown to prevent XSS attacks.

**Safe by default**:
- User-provided markdown is parsed safely
- HTML tags are escaped unless explicitly allowed
- Script tags are stripped

### Draft Post Protection

```typescript
// Ensure drafts are hidden in production
const isDev = process.dev

const query = queryContent(getBlogPath())
  .where({ draft: { $ne: true } })

if (isDev) {
  // In dev, show all posts including drafts
  query.where({}) // Remove draft filter
}
```

### Image Security

- Use `@nuxt/image` for automatic optimization
- Validate image paths
- Use CDN for external images

## Deployment Considerations

### Build Process

1. **Install dependencies**: `pnpm install`
2. **Build application**: `pnpm build`
3. **Content parsing**: Nuxt Content parses all markdown during build
4. **Static generation**: Blog routes are prerendered
5. **Deploy**: Upload `.output` directory

### Environment Variables

```bash
# .env
NUXT_PUBLIC_SITE_URL=https://aliarghyani.vercel.app
NUXT_PUBLIC_SITE_NAME=Ali Arghyani
```

### Vercel Configuration

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".output/public",
  "framework": "nuxtjs"
}
```

### Content Updates

**Option 1: Git-based workflow**
- Commit markdown files to repository
- Trigger rebuild on push
- Vercel auto-deploys

**Option 2: CMS integration** (future enhancement)
- Use Nuxt Studio or other headless CMS
- Webhook triggers rebuild
- Content preview before publish

## Future Enhancements

### Phase 2 Features (Not in current scope)

1. **Comments System**
   - Integration with Giscus or Utterances
   - GitHub-based comments

2. **Related Posts**
   - Algorithm based on tags
   - Display at end of post

3. **Reading Progress Bar**
   - Scroll-based progress indicator
   - Sticky header with progress

4. **Social Sharing**
   - Share buttons for Twitter, LinkedIn
   - Copy link functionality

5. **Newsletter Subscription**
   - Email capture form
   - Integration with email service

6. **Blog Analytics**
   - View count tracking
   - Popular posts widget

7. **Content Series**
   - Multi-part article support
   - Series navigation

8. **Dark Mode Code Themes**
   - Multiple syntax highlighting themes
   - User preference storage

## Summary

This design provides a comprehensive, production-ready blog system that:

- ✅ Integrates seamlessly with existing Nuxt 4 portfolio
- ✅ Supports bilingual content (EN/FA) with RTL
- ✅ Uses Nuxt Content v3 best practices
- ✅ Optimizes for performance and SEO
- ✅ Maintains type safety with TypeScript
- ✅ Provides excellent developer experience
- ✅ Follows accessibility standards
- ✅ Scales for future enhancements

The implementation will be done incrementally following the task list in the next phase.
