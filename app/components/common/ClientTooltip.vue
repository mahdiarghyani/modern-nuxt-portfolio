<template>
  <UTooltip :text="text" :popper="{ placement: 'top' }">
    <slot />
  </UTooltip>
</template>

<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>
