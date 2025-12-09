<script setup lang="ts">
import type { Skill } from '~/types/resume'

interface Props {
  skills: Skill[]
}

const props = defineProps<Props>()
</script>

<template>
  <section class="mb-12 print:mb-12">
    <h2
      class="text-base font-bold text-blue-700 uppercase border-b-2 border-blue-600 pb-2 mb-6 print:mb-6 tracking-wide">
      Skills & Qualifications
    </h2>

    <!-- Technical Skills (categorized) -->
    <div v-if="skills?.length">
      <div class="space-y-3 print:space-y-3">
        <div v-for="skill in skills" :key="skill.name" class="text-sm">
          <span class="font-bold text-gray-900">{{ skill.name }}:&nbsp;</span><span class="text-gray-700">{{
            skill.keywords.join(', ') }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
