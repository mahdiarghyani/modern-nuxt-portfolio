<template>
  <section id="projects" class="section-spacing scroll-mt-20">
    <UContainer>
      <div class="section-header">
        <UIcon name="i-twemoji-rocket" class="text-2xl" />
        <h2 class="section-title text-start">{{ t('sections.projects') }}</h2>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <UCard v-for="(p, i) in allProjects" :key="`${i}-${p.name}`"
          class="flex h-full flex-col border border-gray-200/60 shadow-none transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-700/40">
          <div class="flex h-full flex-col gap-4">
            <div class="flex gap-3">
              <NuxtImg v-if="p.thumbnail" :src="p.thumbnail" :alt="`${p.name} logo`"
                class="h-12 w-12 rounded-xl border border-gray-200/70 bg-white object-cover shadow-sm dark:border-gray-700/40 dark:bg-slate-900"
                width="96" height="96" sizes="96px" format="webp" loading="lazy" />
              <div v-else
                class="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200/70 shadow-sm dark:border-gray-700/40 project-icon-placeholder">
                <UIcon :name="getProjectIcon(p)" class="text-2xl" />
              </div>
              <div class="flex flex-1 flex-col gap-3">
                <div>
                  <h3 class="text-base font-semibold text-gray-900 dark:text-gray-100">{{ p.name }}</h3>
                  <div v-if="p.status || p.opensource" class="mt-2 flex flex-wrap items-center gap-2">
                    <UBadge v-if="p.status" color="primary" variant="soft" class="rounded-full capitalize">
                      {{ p.status }}
                    </UBadge>
                    <UBadge v-if="p.opensource" color="emerald" variant="soft" class="rounded-full">
                      <UIcon name="i-mdi-source-branch" class="mr-1" />
                      {{ t('projectLabels.openSource') }}
                    </UBadge>
                  </div>
                </div>
                <p class="text-sm text-gray-700 dark:text-gray-200">{{ p.description }}</p>
                <div class="flex flex-1 flex-col gap-3 pt-1">
                  <div v-if="p.icons?.length" class="flex flex-wrap items-center gap-2 text-primary">
                    <UIcon v-for="(ic, k) in p.icons" :key="k" :name="ic" class="text-xl" />
                  </div>
                  <div v-if="p.links?.length" class="mt-auto flex flex-wrap gap-2">
                    <UButton v-for="(l, j) in p.links" :key="j" :to="l.to" target="_blank" size="xs" color="primary"
                      variant="soft" trailing-icon="i-mdi-arrow-top-right-thin" class="hover-ring-tint"
                      :aria-label="l.label">
                      <UIcon v-if="l.icon" :name="l.icon" class="mr-1" />
                      {{ l.label }}
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'
import type { Project } from '@/types/portfolio.types'

const portfolio = usePortfolio()
const { t } = useI18n()

const allProjects = computed(() => portfolio.value.projects)

function getProjectIcon(project: Project): string {
  if (project.thumbnail) return ''

  const hasGitLink = project.links?.some(
    (link) =>
      link.icon === 'i-mdi-github' ||
      /github/i.test(link.label) ||
      /github\.com/i.test(link.to),
  )

  if (project.opensource || hasGitLink) {
    return 'i-mdi-github'
  }

  return 'i-twemoji-rocket'
}
</script>

<style scoped>
.project-icon-placeholder {
  background-color: color-mix(in oklch, var(--ui-color-primary-500) 10%, transparent);
  color: var(--ui-color-primary-600);
}

.dark .project-icon-placeholder {
  background-color: color-mix(in oklch, var(--ui-color-primary-400) 10%, transparent);
  color: var(--ui-color-primary-200);
}
</style>
