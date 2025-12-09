# i18n Routing Fixes Design Document

## Overview

This document outlines the technical design for fixing i18n routing and hydration issues in the Nuxt 4 portfolio application. The issues include Vue Router warnings during language switching, hydration mismatches in the Footer component, and accessibility warnings in the language switcher.

### Current Issues

1. **Vue Router Warnings**: When switching languages, Vue Router cannot find blog post routes with language prefixes
2. **Hydration Mismatch**: Footer component causes hydration errors due to colorMode access during SSR
3. **ARIA Warning**: Language switcher has aria-hidden on focusable elements
4. **Route Resolution**: Blog routes with `/en/` or `/fa/` prefixes are not properly resolved

### Design Goals

1. **Fix Route Resolution**: Ensure all blog routes work correctly with language prefixes
2. **Eliminate Hydration Errors**: Make Footer component SSR-safe
3. **Improve Accessibility**: Fix ARIA warnings in language switcher
4. **Maintain User Experience**: Keep smooth language switching without breaking functionality

## Architecture

### Current i18n Configuration

```typescript
// nuxt.config.ts
i18n: {
  defaultLocale: 'en',
  strategy: 'prefix_except_default',  // ← This is the issue!
  locales: [
    { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
    { code: 'fa', language: 'fa-IR', name: 'فارسی', dir: 'rtl', file: 'fa.json' },
  ],
  // ...
}
```

**Problem**: The `prefix_except_default` strategy means:
- English routes: `/blog/post-slug` (no prefix)
- Persian routes: `/fa/blog/post-slug` (with prefix)

This causes issues because:
1. Content is organized as `content/en/blog/` and `content/fa/blog/`
2. When switching languages, the router looks for `/en/blog/` routes that don't exist
3. Blog navigation uses `localePath()` which generates inconsistent paths

### Root Cause Analysis

#### Issue 1: Route Strategy Mismatch

**Current Behavior**:
- Content structure: `content/{locale}/blog/`
- Route strategy: `prefix_except_default` (English has no prefix)
- Blog queries: `queryContent('${locale}/blog')`

**Problem**: When on `/blog/post` (English) and switching to Persian, the app tries to navigate to `/fa/blog/post`, but the content query still uses the old locale path.

**Solution**: Change strategy to `prefix` so all routes have locale prefixes consistently.

#### Issue 2: Hydration Mismatch in Footer

**Current Code**:
```vue
<script setup lang="ts">
const colorMode = useColorMode()

const logoSrc = computed(() => {
  if (colorMode.unknown) {
    return '/favicon/android-chrome-192x192.png'
  }
  return colorMode.value === 'dark'
    ? '/favicon/android-chrome-192x192-dark.png'
    : '/favicon/android-chrome-192x192.png'
})
</script>
```

**Problem**: 
- Server renders with `colorMode.unknown = true` (default)
- Client hydrates with actual colorMode from localStorage
- HTML mismatch causes hydration error

**Solution**: Use `ClientOnly` for colorMode-dependent content or defer rendering until mounted.

#### Issue 3: ARIA Warning in Language Switcher

**Current Code**:
```vue
<template>
  <USelect 
    v-model="model" 
    :items="items"
    aria-label="Language selector"
    :ui="{ value: 'sr-only' }"
  >
    <!-- ... -->
  </USelect>
</template>
```

**Problem**: The `sr-only` class likely adds `aria-hidden="true"` to focusable elements, which is invalid.

**Solution**: Remove `sr-only` from focusable elements and use proper ARIA labels instead.

## Components and Interfaces

### 1. i18n Configuration Update

**File**: `nuxt.config.ts`

**Changes**:
```typescript
i18n: {
  defaultLocale: 'en',
  strategy: 'prefix',  // ← Change from 'prefix_except_default'
  locales: [
    { code: 'en', language: 'en-US', name: 'English', dir: 'ltr', file: 'en.json' },
    { code: 'fa', language: 'fa-IR', name: 'فارسی', dir: 'rtl', file: 'fa.json' },
  ],
  langDir: 'locales',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    alwaysRedirect: false,
    redirectOn: 'root'
  },
  vueI18n: '~/i18n.config.ts'
}
```

