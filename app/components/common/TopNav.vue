<template>
  <nav class="fixed inset-x-0 top-0 z-50 pointer-events-auto transition-transform duration-300" data-section-header>
    <div class="mx-auto max-w-6xl px-4 pt-2">
      <div
        class="backdrop-blur-md bg-white/80 dark:bg-slate-900/70 shadow-md rounded-2xl border border-white/30 dark:border-slate-700/50 pointer-events-auto transition-all duration-300">
        <div class="flex items-center justify-between px-2 py-2">
          <div class="flex items-center gap-3">
            <!-- Home -->
            <div class="flex items-center gap-1.5">
              <UTooltip :text="t('nav.home')">
                <UButton class="cursor-pointer transition-all duration-200"
                  :class="[isActive('hero') ? activeClass : inactiveClass]" variant="soft" square icon="i-twemoji-house"
                  :aria-label="t('nav.home')" @click="goTo('hero')" />
              </UTooltip>
              <button type="button" class="hidden lg:inline-flex text-sm font-medium transition-colors duration-200"
                :class="[isActive('hero') ? labelActiveClass : labelInactiveClass]" @click="goTo('hero')">
                {{ t('nav.home') }}
              </button>
            </div>

            <!-- Skills -->
            <div class="flex items-center gap-1.5">
              <UTooltip :text="t('sections.skills')">
                <UButton class="cursor-pointer transition-all duration-200"
                  :class="[isActive('skills') ? activeClass : inactiveClass]" variant="soft" square
                  icon="i-twemoji-hammer-and-wrench" :aria-label="t('sections.skills')" @click="goTo('skills')" />
              </UTooltip>
              <button type="button" class="hidden lg:inline-flex text-sm font-medium transition-colors duration-200"
                :class="[isActive('skills') ? labelActiveClass : labelInactiveClass]" @click="goTo('skills')">
                {{ t('sections.skills') }}
              </button>
            </div>

            <!-- Work -->
            <div class="flex items-center gap-1.5">
              <UTooltip :text="t('sections.work')">
                <UButton class="cursor-pointer transition-all duration-200"
                  :class="[isActive('work') ? activeClass : inactiveClass]" variant="soft" square
                  icon="i-twemoji-briefcase" :aria-label="t('sections.work')" @click="goTo('work')" />
              </UTooltip>
              <button type="button" class="hidden lg:inline-flex text-sm font-medium transition-colors duration-200"
                :class="[isActive('work') ? labelActiveClass : labelInactiveClass]" @click="goTo('work')">
                {{ t('sections.work') }}
              </button>
            </div>

            <!-- Projects -->
            <div class="flex items-center gap-1.5">
              <UTooltip :text="t('sections.projects')">
                <UButton class="cursor-pointer transition-all duration-200"
                  :class="[isActive('projects') ? activeClass : inactiveClass]" variant="soft" square
                  icon="i-twemoji-rocket" :aria-label="t('sections.projects')" @click="goTo('projects')" />
              </UTooltip>
              <button type="button" class="hidden lg:inline-flex text-sm font-medium transition-colors duration-200"
                :class="[isActive('projects') ? labelActiveClass : labelInactiveClass]" @click="goTo('projects')">
                {{ t('sections.projects') }}
              </button>
            </div>

            <!-- Blog -->
            <div class="flex items-center gap-1.5">
              <UTooltip :text="t('sections.blog')">
                <NuxtLink :to="localePath('/blog')">
                  <UButton class="cursor-pointer transition-all duration-200"
                    :class="[isBlogActive ? activeClass : inactiveClass]" variant="soft" square icon="i-twemoji-memo"
                    :aria-label="t('sections.blog')" />
                </NuxtLink>
              </UTooltip>
              <NuxtLink :to="localePath('/blog')">
                <button type="button" class="hidden lg:inline-flex text-sm font-medium transition-colors duration-200"
                  :class="[isBlogActive ? labelActiveClass : labelInactiveClass]">
                  {{ t('sections.blog') }}
                </button>
              </NuxtLink>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeCustomizer />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import ThemeCustomizer from '@/components/common/ThemeCustomizer.vue'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const localePath = useLocalePath()

const activeClass = 'ring-1 ring-primary-400/40 bg-primary-500/15 text-primary-600 dark:text-primary-400 transform scale-105'
const inactiveClass = 'text-gray-500 dark:text-gray-300 hover:text-primary-400'
const labelActiveClass = 'text-primary-700 dark:text-primary-400'
const labelInactiveClass = 'text-gray-600 dark:text-gray-300 hover:text-primary-400'

const sectionIds = ['hero', 'skills', 'work', 'projects'] as const
type Target = typeof sectionIds[number]

const isHome = computed(() => route.path === localePath('/'))
const isBlogActive = computed(() => route.path.includes('/blog'))

// Active section tracking (client-side only)
const activeSection = ref<Target | null>(null)
const isMounted = ref(false)

onMounted(() => {
  isMounted.value = true

  // Only setup intersection observer on homepage
  if (!isHome.value) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id as Target
          if (sectionIds.includes(id)) {
            activeSection.value = id
          }
        }
      })
    },
    {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0
    }
  )

  // Observe all sections
  sectionIds.forEach((id) => {
    const element = document.getElementById(id)
    if (element) {
      observer.observe(element)
    }
  })

  // Cleanup
  onUnmounted(() => {
    observer.disconnect()
  })
})

const isActive = (id: Target) => {
  // During SSR or before mount, no section is active
  if (!isMounted.value) return false
  return activeSection.value === id
}

function scrollToSection(id: Target) {
  if (typeof window === 'undefined') return

  const element = document.getElementById(id)
  if (element) {
    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

async function goTo(id: Target) {
  const homePath = localePath('/')
  if (route.path !== homePath) {
    await router.push(homePath)
    await nextTick()
    // Wait for next frame to ensure DOM is ready
    if (typeof requestAnimationFrame !== 'undefined') {
      requestAnimationFrame(() => scrollToSection(id))
    } else {
      scrollToSection(id)
    }
  } else {
    scrollToSection(id)
  }
}
</script>
