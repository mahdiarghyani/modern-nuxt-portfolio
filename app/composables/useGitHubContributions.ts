import type { GitHubApiResponse, GitHubContributionCalendar } from '@/types/github'

/**
 * Composable for fetching GitHub contribution calendar data
 * Based on: https://github.com/yuichkun/github-contribution-graph-example
 * Uses server-side API to avoid CORS and token exposure issues
 */
export const useGitHubContributions = () => {
  const fetchContributions = async (username: string): Promise<GitHubContributionCalendar | null> => {
    try {
      // Use our server API endpoint instead of calling GitHub directly
      const response = await $fetch<GitHubApiResponse>('/api/github/contributions', {
        params: { username }
      })

      // Extract contribution calendar from response
      // Structure: { data: { user: { contributionsCollection: { contributionCalendar: {...} } } } }
      if (response?.data?.user?.contributionsCollection?.contributionCalendar) {
        return response.data.user.contributionsCollection.contributionCalendar
      }

      console.error('Invalid response structure:', response)
      return null
    } catch (error) {
      console.error('Failed to fetch GitHub contributions:', error)
      return null
    }
  }

  return {
    fetchContributions
  }
}
