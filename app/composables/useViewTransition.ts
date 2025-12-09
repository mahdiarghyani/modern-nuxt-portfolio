/**
 * View Transitions API Composable
 * Provides utilities for using the native View Transitions API with fallback
 */

export const useViewTransition = () => {
  const router = useRouter()

  /**
   * Check if View Transitions API is supported
   */
  const isSupported = computed(() => {
    if (import.meta.server) return false
    return 'startViewTransition' in document
  })

  /**
   * Navigate with View Transition
   * @param to - Route path to navigate to
   * @param options - Navigation options
   */
  const navigateWithTransition = async (
    to: string,
    options?: { replace?: boolean }
  ) => {
    if (!isSupported.value) {
      // Fallback to regular navigation
      if (options?.replace) {
        await router.replace(to)
      } else {
        await router.push(to)
      }
      return
    }

    // Use View Transitions API
    const transition = (document as any).startViewTransition(async () => {
      if (options?.replace) {
        await router.replace(to)
      } else {
        await router.push(to)
      }
    })

    try {
      await transition.finished
    } catch (error) {
      // Transition was skipped or interrupted
      console.warn('View transition interrupted:', error)
    }
  }

  /**
   * Execute a callback with View Transition
   * @param callback - Function to execute during transition
   */
  const withTransition = async (callback: () => void | Promise<void>) => {
    if (!isSupported.value) {
      // Fallback to direct execution
      await callback()
      return
    }

    const transition = (document as any).startViewTransition(async () => {
      await callback()
    })

    try {
      await transition.finished
    } catch (error) {
      console.warn('View transition interrupted:', error)
    }
  }

  return {
    isSupported,
    navigateWithTransition,
    withTransition
  }
}
