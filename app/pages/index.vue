<template>
  <div>
    <Hero />
    <About />
    <Skills />
    <SoftSkills />
    <WorkExperience />
    <ProjectsList />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSeoMeta({
  title: t('meta.portfolioTitleSuffix') || 'Portfolio',
  description: 'Full-stack developer portfolio showcasing modern web development projects',
})
</script>
