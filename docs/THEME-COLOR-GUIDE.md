# Theme Color System Guide

This guide explains how to use the dynamic theme color system in this portfolio.

## Overview

The portfolio uses Nuxt UI's CSS variable system to support multiple theme colors (green, blue, red, orange, etc.). All UI elements should adapt to the user-selected primary color.

## CSS Variables

### Available Variables

```css
/* Light mode defaults */
--ui-color-primary-50   /* Very light tint - backgrounds */
--ui-color-primary-100  /* Light tint */
--ui-color-primary-200  /* Lighter shade - borders */
--ui-color-primary-300  /* Light shade */
--ui-color-primary-400  /* Medium-light shade - dark mode text */
--ui-color-primary-500  /* Main primary color */
--ui-color-primary-600  /* Medium-dark shade - hover states */
--ui-color-primary-700  /* Dark shade - text */
--ui-color-primary-800  /* Darker shade */
--ui-color-primary-900  /* Very dark shade */
--ui-color-primary-950  /* Darkest shade - dark mode backgrounds */
```

### Usage Patterns

#### ✅ Correct Usage

```css
/* Using CSS variables */
.my-button {
  background: var(--ui-color-primary-500);
  color: white;
}

.my-button:hover {
  background: var(--ui-color-primary-600);
}

/* Using semantic Tailwind classes */
<div class="text-primary bg-primary border-primary">

/* Gradients with CSS variables */
.gradient-bg {
  background: linear-gradient(
    to right,
    var(--ui-color-primary-600),
    var(--ui-color-primary-500)
  );
}

/* Color mixing for transparency */
.subtle-bg {
  background: color-mix(in oklch, var(--ui-color-primary-50) 60%, transparent);
}
```

#### ❌ Incorrect Usage

```css
/* Never use hardcoded colors */
.my-button {
  background: #a855f7;  /* ❌ Stays purple forever */
}

/* Never use Tailwind color classes */
<div class="text-purple-500">  /* ❌ Doesn't respond to theme */
<div class="bg-violet-600">    /* ❌ Bypasses theme system */
```

## Dark Mode Considerations

- **Light mode**: Use darker shades (500, 600, 700) for better contrast
- **Dark mode**: Use lighter shades (200, 300, 400) for better visibility
- Always test both modes when adding new styles

```css
/* Example: Text color that works in both modes */
.my-text {
  color: var(--ui-color-primary-600);
}

.dark .my-text {
  color: var(--ui-color-primary-400);
}
```

## Common Patterns

### Buttons

```css
/* Primary button */
.btn-primary {
  background: linear-gradient(to right, 
    var(--ui-color-primary-600), 
    var(--ui-color-primary-500)
  );
  box-shadow: 0 10px 15px -3px color-mix(
    in oklch, 
    var(--ui-color-primary-500) 30%, 
    transparent
  );
}

.btn-primary:hover {
  background: linear-gradient(to right, 
    var(--ui-color-primary-700), 
    var(--ui-color-primary-600)
  );
}
```

### Cards with Hover Effects

```css
.card {
  border: 1px solid var(--ui-color-primary-200);
  box-shadow: 0 10px 15px -3px color-mix(
    in oklch, 
    var(--ui-color-primary-500) 5%, 
    transparent
  );
}

.card:hover {
  border-color: var(--ui-color-primary-500);
  box-shadow: 0 20px 25px -5px color-mix(
    in oklch, 
    var(--ui-color-primary-500) 15%, 
    transparent
  );
}
```

### Focus Rings

```css
.interactive {
  --tw-ring-color: var(--ui-color-primary-500);
}

.dark .interactive {
  --tw-ring-color: var(--ui-color-primary-400);
}
```

## Migration Checklist

When adding new components or styles:

1. ✅ Search for any purple/violet color references
2. ✅ Replace with appropriate primary color variable
3. ✅ Test with multiple primary colors (green, blue, red, orange)
4. ✅ Test in both light and dark modes
5. ✅ Verify hover/focus states use primary color
6. ✅ Check contrast ratios for accessibility (WCAG AA minimum)

## Examples from Codebase

### Scrollbar

```css
:root {
  --scrollbar-thumb: var(--ui-color-primary-500);
  --scrollbar-thumb-hover: var(--ui-color-primary-600);
}

:root.dark {
  --scrollbar-thumb: var(--ui-color-primary-400);
  --scrollbar-thumb-hover: var(--ui-color-primary-300);
}
```

### Chip Buttons (Social Icons)

```css
.chip-button {
  --tw-ring-color: color-mix(in oklch, var(--ui-color-primary-200) 70%, transparent);
  background: linear-gradient(
    to bottom right,
    color-mix(in oklch, white 90%, transparent),
    color-mix(in oklch, var(--ui-color-primary-50) 50%, transparent)
  );
  color: var(--ui-color-primary-700);
}
```

### Gradient Text

```css
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
```

## Troubleshooting

### Issue: Colors not updating when theme changes

**Solution**: Make sure you're using CSS variables, not hardcoded colors or Tailwind color classes.

### Issue: Poor contrast in dark mode

**Solution**: Use lighter shades (200-400) in dark mode instead of darker shades (600-800).

### Issue: Gradients look wrong

**Solution**: Ensure all color stops in the gradient use primary color variables.

## Resources

- [Nuxt UI Color Documentation](https://ui.nuxt.com/getting-started/theme#colors)
- [CSS color-mix() Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix)
- [OKLCH Color Space](https://oklch.com/)
