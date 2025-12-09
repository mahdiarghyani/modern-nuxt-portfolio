<template>
  <UCard :ui="{
    base: 'my-6',
    body: { padding: 'p-4 sm:p-5' },
    ring: 'ring-2',
    divide: ''
  }" :class="cardClass">
    <div class="flex items-start gap-3">
      <UIcon :name="icon" :class="iconClass" class="mt-0.5 h-5 w-5 flex-shrink-0" />
      <div class="flex-1">
        <h4 v-if="title" class="mb-2 font-semibold" :class="titleClass">{{ title }}</h4>
        <div class="prose-sm dark:prose-invert">
          <slot />
        </div>
      </div>
    </div>
  </UCard>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'info' | 'warning' | 'success' | 'error'
    title?: string
  }>(),
  {
    type: 'info'
  }
)

const typeConfig = {
  info: {
    icon: 'i-heroicons-information-circle',
    cardClass: 'ring-blue-500/20 bg-blue-50 dark:bg-blue-950/20',
    iconClass: 'text-blue-600 dark:text-blue-400',
    titleClass: 'text-blue-900 dark:text-blue-100'
  },
  warning: {
    icon: 'i-heroicons-exclamation-triangle',
    cardClass: 'ring-yellow-500/20 bg-yellow-50 dark:bg-yellow-950/20',
    iconClass: 'text-yellow-600 dark:text-yellow-400',
    titleClass: 'text-yellow-900 dark:text-yellow-100'
  },
  success: {
    icon: 'i-heroicons-check-circle',
    cardClass: 'ring-green-500/20 bg-green-50 dark:bg-green-950/20',
    iconClass: 'text-green-600 dark:text-green-400',
    titleClass: 'text-green-900 dark:text-green-100'
  },
  error: {
    icon: 'i-heroicons-x-circle',
    cardClass: 'ring-red-500/20 bg-red-50 dark:bg-red-950/20',
    iconClass: 'text-red-600 dark:text-red-400',
    titleClass: 'text-red-900 dark:text-red-100'
  }
}

const config = computed(() => typeConfig[props.type])
const icon = computed(() => config.value.icon)
const cardClass = computed(() => config.value.cardClass)
const iconClass = computed(() => config.value.iconClass)
const titleClass = computed(() => config.value.titleClass)
</script>
