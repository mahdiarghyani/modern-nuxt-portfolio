<template>
  <div class="flex min-h-[400px] items-center justify-center">
    <div class="text-center">
      <div class="mb-4 text-6xl">📝</div>
      <h3 class="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
        {{ t('blog.noResults') }}
      </h3>
      <p class="text-gray-600 dark:text-gray-400">
        {{ t('blog.empty') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
