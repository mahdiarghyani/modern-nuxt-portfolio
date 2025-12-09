# Design Document: Page Transitions & UX Enhancement

## Overview

This design implements smooth page transitions, loading states, and component animations using Nuxt 4 best practices. The solution leverages Nuxt's built-in transition system, Vue's Transition component, and modern CSS animations to create a polished user experience while maintaining performance and accessibility.

## Architecture

### Transition Layers

The implementation consists of three distinct layers:

1. **Page-Level Transitions**: Global transitions applied to all route changes via `app.vue`
2. **Layout Transitions**: Smooth transitions when switching between layouts
3. **Component-Level Animations**: Micro-interactions for individual components

### Technology Stack

- **Nuxt 4 Page Transitions**: Built-in `<NuxtPage>` transition prop with enhanced performance
- **Vue 3 Transition Component**: For component-level animations
- **CSS Transforms & Opacity**: Hardware-accelerated animations
- **View Transitions API**: Native browser API for smooth page transitions (Chrome 111+)
- **NuxtLoadingIndicator**: Already implemented, will be enhanced
- **Tailwind CSS 4**: Utility classes for transition effects

## Components and Interfaces

### 1. Global Page Transitions

**Location**: `app/app.vue`

**Implementation Strategy**:
- Add `pageTransition` prop to `<NuxtPage>` component
- Define CSS transition classes in global styles
- Use fade + slight vertical movement for elegance
- Duration: 250-300ms for optimal perceived performance

**Transition Modes**:
- `out-in`: Wait for old page to leave before entering new page (prevents overlap)
- Prevents layout shift during navigation

### 2. Layout Transitions

**Location**: `app/layouts/default.vue`

**Implementation Strategy**:
- Add `layoutTransition` configuration in `nuxt.config.ts`
- Apply crossfade effect for layout changes
- Maintain scroll position where appropriate

### 3. Loading States Enhancement

**Current State**: `NuxtLoadingIndicator` already exists in `app.vue`

**Enhancements**:
- Add custom loading spinner for long operations
- Implement skeleton screens for blog post loading
- Add loading state to blog card components during navigation

### 4. Component Animations

**Target Components**:

a) **BlogCard** (`app/components/blog/BlogCard.vue`)
- Hover state: Subtle lift effect with shadow
- Entry animation: Staggered fade-in when list renders

b) **BlogNavigation** (`app/components/blog/BlogNavigation.vue`)
- Smooth hover states on prev/next buttons
- Icon animations on hover

c) **LanguageSwitcher** (`app/components/LanguageSwitcher.vue`)
- Dropdown animation with scale + fade
- Smooth active state transitions

d) **TopNav** (`app/components/common/TopNav.vue`)
- Smooth scroll-based appearance/disappearance
- Mobile menu slide-in animation

### 5. View Transitions API Integration (Native Browser API)

**Progressive Enhancement**:
- Use native View Transitions API for supported browsers (Chrome 111+, Edge 111+)
- Provides smooth, native transitions between pages
- Automatic fallback to CSS transitions for unsupported browsers

**Implementation via Nuxt 4**:
Nuxt 4 has built-in support for View Transitions API through the `experimental.viewTransition` flag:

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  experimental: {
    viewTransition: true
  }
})
```

This enables automatic View Transitions for:
- Page navigation
- Route changes
- Dynamic content updates

**Manual Control** (when needed):
```typescript
// Composable: useViewTransition
const router = useRouter()

const navigateWithTransition = async (to: string) => {
  if (document.startViewTransition) {
    await document.startViewTransition(async () => {
      await router.push(to)
    }).finished
  } else {
    await router.push(to)
  }
}
```

## Data Models

### Transition Configuration

```typescript
// types/transitions.ts
export interface TransitionConfig {
  name: string
  mode: 'in-out' | 'out-in' | 'default'
  duration: number
  appear?: boolean
}

