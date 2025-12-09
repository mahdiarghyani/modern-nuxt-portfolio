export interface BlogPost {
  // Required fields
  title: string
  description: string
  date: string // ISO 8601 format
  tags: string[]
  path: string // Nuxt Content v3 uses 'path' instead of '_path'

  // Optional fields
  image?: string // Cover image path
  author?: string
  draft?: boolean
  updatedAt?: string

  // Custom SEO
  head?: {
    title?: string
    description?: string
    image?: string
  }

  // Body with TOC (MarkdownRoot from Nuxt Content)
  body?: any
}
