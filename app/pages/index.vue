<template>
  <div class="min-h-screen flex items-center justify-center p-8">
    <div class="text-center max-w-2xl">
      <!-- Dark Mode Toggle (Top Right) -->
      <div class="fixed top-4 right-4">
        <UButton :icon="colorMode.value === 'dark' ? 'i-heroicons-moon' : 'i-heroicons-sun'" color="gray"
          variant="ghost" size="lg" @click="toggleColorMode" />
      </div>

      <h1 class="text-5xl font-bold mb-4">Mahdi Portfolio</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Welcome to my portfolio - Built with Nuxt 4 & Nuxt UI 4
      </p>

      <!-- Language Switcher -->
      <div class="flex gap-4 justify-center mb-8">
        <UButton :to="switchLocalePath('en')" color="primary" variant="soft" size="lg">
          {{ $t('buttons.switchToEnglish') }}
        </UButton>
        <UButton :to="switchLocalePath('fa')" color="primary" variant="soft" size="lg">
          {{ $t('buttons.switchToPersian') }}
        </UButton>
      </div>

      <!-- Test Content -->
      <UCard>
        <div class="space-y-4">
          <p class="text-lg">Current Locale: <strong>{{ locale }}</strong></p>
          <p class="text-lg">Direction: <strong>{{ dir }}</strong></p>
          <p class="text-lg">Color Mode: <strong>{{ colorMode.value }}</strong></p>
          <p class="text-lg">
            {{ $t('hero.currently') }} <strong>{{ $t('sections.work') }}</strong>
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const colorMode = useColorMode()

const activeLocale = computed(() =>
  locales.value.find((item) => item.code === locale.value) ?? locales.value[0]
)

const dir = computed(() => activeLocale.value?.dir ?? 'ltr')

const toggleColorMode = () => {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

useSeoMeta({
  title: 'Mahdi Portfolio',
  description: 'Full-stack developer portfolio'
})
</script>
