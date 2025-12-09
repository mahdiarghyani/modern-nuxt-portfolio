<template>
  <div :class="alertClass"
    class="my-6 flex items-center gap-3 rounded-xl px-4 py-3.5 ring-1 ring-inset backdrop-blur-sm">
    <UIcon :name="icon" class="h-5 w-5 flex-shrink-0" />
    <div class="flex-1 text-sm leading-relaxed">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    type?: 'info' | 'warning' | 'success' | 'error'
  }>(),
  {
    type: 'info'
  }
)

const typeConfig = {
  info: {
    icon: 'i-heroicons-information-circle',
    class: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200'
  },
  warning: {
    icon: 'i-heroicons-exclamation-triangle',
    class: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200'
  },
  success: {
    icon: 'i-heroicons-check-circle',
    class: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
  },
  error: {
    icon: 'i-heroicons-x-circle',
    class: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
  }
}

const config = computed(() => typeConfig[props.type])
const icon = computed(() => config.value.icon)
const alertClass = computed(() => config.value.class)
</script>
