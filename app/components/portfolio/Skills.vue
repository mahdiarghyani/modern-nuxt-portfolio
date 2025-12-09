<template>
  <section id="skills" class="py-6 scroll-mt-20">
    <UContainer>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <div class="flex items-center gap-3">
          <UIcon name="i-twemoji-hammer-and-wrench" class="text-2xl" />
          <h2 class="text-lg font-semibold">{{ $t('sections.skills') }}</h2>
        </div>
        <SkillFilters v-model="selectedTypes" />
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <UCard>
          <template #header>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {{ $t('skills.expert') }}
            </h3>
          </template>
          <SkillGrid :items="filteredExpert" />
        </UCard>

        <UCard>
          <template #header>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {{ $t('skills.proficient') }}
            </h3>
          </template>
          <SkillGrid :items="filteredProficient" />
        </UCard>

        <UCard>
          <template #header>
            <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              {{ $t('skills.usedBefore') }}
            </h3>
          </template>
          <SkillGrid :items="filteredUsedBefore" />
        </UCard>

        <UCard v-if="showAiStack" class="md:col-span-3">
          <template #header>
            <div class="flex items-center gap-2 mb-1">
              <UIcon name="i-twemoji-robot" class="text-lg" />
              <h3 class="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {{ $t('skills.aiStack') }}
              </h3>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 font-normal normal-case">
              {{ $t('skills.aiStackSubtitle') }}
            </p>
          </template>
          <SkillGrid :items="aiStack" />
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { Tag, SkillType } from '@/types/portfolio.types'
import { expert, proficient, usedBefore, aiStack } from '@/data/skills'

// Multi-select filters for Skill types
const selectedTypes = ref<SkillType[]>([])

const filterByType = (items: Tag[]) =>
  selectedTypes.value.length === 0
    ? items
    : items.filter((i) => i.type && selectedTypes.value.includes(i.type))

const filteredExpert = computed(() => filterByType(expert))
const filteredProficient = computed(() => filterByType(proficient))
const filteredUsedBefore = computed(() => filterByType(usedBefore))

const showAiStack = true
</script>
