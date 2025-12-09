export interface BlogPost {
  _path: string
  title: string
  description: string
  date: string
  updatedAt?: string
  tags: string[]
  image?: string
  author?: string
  draft?: boolean
  readingTime?: string
  body?: any
}

export interface BlogListItem {
  _path: string
  title: string
  description: string
  date: string
  tags: string[]
  image?: string
  readingTime?: string
}

export interface BlogCategory {
  name: string
  slug: string
  count: number
}

export interface BlogTag {
  name: string
  slug: string
  count: number
}
