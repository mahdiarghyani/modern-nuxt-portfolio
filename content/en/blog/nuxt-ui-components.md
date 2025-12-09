---
title: "Building Beautiful UIs with Nuxt UI"
description: "Explore Nuxt UI components and learn how to create stunning, accessible user interfaces with minimal effort."
date: "2024-11-08"
tags: ["nuxt", "ui", "design", "components"]
author: "Ali Arghyani"
draft: false
---

# Building Beautiful UIs with Nuxt UI

Nuxt UI is a comprehensive UI library built on top of Tailwind CSS and Headless UI, providing a collection of fully styled and customizable components for Nuxt 3 applications.

## Why Nuxt UI?

Nuxt UI stands out for several reasons:

- **Fully Typed**: Complete TypeScript support with IntelliSense
- **Accessible**: Built with accessibility in mind using Headless UI
- **Customizable**: Easy theming with Tailwind CSS
- **Dark Mode**: Built-in dark mode support
- **Icons**: Integrated with Iconify for thousands of icons

::blog-callout{type="info" title="Pro Tip"}
Nuxt UI components are designed to work seamlessly with Nuxt's auto-import feature, so you can use them without explicit imports!
::

## Getting Started

Install Nuxt UI in your project:

```bash
pnpm add @nuxt/ui
```

Add it to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/ui']
})
```

## Essential Components

### Buttons

Buttons are the foundation of any UI. Nuxt UI provides flexible button components:

```vue
<template>
  <div class="flex gap-2">
    <UButton>Default</UButton>
    <UButton color="primary">Primary</UButton>
    <UButton variant="outline">Outline</UButton>
    <UButton icon="i-heroicons-rocket-launch">With Icon</UButton>
  </div>
</template>
```

### Cards

Cards are perfect for displaying content:

```vue
<template>
  <UCard>
    <template #header>
      <h3>Card Title</h3>
    </template>
    
    <p>Card content goes here</p>
    
    <template #footer>
      <UButton>Action</UButton>
    </template>
  </UCard>
</template>
```

### Forms

Build forms quickly with validation:

```vue
<script setup>
const state = reactive({
  email: '',
  password: ''
})

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})
</script>

<template>
  <UForm :schema="schema" :state="state" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>
    
    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>
    
    <UButton type="submit">Submit</UButton>
  </UForm>
</template>
```

## Theming

Customize your app's appearance with the `app.config.ts`:

```typescript
export default defineAppConfig({
  ui: {
    primary: 'indigo',
    gray: 'slate',
    button: {
      rounded: 'rounded-full'
    }
  }
})
```

::alert{type="success"}
All Nuxt UI components respect your theme configuration automatically!
::

## Dark Mode

Dark mode is built-in and works out of the box:

```vue
<template>
  <UButton @click="toggleDarkMode">
    Toggle Dark Mode
  </UButton>
</template>

<script setup>
const colorMode = useColorMode()

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>
```

## Icons

Access thousands of icons from Iconify:

```vue
<template>
  <div class="flex gap-2">
    <UIcon name="i-heroicons-home" />
    <UIcon name="i-heroicons-user" />
    <UIcon name="i-heroicons-cog" />
  </div>
</template>
```

::blog-callout{type="warning" title="Performance Note"}
Icons are automatically optimized and only the ones you use are included in your bundle!
::

## Best Practices

1. **Use Composition API**: Leverage Vue 3's Composition API for better code organization
2. **Type Everything**: Take advantage of TypeScript for better DX
3. **Customize Wisely**: Override only what you need in `app.config.ts`
4. **Accessibility First**: Always test with keyboard navigation and screen readers
5. **Performance**: Use lazy loading for heavy components

## Conclusion

Nuxt UI provides a solid foundation for building modern web applications. With its comprehensive component library, excellent TypeScript support, and seamless Nuxt integration, you can focus on building features rather than styling components.

Start building beautiful UIs today! 🎨
