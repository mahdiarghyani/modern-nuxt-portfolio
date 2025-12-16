# Design Document

## Overview

This design addresses the systematic issue of hardcoded purple/violet colors throughout the portfolio that don't respond to dynamic primary color theme changes. The solution leverages Nuxt UI's CSS variable system (`--ui-color-primary-*`) to ensure all UI elements dynamically adapt to the user-selected primary color.

The core problem is that many components use hardcoded Tailwind classes like `purple-500`, `violet-600`, or direct color values in CSS, which bypass the theme system. The solution is to replace all hardcoded colors with Nuxt UI's semantic CSS variables that automatically respond to theme changes.

## Architecture

### Current State Analysis

**Problematic Areas Identified:**
1. **Scrollbar** - Uses hardcoded purple colors in CSS variables
2. **Utility Classes** - Many utilities use `violet-*` and `purple-*` classes
3. **Component Styles** - Individual components have hardcoded colors
4. **Gradients** - Background gradients use fixed purple/violet colors
5. **Hero Resume Button** - Uses hardcoded `purple-500` in gradient

### Proposed Architecture

**Three-Layer Approach:**

1. **Global CSS Layer** (`main.css`)
   - Define theme-aware CSS variables for common patterns
   - Replace hardcoded scrollbar colors with primary color variables
   - Update utility classes to use `--ui-color-primary-*` variables

2. **Component Layer**
   - Replace hardcoded Tailwind classes with semantic classes
   - Use `:deep()` selectors with CSS variables for complex styling
   - Ensure all hover/focus states use primary color

3. **Documentation Layer**
   - Add inline comments explaining CSS variable usage
   - Create style guide for future development
   - Document migration patterns

## Components and Interfaces

### CSS Variable System

**Nuxt UI Provides:**
```css
/* Available in light mode */
--ui-color-primary-50 through --ui-color-primary-950
--ui-primary (defaults to --ui-color-primary-500 in light, 400 in dark)

/* Semantic shortcuts */
--ui-color-primary-500  /* Main primary color */
--ui-color-primary-400  /* Lighter shade */
--ui-color-primary-600  /* Darker shade */
```

**Usage Pattern:**
```css
/* ❌ Wrong - Hardcoded */
.element {
  color: #a855f7;
  border-color: rgb(139 92 246);
}

/* ✅ Correct - Theme-aware */
.element {
  color: var(--ui-color-primary-500);
  border-color: var(--ui-color-primary-500);
}
```

### Component Patterns

**Pattern 1: Tailwind Class Replacement**
```vue
<!-- ❌ Wrong -->
<div class="text-violet-600 dark:text-violet-400">

<!-- ✅ Correct -->
<div class="text-primary">
```

**Pattern 2: Ring/Border Colors**
```vue
<!-- ❌ Wrong -->
<div class="ring-violet-500 hover:ring-violet-600">

<!-- ✅ Correct - Use CSS variables -->
<div class="ring-primary hover:ring-primary">
<!-- Or with custom CSS -->
<style>
.custom-ring {
  --tw-ring-color: var(--ui-color-primary-500);
}
</style>
```

**Pattern 3: Gradients**
```vue
<!-- ❌ Wrong -->
<div class="bg-gradient-to-r from-violet-600 via-purple-600 to-fuchsia-600">

<!-- ✅ Correct - Use CSS variables -->
<style>
.gradient-bg {
  background: linear-gradient(
    to right,
    var(--ui-color-primary-600),
    var(--ui-color-primary-500),
    var(--ui-color-primary-400)
  );
}
</style>
```

## Data Models

### CSS Variable Mapping

**Scrollbar Variables:**
```css
:root {
  --scrollbar-track: color-mix(in oklch, var(--ui-color-primary-100) 35%, transparent);
  --scrollbar-thumb: var(--ui-color-primary-500);
  --scrollbar-thumb-hover: var(--ui-color-primary-600);
}

:root.dark {
  --scrollbar-track: color-mix(in oklch, var(--ui-bg) 80%, var(--ui-color-primary-900) 20%);
  --scrollbar-thumb: var(--ui-color-primary-400);
  --scrollbar-thumb-hover: var(--ui-color-primary-300);
}
```

