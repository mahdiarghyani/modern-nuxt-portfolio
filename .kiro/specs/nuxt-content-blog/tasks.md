# Implementation Plan

This implementation plan breaks down the blog system development into discrete, actionable coding tasks. Each task builds incrementally on previous work, with all code integrated and functional at each step.

## Task List

- [x] 1. Install and configure Nuxt Content module






  - Install @nuxt/content package via pnpm
  - Add @nuxt/content to modules array in nuxt.config.ts (before other modules)
  - Configure content options: highlight themes (github-light/github-dark), markdown.mdc: true, toc depth
  - Add content-specific route rules for caching (/blog, /fa/blog with swr: 3600)
  - Verify installation by starting dev server and checking for content module initialization
  - _Requirements: 1.1, 1.2, 1.5, 1.6_




- [x] 2. Create content directory structure and sample posts
  - Create content/en/blog/ and content/fa/blog/ directories
  - Create TypeScript interface for BlogPost extending ParsedContent in app/types/blog.ts
  - Write 2 sample English blog posts with complete frontmatter (title, description, date, tags, image)
  - Write 2 sample Persian blog posts with RTL content
  - Include code blocks, headings, lists, and images in sample posts for testing
  - Create one draft post to test draft filtering
  - _Requirements: 2.1, 2.3, 2.4, 3.1, 3.2, 3.5, 3.6_

- [x] 3. Implement useBlog composable with utility functions
  - Create app/composables/useBlog.ts file
  - Implement calculateReadingTime function (200 words/min from body.children)
  - Implement formatDate function using Intl.DateTimeFormat with locale support
  - Implement extractUniqueTags function to aggregate tags from posts array
  - Implement getBlogPath function returning locale-aware path
  - Implement filterPostsBySearch function for title/description/tags filtering
  - Implement filterPostsByTag function
  - Export all functions with proper TypeScript types
  - _Requirements: 4.7, 11.6_

- [x] 4. Update i18n translation files with blog keys


  - Add blog section to i18n/locales/en.json with all required keys (title, explore, empty, readMore, readingTime, publishedOn, backToBlog, previousPost, nextPost, tableOfContents, searchPlaceholder, filterByTag, allPosts, noResults, copyCode, codeCopied, subscribe)
  - Add corresponding Persian translations to i18n/locales/fa.json
  - Verify translations are loaded by checking in dev tools
  - _Requirements: 4.5, 8.1_

- [x] 5. Implement blog listing page





- [x] 5.1 Update app/pages/blog/index.vue with content fetching


  - Replace placeholder content with queryContent implementation
  - Use useAsyncData to fetch posts for current locale with .where({ draft: { $ne: true } })
  - Apply .sort({ date: -1 }) and .only() for required fields
  - Implement computed property for extracting unique tags using useBlog composable
  - Add reactive refs for searchQuery and selectedTag
  - Implement computed filteredPosts using filterPostsBySearch and filterPostsByTag
  - _Requirements: 4.1, 4.2, 4.6, 4.8, 7.1_

- [x] 5.2 Create BlogCard component


  - Create app/components/blog/BlogCard.vue
  - Accept post prop with BlogPost type
  - Use UCard as base component with hover effects
  - Display NuxtImg for cover image with lazy loading and fallback
  - Display title, description, formatted date, reading time, and tags
  - Use UBadge for tags display
  - Use localePath for navigation link
  - Apply responsive styling
  - _Requirements: 4.3, 10.1, 10.2_

- [x] 5.3 Create BlogSearch component


  - Create app/components/blog/BlogSearch.vue
  - Accept modelValue prop and emit update:modelValue
  - Use UInput with search icon and clear button
  - Implement debounce using useDebounceFn from VueUse (300ms)
  - Add i18n placeholder text
  - _Requirements: 13.2, 13.3_

- [x] 5.4 Create BlogTagFilter component


  - Create app/components/blog/BlogTagFilter.vue
  - Accept tags array and modelValue props
  - Display tags as UButton or UBadge with click handlers
  - Highlight active tag with primary color
  - Add "All posts" option to clear filter
  - Update URL query parameter using useRoute and navigateTo
  - Read query parameter on mount to restore filter state
  - Apply horizontal scroll on mobile
  - _Requirements: 7.2, 7.3, 7.4, 7.5, 7.6_

