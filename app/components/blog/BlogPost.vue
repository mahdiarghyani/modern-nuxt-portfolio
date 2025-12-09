<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

const props = defineProps<{
  post: BlogPost
}>()

const { formatDate, calculateReadingTime } = useBlog()
const readingTime = computed(() => calculateReadingTime(props.post))

// Image loading state
const imageLoaded = ref(!!props.post.image)
const handleImageError = () => {
  imageLoaded.value = false
}
</script>

<template>
  <article>
    <header class="mb-8">
      <!-- Cover Image -->
      <div v-if="post.image"
        class="relative w-full aspect-video rounded-lg overflow-hidden mb-6 bg-gradient-to-br from-primary-500 to-primary-700 dark:from-primary-600 dark:to-primary-900">
        <img v-if="imageLoaded" :src="post.image" :alt="post.title" class="w-full h-full object-cover"
          @error="handleImageError" />
        <div v-else class="flex h-full w-full items-center justify-center">
          <div class="text-center text-white/90 p-8">
            <UIcon name="i-heroicons-photo" class="mx-auto h-16 w-16 mb-3 opacity-80" />
            <p class="text-lg font-medium">{{ post.title }}</p>
          </div>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {{ post.title }}
      </h1>

      <!-- Metadata -->
      <div class="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
        <!-- Date -->
        <time :datetime="post.date" class="flex items-center gap-2">
          <UIcon name="i-heroicons-calendar" class="w-5 h-5" />
          {{ formatDate(post.date) }}
        </time>

        <!-- Reading Time -->
        <span class="flex items-center gap-2">
          <UIcon name="i-heroicons-clock" class="w-5 h-5" />
          {{ $t('blog.readingTime', { minutes: readingTime }) }}
        </span>

        <!-- Author -->
        <span v-if="post.author" class="flex items-center gap-2">
          <UIcon name="i-heroicons-user" class="w-5 h-5" />
          {{ post.author }}
        </span>
      </div>

      <!-- Tags -->
      <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-2">
        <UBadge v-for="tag in post.tags" :key="tag" color="primary" variant="soft" size="md">
          {{ tag }}
        </UBadge>
      </div>
    </header>
  </article>
</template>
