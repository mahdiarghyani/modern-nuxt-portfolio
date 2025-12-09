# Requirements Document

## Introduction

This document specifies the requirements for implementing a fully-featured blog system in the Nuxt 4 portfolio application using Nuxt Content v3. The blog system will support bilingual content (English and Persian with RTL), markdown-based content management, SEO optimization, and seamless integration with the existing portfolio design system.

## Glossary

- **Blog System**: The complete blogging functionality including content management, rendering, listing, and navigation
- **Nuxt Content**: The official Nuxt module (@nuxt/content) for file-based content management with markdown support
- **Content Directory**: The file system location where markdown blog posts are stored (content/ folder)
- **Blog Post**: A single article written in markdown format with frontmatter metadata
- **Frontmatter**: YAML metadata at the top of markdown files containing post information (title, date, tags, etc.)
- **Blog Listing Page**: The main blog index page displaying all published posts
- **Blog Detail Page**: Individual post page rendering the full markdown content
- **Content Query**: Nuxt Content's API for fetching and filtering markdown content
- **MDC Syntax**: Markdown Components syntax for embedding Vue components in markdown
- **SEO Metadata**: Meta tags, Open Graph, and structured data for search engine optimization
- **Reading Time**: Calculated estimate of time required to read a blog post
- **Tag System**: Categorization mechanism using tags/labels for blog posts
- **Draft Mode**: Unpublished posts that are hidden from production but visible in development

## Requirements

### Requirement 1: Nuxt Content Module Integration

**User Story:** As a developer, I want to integrate Nuxt Content v3 into the existing Nuxt 4 application, so that I can manage blog content using markdown files.

#### Acceptance Criteria

1. WHEN the developer installs the @nuxt/content package, THE Blog System SHALL use version 3.x compatible with Nuxt 4
2. WHEN the nuxt.config.ts is updated, THE Blog System SHALL register @nuxt/content in the modules array before other content-dependent modules
3. THE Blog System SHALL create a content/ directory in the project root for storing markdown files
4. THE Blog System SHALL configure Nuxt Content with Shiki syntax highlighter for code blocks
5. THE Blog System SHALL enable markdown.mdc option to support Vue component embedding in markdown
6. WHEN the development server starts, THE Blog System SHALL successfully load and parse all markdown files with hot-reload support

### Requirement 2: Content Directory Structure

**User Story:** As a content creator, I want a well-organized content directory structure, so that I can easily manage bilingual blog posts.

#### Acceptance Criteria

1. THE Blog System SHALL create locale-based subdirectories (content/en/blog/ and content/fa/blog/)
2. WHEN queryContent() is called with a locale parameter, THE Blog System SHALL fetch content from the corresponding locale directory
3. THE Blog System SHALL support nested directories within blog folders for content organization (e.g., content/en/blog/tutorials/)
4. THE Blog System SHALL recognize markdown files with .md extension as valid blog posts
5. WHERE a blog post exists in one language but not another, THE Blog System SHALL display a fallback message with a link to the available language version
6. THE Blog System SHALL use the file name (slug) as the URL path segment for blog posts

### Requirement 3: Blog Post Frontmatter Schema

**User Story:** As a content creator, I want a standardized frontmatter schema for blog posts, so that all posts have consistent metadata.

#### Acceptance Criteria

1. THE Blog System SHALL require the following frontmatter fields: title, description, date, and tags
2. THE Blog System SHALL support optional frontmatter fields: image, author, draft, updatedAt, and head (for custom SEO)
3. THE Blog System SHALL define a TypeScript interface extending ParsedContent for type-safe frontmatter access
4. THE Blog System SHALL parse date field as ISO 8601 date string (YYYY-MM-DD or full ISO format)
5. THE Blog System SHALL accept tags as an array of strings for categorization
6. WHERE draft is set to true, THE Blog System SHALL exclude the post from queryContent results in production using where({ draft: { $ne: true } })
7. THE Blog System SHALL use the image field for Open Graph and Twitter Card meta tags

### Requirement 4: Blog Listing Page Implementation

**User Story:** As a visitor, I want to see a list of all published blog posts, so that I can browse available content.

#### Acceptance Criteria

1. WHEN a visitor navigates to /blog or /fa/blog, THE Blog System SHALL use queryContent() to fetch all published posts for the current locale path
2. THE Blog System SHALL sort blog posts by date field in descending order using .sort({ date: -1 })
3. THE Blog System SHALL display post title, description, formatted date, reading time estimate, and tags for each post card
4. WHEN a visitor clicks on a blog post card, THE Blog System SHALL navigate to the localized post detail page using the _path property
5. WHERE no published posts exist for a locale, THE Blog System SHALL display an empty state message with i18n translation
6. THE Blog System SHALL filter out draft posts using .where({ draft: { $ne: true } }) in production environment
7. THE Blog System SHALL calculate reading time from the body.children word count assuming 200 words per minute
8. THE Blog System SHALL use .only() to fetch only required fields (title, description, date, tags, _path, image) for performance

### Requirement 5: Blog Detail Page Implementation