- [x] 5.5 Create BlogEmpty component and integrate all components


  - Create app/components/blog/BlogEmpty.vue with empty state message
  - Import and use BlogSearch, BlogTagFilter, BlogCard, BlogEmpty in index.vue
  - Implement grid layout for blog cards (responsive: 1 col mobile, 2 col tablet, 3 col desktop)
  - Add page header with title and description using i18n
  - Test search, filter, and empty state scenarios
  - _Requirements: 4.4, 4.5, 13.4, 13.6_


- [x] 6. Implement blog detail page





- [x] 6.1 Update app/pages/blog/[...slug].vue with content fetching


  - Replace placeholder content with queryContent().findOne() implementation
  - Use useAsyncData with slug-based key
  - Fetch post using _path matching for current locale
  - Throw createError({ statusCode: 404 }) if post not found
  - Fetch adjacent posts for prev/next navigation using separate query
  - Calculate current post index in sorted posts array
  - _Requirements: 5.1, 5.5, 16.4_

- [x] 6.2 Implement SEO meta tags and structured data


  - Use useContentHead(post) for automatic meta generation
  - Use useSeoMeta for custom title, og tags, twitter cards
  - Set og:type to "article" with article:published_time and article:tag
  - Use post.image or default cover image for og:image
  - Add JSON-LD structured data using useHead with BlogPosting schema
  - Include author, datePublished, headline in structured data
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.8_



- [x] 6.3 Create BlogPost metadata component




  - Create app/components/blog/BlogPost.vue
  - Accept post prop with BlogPost type
  - Display post title as h1
  - Display formatted date using formatDate from useBlog
  - Display reading time using calculateReadingTime from useBlog
  - Display author if available
  - Display tags as UBadge components
  - Display cover image using NuxtImg if available
  - Use semantic HTML (article, header, time elements)


  - _Requirements: 5.4_

- [x] 6.4 Implement ContentRenderer with Prose styling





  - Use ContentRenderer component to render post.body
  - Wrap in article element with proper semantic structure
  - Apply dir attribute based on locale (rtl for fa, ltr for en)
  - Add CSS to force LTR for code blocks in RTL context


  - Verify Shiki syntax highlighting is working
  - Test with sample posts containing various markdown elements
  - _Requirements: 5.2, 5.3, 5.7, 9.1, 9.2, 9.3_

- [x] 6.5 Create BlogTableOfContents component


  - Create app/components/blog/BlogTableOfContents.vue
  - Accept toc prop from post.body.toc
  - Render nested heading structure from toc.links
  - Implement smooth scroll to heading on link click
  - Use IntersectionObserver to track active section


  - Highlight active section in TOC
  - Make sticky on desktop (position: sticky)
  - Make collapsible using UAccordion on mobile
  - Only show if post has 3+ headings
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7_

- [x] 6.6 Create BlogNavigation component


  - Create app/components/blog/BlogNavigation.vue
  - Accept prev and next props (BlogPost | null)


  - Display previous post link with title and arrow icon
  - Display next post link with title and arrow icon
  - Use UButton with icon slots
  - Use localePath for navigation links
  - Implement keyboard navigation (@keydown for arrow keys)
  - Apply flexbox layout with space-between
  - _Requirements: 16.4, 16.5, 16.6_

- [x] 6.7 Create breadcrumb navigation and integrate all components


  - Use UBreadcrumb component with links array (Home > Blog > Post Title)
  - Use localePath for breadcrumb links
  - Import and use BlogPost, ContentRenderer, BlogTableOfContents, BlogNavigation
  - Add "Back to Blog" link using localePath
  - Implement responsive layout (TOC sidebar on desktop, inline on mobile)
  - Test with both English and Persian posts
  - Test prev/next navigation
  - _Requirements: 16.1, 16.2, 16.3, 16.5_

- [x] 7. Implement custom Prose components
- [x] 7.1 Create ProseCode component with copy functionality
  - Create app/components/content/ProseCode.vue
  - Accept code, language, filename, highlights props
  - Display language label if provided
  - Display filename if provided
  - Add copy button with icon
  - Implement copy to clipboard using navigator.clipboard API
  - Show success feedback (icon change or toast)
  - Apply syntax highlighting theme based on color mode
  - Support line highlighting from highlights prop
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

