# Blog Content Authoring Guide

This directory contains all blog posts for the website in multiple languages.

## Directory Structure

```
content/
├── en/
│   └── blog/
│       ├── post-1.md
│       └── post-2.md
└── fa/
    └── blog/
        ├── post-1.md
        └── post-2.md
```

## Frontmatter Schema

Each blog post must include the following frontmatter:

```yaml
---
title: "Your Post Title"                    # Required: Post title
description: "Brief description"            # Required: Post description (for SEO)
date: "2024-11-09"                         # Required: Publication date (YYYY-MM-DD)
tags: ["tag1", "tag2"]                     # Required: Array of tags
image: "/img/blog/cover.jpg"               # Optional: Cover image path (if omitted, shows gradient placeholder)
author: "Author Name"                      # Optional: Author name
draft: false                               # Optional: Set to true to hide post
---
```

**Note:** If you don't provide an `image` or if the image fails to load, a beautiful gradient placeholder with the post title will be displayed automatically.

## Markdown Features

### Basic Formatting

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*

- Bullet list
- Item 2

1. Numbered list
2. Item 2

[Link text](https://example.com)
```

### Code Blocks

Use triple backticks with language identifier:

\`\`\`typescript
const greeting = (name: string) => {
  console.log(`Hello, ${name}!`)
}
\`\`\`

### Images

```markdown
![Alt text](/img/blog/image.jpg)
```

## MDC Components

### Callout Boxes

```markdown
::blog-callout{type="info" title="Note"}
This is an informational callout box.
::

::blog-callout{type="warning" title="Warning"}
This is a warning callout.
::

::blog-callout{type="success" title="Success"}
This is a success callout.
::

::blog-callout{type="error" title="Error"}
This is an error callout.
::
```

### Inline Alerts

```markdown
::alert{type="info"}
This is an inline alert.
::
```

## Best Practices

1. **Use descriptive titles**: Make titles clear and SEO-friendly
2. **Write good descriptions**: Keep descriptions between 120-160 characters
3. **Choose relevant tags**: Use 3-5 tags per post
4. **Optimize images**: Use WebP format and appropriate dimensions
5. **Add alt text**: Always include alt text for images
6. **Use headings**: Structure content with proper heading hierarchy
7. **Test both languages**: Verify RTL layout for Persian posts
8. **Preview before publishing**: Check formatting and layout

## Publishing Workflow

1. Create a new `.md` file in the appropriate language directory
2. Add complete frontmatter
3. Write your content using Markdown
4. Set `draft: true` while working
5. Preview in development mode
6. Set `draft: false` when ready to publish
7. Commit and push to deploy

## Cover Images

- Cover images are **optional** - posts without images will show a gradient placeholder
- Store cover images in `public/img/blog/`
- Use descriptive filenames (e.g., `nuxt-content-guide.jpg`)
- Recommended dimensions: 1200x630px
- Supported formats: JPG, PNG, WebP
- If an image fails to load, a gradient placeholder is shown automatically

## RTL Content (Persian)

For Persian blog posts:

- Content direction is automatically set to RTL
- Code blocks remain LTR
- Use Persian fonts (Vazirmatn)
- Test layout in both desktop and mobile views

## Need Help?

- Check existing posts for examples
- Review the design document in `.kiro/specs/nuxt-content-blog/design.md`
- Test MDC components in development mode
