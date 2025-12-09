<template>
  <div>
    <PortfolioHero />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('meta.portfolioTitleSuffix') || 'Portfolio',
  description: 'Full-stack developer portfolio showcasing modern web development projects',
})
</script>