- [x] 7.2 Create custom MDC components
  - Create app/components/content/BlogCallout.vue for callout boxes
  - Accept title and type props (info, warning, success, error)
  - Use UCard with colored border based on type
  - Create app/components/content/Alert.vue for inline alerts
  - Test MDC syntax in sample blog posts (::blog-callout, ::alert)
  - _Requirements: 5.6_

- [x] 7.3 Customize Prose component styles
  - Update app.config.ts with prose customization
  - Define styles for ProseH1, ProseH2, ProseH3, ProseH4 (font sizes, spacing, colors)
  - Define styles for ProseP (line height, spacing, colors)
  - Define styles for ProseCode inline code (background, padding, border-radius)
  - Define styles for ProseA links (color, hover effects)
  - Define styles for ProseImg (responsive, rounded corners)
  - Define styles for lists, blockquotes
  - Test with sample posts to verify styling
  - _Requirements: 5.7, 8.2_

- [x] 8. Implement RSS feed generation
  - Create server/routes/blog/rss.xml.ts server route
  - Create server/routes/fa/blog/rss.xml.ts for Persian locale
  - Use serverQueryContent to fetch published posts for current locale
  - Generate RSS 2.0 XML with channel metadata
  - Include item elements for each post (title, link, guid, pubDate, description)
  - Implement escapeXml helper function for XML safety
  - Set Content-Type header to application/rss+xml
  - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

- [x] 9. Configure prerendering and route rules
  - Update nitro.prerender.routes in nuxt.config.ts to include /blog and /fa/blog
  - Add hooks to dynamically generate routes for all blog posts
  - Verify route rules for caching are applied (/blog/**, /fa/blog/** with swr: 3600)
  - _Requirements: 10.5_

- [x] 10. Add blog link to navigation
  - Update app/components/common/TopNav.vue to include blog link
  - Use localePath('/blog') for navigation
  - Highlight blog link when on blog routes using useRoute()
  - Add blog icon (i-twemoji-memo)
  - Test navigation in both locales
  - _Requirements: 16.3_

- [x] 11. Create default blog cover image
  - Create public/img/blog/ directory for blog images
  - Add .gitkeep file with instructions
  - Use /img/blog/default-cover.jpg as fallback in posts
  - _Requirements: 6.4_

- [ ]* 12. Performance optimization and testing
  - Run Lighthouse audit on blog listing and detail pages
  - Verify lazy loading of images below fold
  - Check code splitting in network tab (separate chunks for blog components)
  - Verify static generation of all routes
  - Test hot-reload in development mode
  - Measure and optimize Time to First Byte (TTFB)
  - Verify Core Web Vitals (LCP, FID, CLS)
  - _Requirements: 10.3, 10.4, 10.6, 10.7, 11.1_

- [ ]* 13. Accessibility testing and improvements
  - Test keyboard navigation (Tab, Enter, arrow keys)
  - Test with screen reader (NVDA or VoiceOver)
  - Verify color contrast ratios using browser dev tools
  - Ensure all interactive elements have focus indicators
  - Add ARIA labels where needed
  - Verify semantic HTML structure
  - Test with reduced motion preference
  - _Requirements: 8.3, 8.4, 8.5, 8.6_

- [ ]* 14. Cross-browser and responsive testing
  - Test on Chrome, Firefox, Safari, Edge
  - Test on mobile devices (iOS Safari, Chrome Android)
  - Test on tablet viewports
  - Verify RTL layout on Persian pages
  - Test search and filter functionality on all devices
  - Verify image optimization and lazy loading
  - Test code block copy functionality
  - _Requirements: 8.1, 9.1, 9.2, 9.4_

- [x] 15. Documentation and sample content
  - Create README.md in content/ directory with authoring guidelines
  - Document frontmatter schema and required fields
  - Provide markdown examples for common elements
  - Document MDC component usage (BlogCallout, Alert)
  - Include best practices and publishing workflow
  - _Requirements: 11.3, 11.4_

