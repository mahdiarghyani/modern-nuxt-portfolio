<template>
  <div class="max-w-6xl mx-auto pt-12 md:pt-24">
    <!-- Above-the-fold content only (improves LCP by reducing initial render work) -->
    <Hero />

    <!-- Below-the-fold sections rendered on server for SEO (SSR) -->
    <Skills />
    <AIStack />
    <SoftSkills />
    <!-- <GitHubActivity username="mahdiarghyani" /> -->
    <WorkExperience />
    <ProjectsList />
  </div>
</template>

<script setup lang="ts">
import { usePortfolio } from '@/composables/usePortfolio'

const portfolio = usePortfolio()
const { t, locale } = useI18n()

const siteTitle = computed(() => `${portfolio.value.profile.name} — ${t('meta.portfolioTitleSuffix')}`)
const description = computed(() => `${portfolio.value.profile.title}. ${portfolio.value.profile.summary}`)

useHead(() => ({
  title: siteTitle.value,
  link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon/newlogo.png' }],
}))

useSeoMeta({
  title: () => siteTitle.value,
  description: () => description.value,
  ogTitle: () => siteTitle.value,
  ogDescription: () => description.value,
  ogType: 'website',
  ogLocale: () => (locale.value === 'fa' ? 'fa_IR' : 'en_US'),
})
</script>
