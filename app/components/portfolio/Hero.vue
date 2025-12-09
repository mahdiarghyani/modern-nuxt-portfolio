<template>
  <section id="hero" class="pt-16 pb-12 scroll-mt-20 flex items-center min-h-[60vh]">
    <UContainer>
      <div class="flex flex-col items-center text-center max-w-4xl mx-auto">
        <!-- Avatar -->
        <div v-if="portfolio.profile.avatar"
          class="mb-8 w-32 h-32 sm:w-40 sm:h-40 ring-4 ring-primary-400/50 dark:ring-primary-300/40 rounded-full overflow-hidden">
          <NuxtImg :src="portfolio.profile.avatar" :alt="portfolio.profile.name" sizes="128px sm:160px" width="160"
            height="160" class="h-full w-full object-cover" format="webp" preload />
        </div>

        <!-- Name & Title -->
        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
          {{ portfolio.profile.name }}
        </h1>
        <p class="text-xl sm:text-2xl text-primary-600 dark:text-primary-400 font-semibold mb-6">
          {{ portfolio.profile.title }}
        </p>

        <!-- Summary -->
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl leading-relaxed">
          {{ portfolio.profile.summary }}
        </p>

        <!-- Location -->
        <div v-if="portfolio.profile.location" class="flex items-center gap-2 mb-8 text-gray-600 dark:text-gray-300">
          <UIcon name="i-heroicons-map-pin" class="text-lg text-primary-600 dark:text-primary-400" />
          <span>{{ portfolio.profile.location }}</span>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-wrap items-center justify-center gap-4 mb-8">
          <UButton to="#projects" size="lg" color="primary" icon="i-heroicons-briefcase" class="shadow-lg">
            {{ $t('buttons.viewProjects') || 'View Projects' }}
          </UButton>
          <UButton to="/resume" size="lg" color="gray" variant="outline" icon="i-heroicons-document-text">
            {{ $t('hero.viewResume') }}
          </UButton>
        </div>

        <!-- Social Links -->
        <div class="flex flex-wrap items-center justify-center gap-3">
          <ClientTooltip text="GitHub" v-if="portfolio.profile.socials?.github">
            <UButton :to="portfolio.profile.socials.github" target="_blank" icon="i-mdi-github" :square="true"
              color="gray" variant="ghost" class="chip-button" aria-label="GitHub" />
          </ClientTooltip>

          <ClientTooltip text="LinkedIn" v-if="portfolio.profile.socials?.linkedin">
            <UButton :to="portfolio.profile.socials.linkedin" target="_blank" icon="i-logos-linkedin-icon"
              :square="true" color="gray" variant="ghost" class="chip-button" aria-label="LinkedIn" />
          </ClientTooltip>

          <ClientTooltip text="Email" v-if="portfolio.profile.socials?.email">
            <UButton :to="`mailto:${portfolio.profile.socials.email}`" icon="i-heroicons-envelope" :square="true"
              color="gray" variant="ghost" class="chip-button" aria-label="Email" />
          </ClientTooltip>

          <ClientTooltip text="Twitter" v-if="portfolio.profile.socials?.twitter">
            <UButton :to="portfolio.profile.socials.twitter" target="_blank" icon="i-logos-twitter" :square="true"
              color="gray" variant="ghost" class="chip-button" aria-label="Twitter" />
          </ClientTooltip>

          <ClientTooltip text="Telegram" v-if="portfolio.profile.socials?.telegram">
            <UButton :to="portfolio.profile.socials.telegram" target="_blank" icon="i-logos-telegram" :square="true"
              color="gray" variant="ghost" class="chip-button" aria-label="Telegram" />
          </ClientTooltip>

          <ClientTooltip text="Instagram" v-if="portfolio.profile.socials?.instagram">
            <UButton :to="portfolio.profile.socials.instagram" target="_blank" :square="true" color="gray"
              variant="ghost" class="chip-button" aria-label="Instagram">
              <span
                class="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-[6px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                <UIcon name="i-mdi-instagram" class="text-white text-sm" />
              </span>
            </UButton>
          </ClientTooltip>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const portfolio = usePortfolio()
</script>
