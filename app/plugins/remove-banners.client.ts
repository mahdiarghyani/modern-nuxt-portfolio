export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // Remove promotional banners after mount
    const removeBanners = () => {
      // Direct removal of known banner IDs (certificates.dev banner)
      const directSelectors = [
        '#bb-banner',
        '[id*="bb-banner"]',
        'a[href*="certificates.dev"]',
        '[class*="bb-campaign"]',
        '[class*="bb-close"]',
      ]

      directSelectors.forEach((selector) => {
        document.querySelectorAll(selector).forEach((el) => el.remove())
      })

      // Target common banner selectors
      const selectors = [
        '[class*="VueSchool"]',
        '[class*="vue-school"]',
        '[class*="promotional"]',
        '[class*="Banner"]',
        'div[class*="bg-blue-950"]', // Common @nuxt/ui banner style
        'a[href*="vueschool.io"]',
      ]

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(selector)
        elements.forEach((el) => {
          // Check if this looks like a promotional banner
          const parent = el.closest('div')
          if (
            parent &&
            (el.textContent?.toLowerCase().includes('certification') ||
              el.textContent?.toLowerCase().includes('black friday') ||
              el.textContent?.toLowerCase().includes('cyber monday') ||
              el.textContent?.toLowerCase().includes('vueschool') ||
              el.textContent?.toLowerCase().includes('get certified'))
          ) {
            parent.remove()
            el.remove()
          }
        })
      })
    }

    // Run on mount and watch for dynamic additions
    onMounted(() => {
      removeBanners()

      // Use MutationObserver to catch dynamically injected banners
      const observer = new MutationObserver(() => {
        removeBanners()
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true
      })

      // Cleanup on unmount
      onUnmounted(() => {
        observer.disconnect()
      })
    })
  }
})