**Impact**:
- All routes will have locale prefix: `/en/`, `/fa/`
- Root `/` will redirect to `/en/` (default locale)
- Consistent URL structure across all pages
- Blog routes: `/en/blog/post` and `/fa/blog/post`

**Migration Notes**:
- Update all internal links to use `localePath()`
- Update sitemap generation
- Update prerender routes
- Test all navigation flows

### 2. Footer Component Fix

**File**: `app/components/common/FooterCopyright.vue`

**Current Implementation**:
```vue
<template>
  <footer class="py-10">
    <UContainer>
      <div class="flex flex-col items-center gap-4">
        <NuxtImg :src="logoSrc" alt="Ali Arghyani logo" />
        <!-- ... -->
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const logoSrc = computed(() => {
  if (colorMode.unknown) {
    return '/favicon/android-chrome-192x192.png'
  }
  return colorMode.value === 'dark'
    ? '/favicon/android-chrome-192x192-dark.png'
    : '/favicon/android-chrome-192x192.png'
})
</script>
```

**Solution 1: Use ClientOnly (Recommended)**:
```vue
<template>
  <footer class="py-10">
    <UContainer>
      <div class="flex flex-col items-center gap-4">
        <ClientOnly>
          <NuxtImg :src="logoSrc" alt="Ali Arghyani logo" />
          <template #fallback>
            <NuxtImg src="/favicon/android-chrome-192x192.png" alt="Ali Arghyani logo" />
          </template>
        </ClientOnly>
        <!-- ... -->
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const logoSrc = computed(() => {
  return colorMode.value === 'dark'
    ? '/favicon/android-chrome-192x192-dark.png'
    : '/favicon/android-chrome-192x192.png'
})
</script>
```

**Solution 2: Use onMounted (Alternative)**:
```vue
<template>
  <footer class="py-10">
    <UContainer>
      <div class="flex flex-col items-center gap-4">
        <NuxtImg :src="logoSrc" alt="Ali Arghyani logo" />
        <!-- ... -->
      </div>
    </UContainer>
  </footer>
</template>

<script setup lang="ts">
const colorMode = useColorMode()
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true
})

const logoSrc = computed(() => {
  if (!isMounted.value) {
    return '/favicon/android-chrome-192x192.png'
  }
  return colorMode.value === 'dark'
    ? '/favicon/android-chrome-192x192-dark.png'
    : '/favicon/android-chrome-192x192.png'
})
</script>
```

**Recommendation**: Use Solution 1 (ClientOnly) as it's more explicit and follows Nuxt best practices.

### 3. Language Switcher Fix

**File**: `app/components/LanguageSwitcher.vue`

**Current Issues**:
1. `sr-only` class on value might cause ARIA conflicts
2. No proper route switching logic
3. Missing proper ARIA announcements

**Updated Implementation**:
```vue
<template>
  <ClientOnly>
    <USelect 
      v-model="model" 
      :items="items" 
      value-key="value" 
      size="sm" 
      color="primary" 
      variant="soft"
      :highlight="false" 
      arrow 
      :trailing="true" 
      placeholder="Language"
      class="px-1 w-[64px] sm:w-[76px] rounded-full ring-1 ring-gray-200/70 dark:ring-gray-700/60 backdrop-blur-md shadow-sm h-[25px]"
      :ui="{
        base: 'rounded-full',
        trailingIcon: 'text-dimmed group-data-[state=open]:rotate-180 transition-transform duration-200',
        content: 'min-w-fit'
      }" 
      :aria-label="t('nav.languageSelector')"
    >
      <template #leading>
        <UIcon :name="selectedIcon" class="text-[16px]" />
      </template>
      <template #item-leading="{ item }">
        <UIcon :name="item.icon" class="text-[16px]" />
      </template>
      <template #item-label="{ item }">
        <span>{{ item.label }}</span>
      </template>
    </USelect>
  </ClientOnly>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const { t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const router = useRouter()

type LangValue = 'en' | 'fa'
type Item = { label: string; value: LangValue; icon: string }

const items = ref<Item[]>([
  { label: 'English', value: 'en', icon: 'i-twemoji-flag-united-states' },
  { label: 'فارسی', value: 'fa', icon: 'i-twemoji-flag-iran' }
])

const model = ref<LangValue>(locale.value as LangValue)

// Keep model in sync if locale changes elsewhere
watch(locale, (val) => {
  if ((val as LangValue) !== model.value) {
    model.value = val as LangValue
  }
})

const selectedIcon = computed<string>(() => 
  items.value.find(i => i.value === model.value)?.icon ?? 'i-twemoji-flag-united-states'
)

const { startLocaleSwitching } = useLocaleSwitching()
const loading = useLoadingIndicator()

// On selection change, navigate to the equivalent page in the new locale
watch(model, async (val, oldVal) => {
  if (val === oldVal) return
  
  startLocaleSwitching(600)
  if (loading) {
    loading.start()
  }
  
  // Get the path for the new locale
  const newPath = switchLocalePath(val)
  
  // Navigate to the new path
  await router.push(newPath)
  
  // Update locale
  await setLocale(val)
  
  if (loading) {
    setTimeout(() => loading.finish(), 600)
  }
})
</script>
```

