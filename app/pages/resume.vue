<script setup lang="ts">
definePageMeta({
  layout: 'resume',
  scrollToTop: true
})

const route = useRoute()
const isPrintMode = computed(() => route.query.print === 'true')

useHead({
  title: 'Resume - Mahdi Arghyani',
  meta: [
    { name: 'robots', content: 'noindex' }
  ]
})

// Reset scroll position on mount
onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<template>
  <div>
    <ResumePreview />
    <ResumeDownloadButton :is-print-mode="isPrintMode" />
  </div>
</template>
