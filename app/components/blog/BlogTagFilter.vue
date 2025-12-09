<template>
  <div v-if="tags.length > 0" class="overflow-x-auto scrollbar-hide -mx-1 px-1">
    <div class="flex flex-wrap gap-1.5 py-1">
      <!-- All Posts Badge -->
      <button :class="[
        'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
        'ring-1 ring-inset',
        !modelValue
          ? 'bg-primary-500 text-white ring-primary-500 shadow-sm'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ring-gray-200 dark:ring-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 hover:ring-gray-300 dark:hover:ring-gray-600 hover:shadow-sm hover:scale-105'
      ]" @click="selectTag(null)">
        {{ t('blog.allPosts') }}
      </button>

      <!-- Tag Badges -->
      <button v-for="tag in tags" :key="tag" :class="[
        'px-3 py-1 rounded-full text-xs font-medium transition-all duration-200',
        'ring-1 ring-inset',
        modelValue === tag
          ? 'bg-primary-500 text-white ring-primary-500 shadow-sm'
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 ring-gray-200 dark:ring-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 hover:ring-gray-300 dark:hover:ring-gray-600 hover:shadow-sm hover:scale-105'
      ]" @click="selectTag(tag)">
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  tags: string[]
  modelValue: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const { t } = useI18n()
const route = useRoute()

// Read query parameter on mount to restore filter state
onMounted(() => {
  const tagFromQuery = route.query.tag as string | undefined
  if (tagFromQuery && props.tags.includes(tagFromQuery)) {
    emit('update:modelValue', tagFromQuery)
  }
})

// Select tag and update URL query parameter
const selectTag = async (tag: string | null) => {
  emit('update:modelValue', tag)

  // Update URL query parameter
  await navigateTo({
    query: tag ? { tag } : {}
  })
}
</script>
