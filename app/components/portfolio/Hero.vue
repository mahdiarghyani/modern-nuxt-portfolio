<template>
  <section id="hero" class="pt-8 pb-6 scroll-mt-20 flex items-center">
    <UContainer>
      <div class="flex flex-col-reverse sm:flex-row items-center sm:items-center justify-center gap-4 sm:gap-8">
        <div class="flex-1 max-w-2xl text-center sm:text-start">
          <h1 class="text-primary text-3xl sm:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
            {{ portfolio.profile.name }}
          </h1>
          <p class="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-4 sm:mb-3">
            {{ portfolio.profile.summary }}
          </p>
          <div v-if="portfolio.profile.location"
            class="mb-6 flex flex-col items-center gap-3 text-sm text-gray-600 dark:text-gray-300 sm:items-start">
            <!-- Location and Resume Button Row -->
            <div class="flex flex-col sm:flex-row items-center justify-center sm:justify-between w-full gap-3">
              <div class="flex items-center gap-2">
                <UIcon name="i-twemoji-round-pushpin" class="text-base text-primary-600 me-1 dark:text-primary-300" />
                <span class="leading-relaxed">{{ portfolio.profile.location }}</span>
              </div>
              <!-- Resume Button - Desktop only -->
              <NuxtLink :to="localePath('/resume')" class="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold
                  resume-button
                  text-white rounded-full
                  transition-all duration-300 hover:scale-105
                  animate-pulse hover:animate-none">
                <UIcon name="i-heroicons-document-text" class="text-lg" />
                <span>View Resume</span>
                <UIcon name="i-heroicons-sparkles" class="text-sm opacity-80" />
              </NuxtLink>
            </div>
            <!-- Resume Button - Mobile only -->
            <NuxtLink :to="localePath('/resume')" class="sm:hidden inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium
                resume-button
                text-white rounded-full
                transition-all duration-300 hover:scale-105">
              <UIcon name="i-heroicons-document-text" class="text-base" />
              <span>View My Resume</span>
              <UIcon name="i-heroicons-arrow-right" class="text-sm" />
            </NuxtLink>
          </div>
          <div class="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <ClientTooltip :text="emailTooltip">
              <UButton icon="i-twemoji-e-mail" :square="true" color="gray" variant="ghost"
                class="chip-button cursor-pointer" aria-label="Email" title="Email" @click="copyEmail" />
            </ClientTooltip>
            <ClientTooltip text="GitHub" v-if="portfolio.profile.socials?.github">
              <UButton :to="portfolio.profile.socials.github" target="_blank" icon="i-mdi-github" :square="true"
                color="gray" variant="ghost" class="chip-button" aria-label="GitHub" title="GitHub" />
            </ClientTooltip>
            <ClientTooltip text="LinkedIn" v-if="portfolio.profile.socials?.linkedin">
              <UButton :to="portfolio.profile.socials.linkedin" target="_blank" icon="i-logos-linkedin-icon"
                :square="true" color="gray" variant="ghost" class="chip-button" aria-label="LinkedIn"
                title="LinkedIn" />
            </ClientTooltip>
            <ClientTooltip text="X" v-if="portfolio.profile.socials?.x || portfolio.profile.socials?.twitter">
              <UButton :to="portfolio.profile.socials?.x || portfolio.profile.socials?.twitter" target="_blank"
                icon="i-logos-twitter" :square="true" color="gray" variant="ghost" class="chip-button" aria-label="X"
                title="X" />
            </ClientTooltip>
            <ClientTooltip text="Telegram" v-if="portfolio.profile.socials?.telegram">
              <UButton :to="portfolio.profile.socials.telegram" target="_blank" icon="i-logos-telegram" :square="true"
                color="gray" variant="ghost" class="chip-button" aria-label="Telegram" title="Telegram" />
            </ClientTooltip>
            <ClientTooltip text="WhatsApp" v-if="portfolio.profile.socials?.whatsapp">
              <UButton :to="portfolio.profile.socials.whatsapp" target="_blank" icon="i-logos-whatsapp-icon"
                :square="true" color="gray" variant="ghost" class="chip-button" aria-label="WhatsApp"
                title="WhatsApp" />
            </ClientTooltip>
            <ClientTooltip text="Instagram" v-if="portfolio.profile.socials?.instagram">
              <UButton :to="portfolio.profile.socials.instagram" target="_blank" :square="true" color="gray"
                variant="ghost" class="chip-button" aria-label="Instagram" title="Instagram">
                <span
                  class="inline-flex h-5 w-5 items-center justify-center overflow-hidden rounded-[6px] bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]">
                  <UIcon name="i-mdi-instagram" class="text-white text-sm" />
                </span>
              </UButton>
            </ClientTooltip>
          </div>
        </div>
        <div
          class="block mx-auto sm:mx-0 shrink-0 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 ring-4 ring-primary-400/50 dark:ring-primary-300/40 rounded-full overflow-hidden">
          <NuxtImg :src="portfolio.profile.avatar || undefined" :alt="portfolio.profile.name"
            sizes="96px sm:128px md:160px" width="160" height="160" class="h-full w-full object-cover" format="webp"
            preload />
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePortfolio } from '@/composables/usePortfolio'

