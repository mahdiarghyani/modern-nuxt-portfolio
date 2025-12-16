<script setup lang="ts">
import type { Education } from '~/types/resume'

interface Props {
  education: Education[]
}

defineProps<Props>()
const { formatDate } = useResumeData()

function formatDateRange(start: string, end?: string): string {
  const { locale } = useI18n()
  const startFormatted = formatDate(start)
  const endFormatted = end ? formatDate(end) : (locale.value === 'fa' ? 'حال حاضر' : 'Present')
  return `${startFormatted} - ${endFormatted}`
}
</script>

<template>
  <section class="mb-12 print:mb-12">
    <h2
      class="text-base font-bold text-blue-700 uppercase border-b-2 border-blue-600 pb-2 mb-6 print:mb-6 tracking-wide">
      {{ $t('resume.education') }}
    </h2>

    <div v-for="edu in education" :key="edu.institution + edu.startDate" class="mb-4 last:mb-0 print:mb-4">
      <div class="flex justify-between items-start gap-3">
        <!-- University Logo -->
        <div class="flex-shrink-0">
          <img src="/img/ut-logo.png" alt="University of Tehran"
            class="w-12 h-12 object-contain print:w-10 print:h-10" />
        </div>

        <!-- Education Details -->
        <div class="flex-1 min-w-0">
          <h3 class="text-sm font-bold text-gray-900">{{ edu.studyType }}{{ edu.area ? ` ${$i18n.locale === 'fa' ? '' :
            'in'} ${edu.area}` : '' }}</h3>
          <p class="text-sm font-medium text-gray-600">{{ edu.institution }}</p>
        </div>

        <!-- Date Range -->
        <span class="text-sm text-gray-500 whitespace-nowrap font-medium flex-shrink-0">
          {{ formatDateRange(edu.startDate, edu.endDate) }}
        </span>
      </div>
    </div>
  </section>
</template>