**Utility Class Variables:**
```css
/* Replace all violet/purple references */
.primary-text {
  @apply text-primary;
}

.gradient-text {
  background: linear-gradient(
    to right,
    var(--ui-color-primary-600),
    var(--ui-color-primary-500),
    var(--ui-color-primary-400)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.chip-base {
  --tw-ring-color: var(--ui-color-primary-200);
  background: linear-gradient(
    to bottom right,
    color-mix(in oklch, white 90%, transparent),
    color-mix(in oklch, var(--ui-color-primary-50) 60%, transparent)
  );
  color: var(--ui-color-primary-700);
}

.dark .chip-base {
  --tw-ring-color: var(--ui-color-primary-800);
  background: linear-gradient(
    to bottom right,
    color-mix(in oklch, var(--ui-color-primary-950) 40%, transparent),
    color-mix(in oklch, var(--ui-color-primary-900) 20%, transparent)
  );
  color: var(--ui-color-primary-200);
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Scrollbar color consistency
*For any* primary color selection, the scrollbar thumb and track colors should derive from the selected primary color variables, not hardcoded purple values
**Validates: Requirements 3.1, 3.2, 3.3**

### Property 2: Component hover state consistency
*For any* interactive component (button, card, link), hover and focus states should use primary color variables, ensuring consistent highlighting across all theme colors
**Validates: Requirements 4.1, 4.2, 4.3, 4.4**

### Property 3: Gradient color adaptation
*For any* gradient background or text, at least one color stop should use a primary color variable, ensuring gradients adapt to theme changes
**Validates: Requirements 6.1, 6.2, 6.3, 6.4**

### Property 4: No hardcoded purple references
*For any* CSS file or component style block, there should be zero instances of hardcoded purple/violet color values (hex, rgb, or Tailwind classes)
**Validates: Requirements 2.2, 5.1, 5.2**

### Property 5: CSS variable usage
*For any* component requiring primary color styling, it should reference `--ui-color-primary-*` variables instead of specific color names
**Validates: Requirements 2.1, 2.3, 2.4**

### Property 6: Dark mode compatibility
*For any* theme-aware style, both light and dark mode variants should use primary color variables with appropriate shades
**Validates: Requirements 3.4, 4.5, 6.3**

### Property 7: Contrast ratio preservation
*For any* text or interactive element using primary colors, the contrast ratio should remain accessible (WCAG AA minimum) across all primary color options
**Validates: Requirements 4.5**

## Error Handling

### Color Fallbacks

**Issue:** User selects a primary color that doesn't have full shade range
**Solution:** Nuxt UI automatically generates missing shades, but we should test with edge cases

**Issue:** CSS variable not defined in older browsers
**Solution:** Provide fallback colors using CSS cascade
```css
.element {
  color: #6366f1; /* Fallback */
  color: var(--ui-color-primary-500);
}
```

### Browser Compatibility

**Issue:** `color-mix()` not supported in older browsers
**Solution:** Use PostCSS to provide fallbacks (already configured in project)

**Issue:** CSS custom properties in pseudo-elements
**Solution:** Ensure `:deep()` selectors properly inherit variables

## Testing Strategy

### Manual Testing Checklist

1. **Theme Switcher Test**
   - Change primary color to each available option (green, blue, red, etc.)
   - Verify scrollbar updates
   - Verify all buttons/cards update
   - Verify gradients update
   - Test in both light and dark modes

2. **Component Interaction Test**
   - Hover over project cards - ring should match primary
   - Hover over social buttons - ring should match primary
   - Hover over work experience cards - highlights should match primary
   - Focus on interactive elements - focus ring should match primary

3. **Visual Regression Test**
   - Take screenshots with different primary colors
   - Compare before/after for each component
   - Ensure no purple remnants

### Browser Testing

- Chrome/Edge (Chromium)
- Firefox
- Safari (WebKit)
- Test on both desktop and mobile viewports

### Accessibility Testing

- Run axe DevTools on each page
- Verify contrast ratios with different primary colors
- Test with screen readers
- Test keyboard navigation (focus states)

## Implementation Notes

### Migration Strategy

**Phase 1: Global Styles** (main.css)
1. Update scrollbar variables
2. Update utility classes
3. Update heading gradients
4. Update chip/button base styles

**Phase 2: Components**
1. Hero.vue - Update resume button gradient and chip buttons
2. ProjectsList.vue - Update card hover effects
3. WorkExperience.vue - Update border and highlight colors
4. Any other components with hardcoded colors

**Phase 3: Verification**
1. Search codebase for remaining purple/violet references
2. Test all theme color options
3. Test light/dark mode combinations
4. Document patterns for future development

### Code Organization

**File Structure:**
```
app/
├── assets/css/
│   ├── main.css           # Global theme variables
│   ├── transitions.css    # (existing)
│   ├── prose.css          # (existing)
│   └── blog-content.css   # (existing)
└── components/
    └── portfolio/
        ├── Hero.vue       # Update chip-button styles
        ├── ProjectsList.vue  # Update card hover
        └── WorkExperience.vue # Update borders
