import type { BlogPost } from '~/types/blog'

export function useBlog() {
  const { locale } = useI18n()

  /**
   * Calculate reading time from word count
   * @param content - Blog post content
   * @returns Reading time in minutes
   */
  const calculateReadingTime = (content: any): number => {
    if (!content?.body?.children) return 0

    const text = JSON.stringify(content.body.children)
    const wordCount = text.split(/\s+/).length
    return Math.ceil(wordCount / 200) // 200 words per minute
  }

  /**
   * Format date for display
   * @param dateString - ISO 8601 date string
   * @returns Formatted date string
   */
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  /**
   * Get all unique tags from posts
   * @param posts - Array of blog posts
   * @returns Sorted array of unique tags
   */
  const extractUniqueTags = (posts: BlogPost[]): string[] => {
    const tagSet = new Set<string>()
    posts.forEach(post => {
      post.tags?.forEach(tag => tagSet.add(tag))
    })
    return Array.from(tagSet).sort()
  }

  /**
   * Get blog path for current locale
   * @returns Locale-aware blog path
   */
  const getBlogPath = (): string => {
    return `${locale.value}/blog`
  }

  /**
   * Filter posts by search query
   */

  const filterPostsBySearch = (posts: BlogPost[], query: string): BlogPost[] => {
    if (!query) return posts

    const lowerQuery = query.toLowerCase()
    return posts.filter(post =>
      post.title?.toLowerCase().includes(lowerQuery) ||
      post.description?.toLowerCase().includes(lowerQuery) ||
      post.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }

  /**
   * Filter posts by tag
   * @param posts - Array of blog posts
   * @param tag - Tag to filter by
   * @returns Filtered array of posts
   */
  const filterPostsByTag = (posts: BlogPost[], tag: string | null): BlogPost[] => {
    if (!tag) return posts
    return posts.filter(post => post.tags?.includes(tag))
  }

  return {
    calculateReadingTime,
    formatDate,
    extractUniqueTags,
    getBlogPath,
    filterPostsBySearch,
    filterPostsByTag
  }
}
