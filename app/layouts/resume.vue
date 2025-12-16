<script setup lang="ts">
const route = useRoute()
const localePath = useLocalePath()
const isPrintMode = computed(() => route.query.print === 'true')
</script>

<template>
  <div class="bg-white dark:bg-gray-900 print:bg-white min-h-screen">
    <!-- Header: Language Switcher & Back Button -->
    <div v-if="!isPrintMode" class="fixed top-4 right-4 z-50 flex items-center gap-3 no-print">
      <LanguageSwitcher class="resume-switcher" />
      <UButton :to="localePath('/')" icon="i-heroicons-arrow-left" :label="$t('resume.backToHome')" color="primary"
        variant="solid" class="rounded-full shadow-lg hover:scale-105 transition-all duration-200 h-9" />
    </div>

    <!-- Page Content -->
    <slot />
  </div>
</template>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
}

/* Force LanguageSwitcher to look like a Solid Primary button */
:deep(.resume-switcher) {
  background-color: var(--ui-color-primary-500) !important;
  color: white !important;
  border: none !important;
  /* Shadow with theme color mixing */
  box-shadow: 0 10px 15px -3px color-mix(in oklch, var(--ui-color-primary-500) 30%, transparent) !important;
  --tw-ring-color: transparent !important;
}

:deep(.resume-switcher:hover) {
  background-color: var(--ui-color-primary-600) !important;
}

:deep(.resume-switcher span),
:deep(.resume-switcher svg),
:deep(.resume-switcher .text-dimmed) {
  color: white !important;
}
</style>
