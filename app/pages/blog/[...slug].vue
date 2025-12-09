<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug : [route.params.slug]

// Fetch current post
const { data: post } = await useAsyncData(`blog-post-${slug.join('/')}`, async () => {
  const posts = await queryCollection('blog')
    .where('path', '=', `/${locale.value}/blog/${slug.join('/')}`)
    .first()
  return posts
})

if (!post.value) {
  throw createError({
    statusCode: 404,
    message: 'Blog post not found',
    fatal: true
  })
}

// Fetch all posts for prev/next navigation
const { data: allPosts } = await useAsyncData(`blog-posts-nav-${locale.value}`, async () => {
  const posts = await queryCollection('blog')
    .where('draft', '<>', true)
    .order('date', 'DESC')
    .all()

  // Filter by locale and posts without draft field
  return posts.filter((p: any) =>
    p.path?.startsWith(`/${locale.value}/blog/`) &&
    (p.draft === false || p.draft === undefined)
  )
})

// Calculate adjacent posts
const currentIndex = computed(() => {
  if (!allPosts.value || !post.value) return -1
  return allPosts.value.findIndex((p: any) => p.path === post.value!.path)
})

const prevPost = computed(() => {
  if (currentIndex.value === -1 || !allPosts.value) return null
  return allPosts.value[currentIndex.value + 1] || null
})

const nextPost = computed(() => {
  if (currentIndex.value === -1 || !allPosts.value) return null
  return allPosts.value[currentIndex.value - 1] || null
})

// SEO meta tags
const siteUrl = 'https://aliarghyani.vercel.app' // TODO: Move to runtime config

// Custom meta tags
if (post.value) {
  const postData = post.value as any

  useSeoMeta({
    title: `${postData.title} | ${t('blog.title')}`,
    description: postData.description,
    ogTitle: postData.title,
    ogDescription: postData.description,
    ogImage: postData.image || '/img/blog/default-cover.jpg',
    ogType: 'article',
    ogUrl: `${siteUrl}${postData.path}`,
    twitterCard: 'summary_large_image',
    twitterTitle: postData.title,
    twitterDescription: postData.description,
    twitterImage: postData.image || '/img/blog/default-cover.jpg',
    articlePublishedTime: postData.date,
    articleModifiedTime: postData.updatedAt || postData.date,
    articleAuthor: [postData.author || 'Ali Arghyani'],
    articleTag: postData.tags
  })

  // JSON-LD structured data
  useHead({
    script: [
      {
        type: 'application/ld+json',
        textContent: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: postData.title,
          description: postData.description,
          image: postData.image ? `${siteUrl}${postData.image}` : `${siteUrl}/img/blog/default-cover.jpg`,
          datePublished: postData.date,
          dateModified: postData.updatedAt || postData.date,
          author: {
            '@type': 'Person',
            name: postData.author || 'Ali Arghyani'
          },
          publisher: {
            '@type': 'Person',
            name: 'Ali Arghyani'
          }
        })
      }
    ]
  })
}
</script>

<template>
  <UContainer>
    <div v-if="post" class="pt-24 pb-12">
      <!-- Breadcrumb Navigation -->
      <UBreadcrumb :links="[
        { label: t('nav.home'), to: localePath('/') },
        { label: t('blog.title'), to: localePath('/blog') },
        { label: (post as any).title }
      ]" class="mb-6" />

      <!-- Back to Blog Link -->
      <NuxtLink :to="localePath('/blog')"
        class="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-8">
        <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
        {{ t('blog.backToBlog') }}
      </NuxtLink>

      <!-- Mobile TOC -->
      <div v-if="(post as any).body?.toc?.links?.length" class="lg:hidden mb-8">
        <BlogTableOfContents :toc="(post as any).body.toc" :mobile="true" />
      </div>

      <!-- Main Content Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
        <!-- Main Content -->
        <div class="min-w-0 overflow-x-hidden">
          <!-- Blog Post Metadata -->
          <BlogPost :post="post" />

          <!-- Content Renderer -->
          <article :dir="locale === 'fa' ? 'rtl' : 'ltr'"
            :class="['blog-content', locale === 'fa' ? 'blog-content-rtl' : 'blog-content-ltr']"
            suppressHydrationWarning>
            <ContentRenderer v-if="(post as any).body" :value="(post as any).body" />
          </article>

          <!-- Blog Navigation (Prev/Next) -->
          <BlogNavigation :prev="prevPost" :next="nextPost" />
        </div>

        <!-- Sidebar: Table of Contents (Desktop) -->
        <aside v-if="(post as any).body?.toc?.links?.length" class="hidden lg:block">
          <UContentToc :links="(post as any).body.toc.links" :title="t('blog.tableOfContents')" color="primary"
            highlight :ui="{
              root: 'sticky top-24',
              container: 'bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4'
            }" />
        </aside>
      </div>
    </div>
  </UContainer>
</template>
