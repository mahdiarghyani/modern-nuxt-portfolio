<template>
  <section id="about" class="py-16 scroll-mt-20">
    <UContainer>
      <div class="max-w-4xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">{{ $t('sections.about') }}</h2>
          <div class="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        <!-- Bio/Story -->
        <div class="prose dark:prose-invert max-w-none mb-12">
          <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {{ portfolio.profile.summary }}
          </p>
        </div>

        <!-- Values Section -->
        <div v-if="portfolio.values" class="mb-12">
          <h3 class="text-2xl font-semibold mb-6 text-center">{{ portfolio.values.title }}</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div v-for="(value, i) in portfolio.values.items" :key="i"
              class="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700/40">
              <UIcon :name="value.icon" class="text-3xl shrink-0 mt-1" />
              <div>
                <h4 class="font-semibold text-lg mb-1">{{ value.label }}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ value.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Education -->
        <EducationList />
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const portfolio = usePortfolio()
</script>
