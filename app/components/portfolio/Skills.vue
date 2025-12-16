<template>
  <section id="skills" class="section-spacing scroll-mt-20">
    <UContainer>
      <div class="section-header flex-nowrap justify-between">
        <div class="flex items-center gap-3 min-w-0">
          <UIcon name="i-twemoji-hammer-and-wrench" class="text-2xl" />
          <h2 class="section-title">{{ t('sections.skills') }}</h2>
        </div>
        <SkillFilters v-model="selectedTypes" />
      </div>

      <UAccordion
        type="multiple"
        :unmount-on-hide="false"
        :items="skillSections"
        :default-value="openSkillSections"
        :ui="accordionUi"
      >
        <template #leading="{ item }">
          <UIcon v-if="item.icon" :name="item.icon" class="text-base text-primary-500 dark:text-primary-300" />
        </template>
        <template #body="{ item }">
          <SkillGrid :items="sectionItems[item.value as SkillSectionKey] || []" />
        </template>
      </UAccordion>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Tag, SkillType } from '@/types/portfolio.types'
import { expert, proficient, usedBefore } from '@/data/skills'
import SkillGrid from '@/components/portfolio/SkillGrid.vue'
import SkillFilters from '@/components/portfolio/SkillFilters.vue'

const { t } = useI18n()

type SkillSectionKey = 'expert' | 'proficient' | 'usedBefore'

const selectedTypes = ref<SkillType[]>([])

const filterByType = (items: Tag[]) =>
  selectedTypes.value.length === 0
    ? items
    : items.filter((i) => i.type && selectedTypes.value.includes(i.type))

const filteredExpert = computed(() => filterByType(expert))
const filteredProficient = computed(() => filterByType(proficient))
const filteredUsedBefore = computed(() => filterByType(usedBefore))

const sectionItems = computed<Record<SkillSectionKey, Tag[]>>(() => ({
  expert: filteredExpert.value,
  proficient: filteredProficient.value,
  usedBefore: filteredUsedBefore.value,
}))

const skillSections = computed(() => [
  { label: t('skills.expert'), value: 'expert', icon: 'i-twemoji-military-medal' },
  { label: t('skills.proficient'), value: 'proficient', icon: 'i-twemoji-rocket' },
  { label: t('skills.usedBefore'), value: 'usedBefore', icon: 'i-twemoji-toolbox' },
])

const openSkillSections = computed(() => skillSections.value.map((section) => section.value))

const accordionUi = {
  root: 'flex flex-col gap-3 md:grid md:grid-cols-3 md:gap-4 md:items-stretch',
  item: 'flex flex-col rounded-2xl border border-gray-200/70 dark:border-gray-700/50 bg-white/70 dark:bg-gray-900/40 shadow-sm md:self-stretch data-[state=closed]:md:self-start md:h-full data-[state=open]:md:h-full data-[state=closed]:md:h-auto data-[state=open]:md:min-h-[320px] data-[state=closed]:md:min-h-[64px]',
  header: 'px-4',
  trigger: 'group flex-1 items-center gap-2 py-3 text-left',
  label: 'text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300',
  leadingIcon: 'shrink-0',
  trailingIcon:
    'ms-auto text-gray-500 dark:text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180',
  content: 'px-4 pb-4 pt-1 data-[state=closed]:hidden',
  body: 'pt-1',
} as const
</script>