const { t } = useI18n()
const localePath = useLocalePath()
const portfolio = usePortfolio()
const toast = useToast()

/**
 * Email copy-to-clipboard for Hero quick action
 */
const emailAddress = 'mahdi.arghyani@gmail.com'
const emailTooltip = ref('Email')

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(emailAddress)
    emailTooltip.value = 'Copied'
    setTimeout(() => {
      emailTooltip.value = 'Email'
    }, 1500)

    // Nuxt UI toast: success
    toast.add({
      title: t('toasts.emailCopied.title'),
      description: t('toasts.emailCopied.desc', { email: emailAddress }),
      icon: 'i-mdi-clipboard-check',
      color: 'emerald',
    })
  } catch {
    // Nuxt UI toast: failure (clipboard not accessible)
    toast.add({
      title: t('toasts.copyFailed.title'),
      description: t('toasts.copyFailed.desc', { email: emailAddress }),
      icon: 'i-mdi-clipboard-alert',
      color: 'amber',
    })

    // Fallback prompt if clipboard API is unavailable
    const ok = typeof window !== 'undefined' && window.confirm(`Copy email:\n\n${emailAddress}`)
    if (ok) {
      emailTooltip.value = 'Copied'
      setTimeout(() => {
        emailTooltip.value = 'Email'
      }, 1500)

      // Show success toast after manual copy confirmation
      toast.add({
        title: t('toasts.emailCopied.title'),
        description: t('toasts.emailCopied.desc', { email: emailAddress }),
        icon: 'i-mdi-clipboard-check',
        color: 'emerald',
      })
    }
  }
}
</script>

<style>
/* Resume button with primary color gradient */
.resume-button {
  background: linear-gradient(to right,
      var(--ui-color-primary-600),
      var(--ui-color-primary-500),
      var(--ui-color-primary-400));
  box-shadow: 0 10px 15px -3px color-mix(in oklch, var(--ui-color-primary-500) 25%, transparent);
}

.resume-button:hover {
  background: linear-gradient(to right,
      var(--ui-color-primary-700),
      var(--ui-color-primary-600),
      var(--ui-color-primary-500));
  box-shadow: 0 20px 25px -5px color-mix(in oklch, var(--ui-color-primary-500) 40%, transparent);
}

/* Override Tailwind ring color variable for chip buttons */
:deep(.chip-button) {
  --tw-ring-color: var(--ui-color-primary-500) !important;
}

:deep(.dark .chip-button) {
  --tw-ring-color: var(--ui-color-primary-400) !important;
}

/* Also override on hover and focus states */
:deep(.chip-button:hover),
:deep(.chip-button:focus),
:deep(.chip-button:focus-visible) {
  --tw-ring-color: var(--ui-color-primary-500) !important;
}

:deep(.dark .chip-button:hover),
:deep(.dark .chip-button:focus),
:deep(.dark .chip-button:focus-visible) {
  --tw-ring-color: var(--ui-color-primary-400) !important;
}
</style>
