---
title: "Getting Started with Nuxt Content"
description: "Learn how to build a powerful blog with Nuxt Content v3, featuring markdown support, syntax highlighting, and Vue component integration."
date: "2024-11-09"
tags: ["nuxt", "vue", "typescript", "tutorial"]
author: "Ali Arghyani"
draft: false
---

# Getting Started with Nuxt Content

Nuxt Content is a powerful file-based CMS that allows you to write content in Markdown, YAML, CSV, or JSON and query it with a MongoDB-like API. In this tutorial, we'll explore how to set up and use Nuxt Content v3 in your Nuxt 4 application.

## Why Nuxt Content?

Nuxt Content offers several advantages for content-driven applications:

- **File-based**: Write content in Markdown files with Git version control
- **Type-safe**: Full TypeScript support with auto-generated types
- **Powerful queries**: MongoDB-like API for filtering and sorting
- **Syntax highlighting**: Built-in code highlighting with Shiki
- **MDC syntax**: Embed Vue components directly in Markdown

## Installation

Installing Nuxt Content is straightforward:

```bash
pnpm add @nuxt/content
```

Then add it to your `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/content']
})
```

## Creating Content

Create a `content/` directory in your project root and start writing Markdown files:

```markdown
---
title: "My First Post"
description: "This is my first blog post"
date: "2024-11-09"
---

# Hello World

This is my first post using Nuxt Content!
```

## Querying Content

Use the `queryContent()` composable to fetch your content:

```vue
<script setup>
const { data: posts } = await useAsyncData('posts', () =>
  queryContent('blog')
    .sort({ date: -1 })
    .find()
)
</script>
```

## Rendering Content

Use the `ContentRenderer` component to render your Markdown:

```vue
<template>
  <ContentRenderer :value="post" />
</template>
```

## Advanced Features

### Code Highlighting

Nuxt Content uses Shiki for beautiful syntax highlighting:

```javascript
// This code will be highlighted automatically
const greeting = (name) => {
  console.log(`Hello, ${name}!`)
}
```

### MDC Components

You can use Vue components in your Markdown:

```markdown
::alert{type="info"}
This is an informational alert!
::
```

## Conclusion

Nuxt Content provides a powerful and flexible way to manage content in your Nuxt applications. With its file-based approach, powerful querying capabilities, and seamless Vue integration, it's perfect for blogs, documentation sites, and content-heavy applications.

Happy coding! 🚀
