declare module '#app' {
  interface PageMeta {
    layout?: string
    middleware?: string | string[]
    title?: string
    description?: string
  }
}

declare module 'nuxt/schema' {
  interface PublicRuntimeConfig {
    siteUrl: string
    loadPlausible: string
  }
}

export {}