**User Story:** As a visitor, I want to read the full content of a blog post, so that I can consume the article.

#### Acceptance Criteria

1. WHEN a visitor navigates to /blog/[slug] or /fa/blog/[slug], THE Blog System SHALL use ContentDoc component or queryContent().where({ _path: path }).findOne() to fetch the post
2. THE Blog System SHALL render markdown using ContentRenderer component with GitHub Flavored Markdown support
3. THE Blog System SHALL apply Shiki syntax highlighting to code blocks with theme matching the site's color mode
4. THE Blog System SHALL render post metadata (title, formatted date, reading time, tags) in a header section using Nuxt UI components
5. WHERE the requested slug does not exist, THE Blog System SHALL throw a 404 error using createError({ statusCode: 404 })
6. THE Blog System SHALL support MDC syntax (::component-name) for embedding Vue components within markdown
7. THE Blog System SHALL apply Prose components styling from Nuxt UI for consistent typography (ProseH1, ProseP, ProseCode, etc.)
8. THE Blog System SHALL auto-generate anchor links for all headings for easy section sharing

### Requirement 6: SEO and Meta Tags

**User Story:** As a content creator, I want proper SEO metadata for blog posts, so that they rank well in search engines.

#### Acceptance Criteria

1. THE Blog System SHALL use useContentHead() composable to auto-generate meta tags from frontmatter
2. THE Blog System SHALL use useSeoMeta() to set title in format "[Post Title] | Blog | [Site Name]"
3. THE Blog System SHALL generate Open Graph tags (og:title, og:description, og:image, og:type, og:url) from post frontmatter
4. WHERE an image field is specified in frontmatter, THE Blog System SHALL use it for og:image and twitter:image, otherwise use a default blog cover image
5. THE Blog System SHALL set og:type to "article" and include article:published_time and article:tag properties
6. THE Blog System SHALL generate Twitter Card meta tags with card type "summary_large_image"
7. THE Blog System SHALL allow custom head overrides via the head field in frontmatter for advanced SEO control
8. THE Blog System SHALL generate JSON-LD structured data for BlogPosting schema including author, datePublished, and headline

### Requirement 7: Tag Filtering System

**User Story:** As a visitor, I want to filter blog posts by tags, so that I can find content on specific topics.

#### Acceptance Criteria

1. THE Blog System SHALL extract all unique tags from published posts using a computed property that aggregates tags arrays
2. WHEN a visitor clicks on a tag, THE Blog System SHALL filter posts using queryContent().where({ tags: { $contains: selectedTag } })
3. THE Blog System SHALL update the URL query parameter (?tag=value) using useRoute() and navigateTo() when a tag is selected
4. WHEN a visitor clears the tag filter, THE Blog System SHALL remove the query parameter and display all posts
5. THE Blog System SHALL highlight the active tag using Nuxt UI's UBadge or UButton component with active state styling
6. THE Blog System SHALL read the tag query parameter on page load to maintain filter state on navigation or refresh

### Requirement 8: Responsive Design and Accessibility

**User Story:** As a visitor using any device, I want the blog to be fully responsive and accessible, so that I can read content comfortably.

#### Acceptance Criteria

1. THE Blog System SHALL render blog listing and detail pages responsively across mobile, tablet, and desktop viewports
2. THE Blog System SHALL maintain readability with appropriate font sizes and line heights for body text
3. THE Blog System SHALL ensure sufficient color contrast ratios for text and backgrounds (WCAG AA compliance)
4. THE Blog System SHALL support keyboard navigation for all interactive elements
5. THE Blog System SHALL provide appropriate ARIA labels and semantic HTML for screen readers
6. WHERE images are used in blog posts, THE Blog System SHALL require alt text for accessibility

### Requirement 9: RTL Support for Persian Content

**User Story:** As a Persian-speaking visitor, I want blog content to display correctly in RTL layout, so that I can read naturally.

#### Acceptance Criteria

1. WHEN a visitor views Persian blog content, THE Blog System SHALL apply RTL text direction to all content
2. THE Blog System SHALL mirror layout elements appropriately for RTL (navigation, spacing, alignment)
3. THE Blog System SHALL maintain LTR direction for code blocks and technical content within RTL posts
4. THE Blog System SHALL handle mixed LTR/RTL content gracefully (e.g., English words in Persian text)
5. THE Blog System SHALL apply RTL-appropriate typography and spacing rules

### Requirement 10: Performance Optimization

**User Story:** As a visitor, I want blog pages to load quickly, so that I have a smooth browsing experience.

#### Acceptance Criteria

1. THE Blog System SHALL use NuxtImg component for all images in markdown to enable automatic optimization
2. THE Blog System SHALL configure @nuxt/image to generate responsive srcsets and modern formats (webp, avif)
3. THE Blog System SHALL use .only() and .without() query modifiers to fetch minimal data for listing pages
4. THE Blog System SHALL leverage Nuxt Content's built-in caching for content queries in production
5. THE Blog System SHALL prerender all blog routes during build using nitro.prerender.routes configuration
6. THE Blog System SHALL lazy-load blog components using defineAsyncComponent where appropriate
7. THE Blog System SHALL achieve a Lighthouse performance score of 90+ for blog pages

