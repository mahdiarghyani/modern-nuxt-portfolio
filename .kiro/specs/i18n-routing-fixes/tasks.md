# Implementation Plan

This implementation plan breaks down the i18n routing and hydration fixes into discrete, actionable coding tasks. Each task builds incrementally on previous work, with all code integrated and functional at each step.

## Task List

- [x] 1. Update i18n configuration to use prefix strategy


  - Change strategy from 'prefix_except_default' to 'prefix' in nuxt.config.ts
  - Update prerender routes to include /en prefix (/en/blog instead of /blog)
  - Update route rules to use /en prefix for caching
  - Verify configuration by checking generated routes in dev mode
  - _Requirements: 1.1, 1.2, 1.3, 4.1, 4.2, 4.3_

- [x] 2. Create redirect middleware for root path



  - Create middleware/redirect-root.global.ts file
  - Implement redirect from / to /en with 301 status code
  - Test redirect behavior in browser
  - _Requirements: 4.5_

- [x] 3. Fix Footer component hydration mismatch


  - Wrap NuxtImg with colorMode-dependent src in ClientOnly component
  - Add fallback template with default logo for SSR
  - Remove colorMode.unknown check (no longer needed)
  - Test in both light and dark modes
  - Verify no hydration warnings in console
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 5.1, 5.2_



- [ ] 4. Fix Language Switcher ARIA and routing issues
  - Remove 'sr-only' from :ui config in LanguageSwitcher.vue
  - Add proper aria-label using i18n translation key
  - Import and use switchLocalePath() composable
  - Update watch logic to use switchLocalePath() for route generation
  - Navigate to new path using router.push() before setLocale()
  - Change item labels from 'en'/'fa' to 'English'/'فارسی' for better UX
  - Test language switching on all pages (home, blog listing, blog post)
  - Verify no ARIA warnings in console


  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [ ] 5. Update TopNav component for new route structure
  - Verify all navigation links use localePath() helper
  - Update blog link to use localePath('/blog')


  - Update home navigation to use localePath('/')
  - Test navigation from all sections
  - _Requirements: 1.3, 4.4_

- [ ] 6. Verify blog components use localePath correctly
  - Check BlogCard.vue uses localePath for post links


  - Check BlogNavigation.vue uses localePath for prev/next links
  - Check blog/index.vue uses localePath for navigation
  - Check blog/[...slug].vue uses localePath for breadcrumbs and back link



  - Fix any hardcoded paths to use localePath()
  - _Requirements: 1.3, 1.4, 6.3_

- [ ] 7. Add i18n translation key for language selector
  - Add 'nav.languageSelector' key to i18n/locales/en.json
  - Add 'nav.languageSelector' key to i18n/locales/fa.json
  - _Requirements: 3.3_

- [ ] 8. Test and verify all fixes
  - Test root path redirect (/ → /en)
  - Test language switching on home page
  - Test language switching on blog listing page
  - Test language switching on blog post page
  - Test browser back/forward navigation
  - Verify no hydration warnings in console
  - Verify no Vue Router warnings in console
  - Verify no ARIA warnings in console
  - Test in both light and dark modes
  - Test keyboard navigation for language switcher
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

- [ ]* 9. Add fallback handling for missing translations
  - In blog/[...slug].vue, add logic to check if post exists in other locale
  - Display message when post is only available in other language
  - Provide link to switch to the language where post exists
  - Test with posts that exist in only one language
  - _Requirements: 1.5, 4.5_

- [ ]* 10. Update sitemap generation for new route structure
  - Update sitemap configuration to include /en prefix
  - Verify all routes are included in sitemap
  - Test sitemap generation in build
  - _Requirements: 4.6_