**Key Changes**:
1. Removed `sr-only` from UI config
2. Use `switchLocalePath()` to get the correct route for the new locale
3. Navigate using `router.push()` before setting locale
4. Added proper ARIA label using i18n
5. Changed item labels to full language names for better UX

### 4. Blog Navigation Updates

**Files to Update**:
- `app/pages/blog/index.vue`
- `app/pages/blog/[...slug].vue`
- `app/components/blog/BlogCard.vue`
- `app/components/blog/BlogNavigation.vue`

**Pattern to Follow**:
```vue
<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()

// Fetch posts for current locale
const { data: posts } = await useAsyncData('blog-posts', () => 
  queryContent(`${locale.value}/blog`)
    .where({ draft: { $ne: true } })
    .sort({ date: -1 })
    .find()
)

// Generate localized link
const postLink = computed(() => localePath(`/blog/${post.value._path.split('/').pop()}`))
</script>
```

**Important**: All blog links must use `localePath()` to ensure correct locale prefix.

## Data Models

### Route Structure

**Before (prefix_except_default)**:
```
/                          → English home
/blog                      → English blog
/blog/post-slug            → English post
/fa                        → Persian home
/fa/blog                   → Persian blog
/fa/blog/post-slug         → Persian post
```

**After (prefix)**:
```
/                          → Redirect to /en
/en                        → English home
/en/blog                   → English blog
/en/blog/post-slug         → English post
/fa                        → Persian home
/fa/blog                   → Persian blog
/fa/blog/post-slug         → Persian post
```

### Content Query Pattern

**Current**:
```typescript
queryContent(`${locale.value}/blog`)
```

**This remains the same** because content structure matches locale codes.

## Error Handling

### 404 Handling for Missing Translations

When a blog post exists in one language but not another:

```vue
<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
const slug = route.params.slug as string[]

const { data: post } = await useAsyncData(`blog-post-${slug.join('/')}`, async () => {
  try {
    return await queryContent(`${locale.value}/blog`)
      .where({ _path: `/${locale.value}/blog/${slug.join('/')}` })
      .findOne()
  } catch (error) {
    return null
  }
})

// If post not found, check if it exists in other locale
if (!post.value) {
  const otherLocale = locale.value === 'en' ? 'fa' : 'en'
  const { data: otherPost } = await useAsyncData(`blog-post-other-${slug.join('/')}`, async () => {
    try {
      return await queryContent(`${otherLocale}/blog`)
        .where({ _path: `/${otherLocale}/blog/${slug.join('/')}` })
        .findOne()
    } catch (error) {
      return null
    }
  })
  
  if (otherPost.value) {
    // Show message: "This post is only available in [other language]"
    // Provide link to switch language
  } else {
    // Post doesn't exist in any language
    throw createError({ statusCode: 404, message: 'Post not found' })
  }
}
</script>
```

### Redirect Handling

**Root Path Redirect**:
```typescript
// middleware/redirect-root.global.ts
export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/') {
    return navigateTo('/en', { redirectCode: 301 })
  }
})
```

## Testing Strategy

### Manual Testing Checklist