export interface AnimationPreferences {
  reducedMotion: boolean
  enableViewTransitions: boolean
}
```

### CSS Custom Properties

```css
:root {
  --transition-duration-fast: 150ms;
  --transition-duration-base: 250ms;
  --transition-duration-slow: 350ms;
  --transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
  --transition-timing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

## Implementation Details

### 1. Page Transition Classes

**CSS Structure**:
```css
/* Enter transitions */
.page-enter-active,
.page-leave-active {
  transition: all var(--transition-duration-base) var(--transition-timing);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
```

### 2. Reduced Motion Support

**Media Query**:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 3. Staggered List Animations

**For Blog Cards**:
```css
.blog-card {
  animation: fadeInUp var(--transition-duration-base) var(--transition-timing) backwards;
}

.blog-card:nth-child(1) { animation-delay: 0ms; }
.blog-card:nth-child(2) { animation-delay: 50ms; }
.blog-card:nth-child(3) { animation-delay: 100ms; }
/* ... */

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 4. Language Switch Transition

**Special Handling**:
- Preserve scroll position using `scrollBehavior` in router
- Apply crossfade to prevent jarring content swap
- Maintain route structure during language change

```typescript
// Composable enhancement
const switchLanguageWithTransition = async (newLocale: string) => {
  const scrollY = window.scrollY
  
  await switchLocalePath(newLocale)
  
  // Restore scroll after transition
  nextTick(() => {
    window.scrollTo(0, scrollY)
  })
}
```

## Error Handling

### Transition Failures

1. **CSS Not Loaded**: Fallback to instant transitions
2. **JavaScript Errors**: Graceful degradation to no transitions
3. **Performance Issues**: Detect slow devices and reduce animation complexity

### Browser Compatibility

- **Modern Browsers**: Full transition support with View Transition API
- **Older Browsers**: CSS-only transitions
- **No JavaScript**: Basic CSS transitions still work

## Testing Strategy

### Visual Testing

1. **Manual Testing**:
   - Navigate between all major routes
   - Test language switching
   - Verify mobile menu animations
   - Check hover states on all interactive elements

2. **Browser Testing**:
   - Chrome/Edge (View Transition API support)
   - Firefox (CSS transitions only)
   - Safari (CSS transitions only)
   - Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Testing

1. **Metrics to Monitor**:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)
   - Time to Interactive (TTI)

2. **Animation Performance**:
   - Use Chrome DevTools Performance tab
   - Ensure 60fps during transitions
   - Monitor paint and composite operations

### Accessibility Testing

1. **Reduced Motion**:
   - Test with `prefers-reduced-motion: reduce`
   - Verify animations are disabled or minimal

2. **Keyboard Navigation**:
   - Ensure focus states are visible during transitions
   - Test tab order during animations

3. **Screen Readers**:
   - Verify ARIA live regions announce page changes
   - Test with NVDA/JAWS/VoiceOver

## Configuration Changes

### nuxt.config.ts

```typescript
export default defineNuxtConfig({
  // Enable View Transitions API (Nuxt 4 feature)
  experimental: {
    viewTransition: true
  },
  
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in'
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in'
    }
  },
  
  // Existing config...
})
```

**Note**: The `experimental.viewTransition` flag in Nuxt 4 automatically:
- Adds `<meta name="view-transition" content="same-origin">` to the head
- Enables View Transitions API for navigation
- Provides fallback for unsupported browsers

### CSS Organization

**New File**: `app/assets/css/transitions.css`
- Contains all transition and animation definitions
- Imported in `app/assets/css/main.css`

## Performance Considerations

### Optimization Strategies

1. **Use CSS Transforms**: Hardware-accelerated (GPU)
2. **Avoid Layout Thrashing**: Only animate `transform` and `opacity`
3. **Will-Change Property**: Apply sparingly to animated elements
4. **Reduce Animation Complexity**: Simpler animations on mobile devices

### Bundle Size Impact

- **CSS**: ~2-3KB additional (minified + gzipped)
- **JavaScript**: ~1KB for View Transition API detection
- **Total Impact**: Minimal (<5KB)

## Migration Path

### Phase 1: Core Page Transitions
- Implement global page transitions
- Add transition CSS classes
- Test across routes

### Phase 2: Component Animations
- Add hover states to interactive elements
- Implement staggered list animations
- Enhance loading states

### Phase 3: Advanced Features
- Integrate View Transition API
- Add custom transitions for specific routes
- Optimize performance

## Design Decisions & Rationale

### Why `out-in` Mode?
- Prevents content overlap during transitions
- Cleaner visual experience
- Slightly slower but more polished

### Why 250-300ms Duration?
- Research shows this is the sweet spot for perceived performance
- Fast enough to feel responsive
- Slow enough to be noticeable and polished

### Why CSS Over JavaScript?
- Better performance (GPU acceleration)
- Simpler to maintain
- Works without JavaScript
- Respects `prefers-reduced-motion` automatically

### Why View Transition API?
- Native browser support for smooth transitions
- Better performance than CSS alone
- Progressive enhancement approach
- Future-proof solution

## Nuxt 4 Specific Features

### Built-in View Transitions Support

Nuxt 4 provides first-class support for the View Transitions API:

1. **Automatic Setup**: Just enable `experimental.viewTransition`
2. **SSR Compatible**: Works with server-side rendering
3. **Progressive Enhancement**: Automatic fallback for older browsers
4. **Zero Configuration**: No additional setup needed for basic transitions

### Performance Improvements in Nuxt 4

- **Faster Hydration**: Improved client-side hydration performance
- **Better Code Splitting**: Automatic optimization for route-based code splitting
- **Enhanced Prefetching**: Smarter link prefetching for faster navigation

## References

- [Nuxt 4 Documentation](https://nuxt.com/docs)
- [Nuxt 4 View Transitions](https://nuxt.com/docs/getting-started/transitions#view-transitions-api-experimental)
- [Vue 3 Transition Component](https://vuejs.org/guide/built-ins/transition.html)
- [View Transitions API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [Chrome View Transitions Guide](https://developer.chrome.com/docs/web-platform/view-transitions/)
- [Web Animations Performance](https://web.dev/articles/animations-guide)
- [Reduced Motion Media Query](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