### Requirement 11: Development Experience

**User Story:** As a developer, I want a smooth development experience when working with blog content, so that I can iterate quickly.

#### Acceptance Criteria

1. WHEN a markdown file is modified, THE Blog System SHALL use Nuxt Content's HMR to hot-reload content without full page refresh
2. THE Blog System SHALL include draft posts in queryContent results during development (process.dev check)
3. WHERE a markdown parsing error occurs, THE Blog System SHALL display the error overlay with file path and line number
4. THE Blog System SHALL define TypeScript interfaces for BlogPost extending ParsedContent for type-safe queries
5. THE Blog System SHALL use Nuxt Content's built-in content:list server endpoint for debugging available content
6. THE Blog System SHALL provide helpful console warnings when required frontmatter fields are missing

### Requirement 12: Table of Contents

**User Story:** As a visitor reading a long blog post, I want to see a table of contents, so that I can quickly navigate to specific sections.

#### Acceptance Criteria

1. THE Blog System SHALL extract table of contents from the body.toc property provided by Nuxt Content
2. WHERE a blog post has 3 or more headings, THE Blog System SHALL display a table of contents sidebar on desktop viewports
3. THE Blog System SHALL render TOC links using the heading id and text from body.toc.links array
4. WHEN a visitor clicks a TOC link, THE Blog System SHALL smooth-scroll to the corresponding heading
5. THE Blog System SHALL highlight the active section in TOC based on scroll position using IntersectionObserver
6. THE Blog System SHALL hide the TOC on mobile viewports and show it as a collapsible section instead
7. THE Blog System SHALL support nested heading levels (h2, h3) in the TOC structure

### Requirement 13: Search Functionality

**User Story:** As a visitor, I want to search through blog posts, so that I can quickly find content on specific topics.

#### Acceptance Criteria

1. THE Blog System SHALL provide a search input field on the blog listing page using UInput component
2. WHEN a visitor types in the search field, THE Blog System SHALL filter posts using queryContent().where({ $or: [{ title: { $icontains: query } }, { description: { $icontains: query } }] })
3. THE Blog System SHALL debounce search input by 300ms to avoid excessive queries
4. THE Blog System SHALL display search results count and clear button when search is active
5. THE Blog System SHALL highlight search terms in the results using text highlighting
6. WHERE no results match the search query, THE Blog System SHALL display a "No posts found" message with suggestions
7. THE Blog System SHALL combine search with tag filtering when both are active

### Requirement 14: RSS Feed Generation

**User Story:** As a visitor, I want to subscribe to the blog via RSS, so that I can receive updates on new posts.

#### Acceptance Criteria

1. THE Blog System SHALL generate an RSS feed at /blog/rss.xml for English posts
2. THE Blog System SHALL generate an RSS feed at /fa/blog/rss.xml for Persian posts
3. THE Blog System SHALL use a Nitro server route to dynamically generate RSS XML from queryContent results
4. THE Blog System SHALL include post title, description, link, pubDate, and guid in each RSS item
5. THE Blog System SHALL set proper Content-Type header (application/rss+xml) for RSS endpoints
6. THE Blog System SHALL include channel metadata (title, description, link, language) in the RSS feed
7. THE Blog System SHALL add a link to the RSS feed in the blog listing page header for discoverability

### Requirement 15: Code Block Enhancements

**User Story:** As a visitor reading technical blog posts, I want enhanced code blocks with copy functionality, so that I can easily use code examples.

#### Acceptance Criteria

1. THE Blog System SHALL display a "Copy" button on all code blocks using a custom ProseCode component
2. WHEN a visitor clicks the copy button, THE Blog System SHALL copy the code to clipboard and show a success feedback
3. THE Blog System SHALL display the programming language label on code blocks when specified in markdown
4. THE Blog System SHALL support line highlighting using Nuxt Content's code highlighting syntax (```js{1,3-5})
5. THE Blog System SHALL apply syntax highlighting theme that matches the current color mode (light/dark)
6. THE Blog System SHALL support filename display for code blocks using custom metadata (```js [filename.js])

### Requirement 16: Navigation and Breadcrumbs

**User Story:** As a visitor, I want clear navigation between blog pages, so that I can easily move around the blog section.

#### Acceptance Criteria

1. THE Blog System SHALL display breadcrumb navigation using UBreadcrumb component on blog detail pages showing Home > Blog > [Post Title]
2. THE Blog System SHALL provide a "Back to Blog" link using localePath() to maintain locale context
3. THE Blog System SHALL use useRoute() to detect blog routes and highlight the blog section in TopNav component
4. WHERE previous/next posts exist chronologically, THE Blog System SHALL query adjacent posts using .sort() and .limit() and display navigation links
5. THE Blog System SHALL use localePath() helper from @nuxtjs/i18n for all blog navigation links to maintain locale context
6. THE Blog System SHALL implement keyboard navigation (arrow keys) for previous/next post navigation