**i18n Routing**:
- [ ] Navigate to `/` → should redirect to `/en`
- [ ] Navigate to `/en` → should show English home
- [ ] Navigate to `/fa` → should show Persian home
- [ ] Navigate to `/en/blog` → should show English blog listing
- [ ] Navigate to `/fa/blog` → should show Persian blog listing
- [ ] Navigate to `/en/blog/post-slug` → should show English post
- [ ] Navigate to `/fa/blog/post-slug` → should show Persian post

**Language Switching**:
- [ ] On home page, switch from English to Persian → should navigate to `/fa`
- [ ] On home page, switch from Persian to English → should navigate to `/en`
- [ ] On blog listing, switch languages → should navigate to equivalent blog page
- [ ] On blog post, switch languages → should navigate to equivalent post (if exists)
- [ ] On blog post (only in one language), switch languages → should show fallback message

**Hydration**:
- [ ] Load page in light mode → no hydration errors in console
- [ ] Load page in dark mode → no hydration errors in console
- [ ] Switch color mode → logo updates correctly
- [ ] Check Footer logo on initial load → no flashing or mismatch

**Accessibility**:
- [ ] Language switcher is keyboard navigable (Tab, Enter, Arrow keys)
- [ ] Language switcher has proper ARIA labels
- [ ] No ARIA warnings in console
- [ ] Screen reader announces language changes

**Vue Router**:
- [ ] No Vue Router warnings in console during navigation
- [ ] No Vue Router warnings when switching languages
- [ ] Browser back/forward buttons work correctly
- [ ] URL updates correctly on language switch

### Browser Console Checks

**Before Fixes**:
```
❌ [Vue Router warn]: No match found for location with path "/en/blog/post-slug"
❌ Hydration mismatch in <img>
❌ [ARIA] aria-hidden should not be used on focusable elements
```

**After Fixes**:
```
✅ No Vue Router warnings
✅ No hydration warnings
✅ No ARIA warnings
```

## Performance Considerations

### Impact of Strategy Change

**Before (prefix_except_default)**:
- English routes: shorter URLs (no prefix)
- Persian routes: longer URLs (with prefix)

**After (prefix)**:
- All routes: consistent length (with prefix)
- Slightly longer URLs for English (adds 3 characters: `/en`)

**SEO Impact**:
- Minimal impact (3 characters)
- Better for international SEO (explicit language in URL)
- Easier for search engines to understand language variants

### Caching Strategy

Route rules remain the same:
```typescript
routeRules: {
  '/en/blog': { swr: 3600 },
  '/fa/blog': { swr: 3600 },
  '/en/blog/**': { swr: 3600 },
  '/fa/blog/**': { swr: 3600 }
}
```

## Migration Plan

### Step 1: Update i18n Configuration
- Change strategy from `prefix_except_default` to `prefix`
- Update prerender routes to include `/en` prefix

### Step 2: Fix Footer Component
- Wrap colorMode-dependent content in `ClientOnly`
- Add fallback for SSR

### Step 3: Fix Language Switcher
- Remove `sr-only` from UI config
- Implement proper route switching with `switchLocalePath()`
- Add proper ARIA labels

### Step 4: Update Blog Components
- Verify all blog links use `localePath()`
- Test blog navigation with new route structure

### Step 5: Add Redirect Middleware
- Create middleware to redirect `/` to `/en`
- Test redirect behavior

### Step 6: Update Route Rules
- Update route rules to use `/en` prefix
- Update sitemap generation

### Step 7: Testing
- Run manual testing checklist
- Verify no console errors
- Test all navigation flows

## Rollback Plan

If issues arise:
1. Revert `strategy` to `prefix_except_default` in `nuxt.config.ts`
2. Revert Footer component changes
3. Revert Language Switcher changes
4. Clear browser cache and cookies
5. Restart dev server

## Summary

This design addresses all three main issues:

1. **Vue Router Warnings**: Fixed by changing i18n strategy to `prefix` for consistent route structure
2. **Hydration Mismatch**: Fixed by wrapping colorMode-dependent content in `ClientOnly`
3. **ARIA Warning**: Fixed by removing `sr-only` from focusable elements and using proper ARIA labels

The changes are minimal, focused, and maintain backward compatibility with the content structure. All blog functionality will continue to work with the new route structure.