```

### Performance Considerations

- CSS variables have minimal performance impact
- `color-mix()` is hardware-accelerated in modern browsers
- No JavaScript required for theme updates (pure CSS)
- Variables are computed once per theme change

### Best Practices

1. **Always use CSS variables for primary colors**
   ```css
   /* ✅ Good */
   color: var(--ui-color-primary-500);
   
   /* ❌ Bad */
   color: #a855f7;
   ```

2. **Use semantic Tailwind classes when available**
   ```vue
   <!-- ✅ Good -->
   <div class="text-primary">
   
   <!-- ❌ Bad -->
   <div class="text-violet-600">
   ```

3. **For complex styling, use :deep() with CSS variables**
   ```vue
   <style>
   :deep(.custom-element) {
     border-color: var(--ui-color-primary-500);
   }
   </style>
   ```

4. **Document non-obvious color choices**
   ```css
   /* Using primary-200 for subtle background tint */
   background: var(--ui-color-primary-200);
   ```

5. **Test with multiple primary colors during development**
   - Don't just test with default green
   - Try blue, red, orange to catch hardcoded colors

## Documentation

### Inline Comments

Add comments to explain CSS variable usage:
```css
/* Scrollbar uses primary color with opacity for subtle branding */
--scrollbar-thumb: var(--ui-color-primary-500);

/* Darker shade on hover for better feedback */
--scrollbar-thumb-hover: var(--ui-color-primary-600);
```

### Style Guide

Create a comment block in `main.css`:
```css
/**
 * THEME COLOR USAGE GUIDE
 * 
 * Always use Nuxt UI CSS variables for primary colors:
 * - var(--ui-color-primary-500) for main primary color
 * - var(--ui-color-primary-400) for lighter shade
 * - var(--ui-color-primary-600) for darker shade
 * 
 * Or use semantic Tailwind classes:
 * - text-primary, bg-primary, border-primary
 * 
 * Never use hardcoded colors like:
 * - purple-500, violet-600, #a855f7
 * 
 * For gradients, use CSS variables:
 * background: linear-gradient(to right, 
 *   var(--ui-color-primary-600),
 *   var(--ui-color-primary-500)
 * );
 */
```

### Migration Checklist

Document the migration process:
```markdown
## Adding New Theme-Aware Components

1. Use `text-primary`, `bg-primary`, `border-primary` classes
2. For custom styles, use `var(--ui-color-primary-*)` variables
3. Test with multiple primary colors (green, blue, red, orange)
4. Test in both light and dark modes
5. Verify hover/focus states use primary color
6. Check contrast ratios for accessibility
```
