<template>
  <section id="experience" class="py-16 scroll-mt-20 bg-gray-50 dark:bg-gray-900/50">
    <UContainer>
      <div class="max-w-6xl mx-auto">
        <!-- Section Header -->
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold mb-4">{{ $t('sections.work') }}</h2>
          <div class="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
        </div>

        <!-- Experience Timeline -->
        <div class="space-y-8">
          <div v-for="(exp, i) in portfolio.experiences" :key="i"
            class="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <!-- Company Header -->
            <div class="flex items-start gap-4 mb-4">
              <div v-if="exp.logo"
                class="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-white dark:bg-gray-900 flex items-center justify-center">
                <NuxtImg :src="exp.logo" :alt="exp.company" class="max-w-full max-h-full object-contain"
                  loading="lazy" />
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-semibold">{{ exp.company }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ exp.location }} • {{ exp.type }}
                </p>
              </div>
            </div>

            <!-- Positions -->
            <div class="space-y-6">
              <div v-for="(pos, j) in exp.positions" :key="j" class="border-l-2 border-primary-500 pl-4">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h4 class="text-lg font-semibold">{{ pos.title }}</h4>
                  <span class="text-sm text-gray-600 dark:text-gray-400">
                    {{ pos.start }} - {{ pos.ongoing ? $t('common.present') : pos.end }}
                  </span>
                </div>

                <!-- Description -->
                <ul class="list-disc list-inside space-y-1 mb-3 text-sm text-gray-700 dark:text-gray-300">
                  <li v-for="(desc, k) in pos.description" :key="k">{{ desc }}</li>
                </ul>

                <!-- Technologies -->
                <div v-if="pos.icons" class="flex flex-wrap gap-2 text-primary-500 dark:text-primary-300">
                  <UIcon v-for="(icon, l) in pos.icons" :key="l" :name="icon" class="text-2xl" />
                </div>

                <!-- Link -->
                <div v-if="pos.link" class="mt-3">
                  <UButton :to="pos.link" target="_blank" size="sm" color="primary" variant="soft"
                    icon="i-heroicons-arrow-top-right-on-square">
                    {{ pos.linkLabel || 'View Project' }}
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const portfolio = usePortfolio()
</script>
