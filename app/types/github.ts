/**
 * GitHub GraphQL API Types
 * Based on: https://github.com/yuichkun/github-contribution-graph-example
 */

export interface GitHubContributionDay {
  date: string
  contributionCount: number
}

export interface GitHubContributionWeek {
  contributionDays: GitHubContributionDay[]
}

export interface GitHubContributionCalendar {
  totalContributions: number
  weeks: GitHubContributionWeek[]
}

export interface GitHubContributionsCollection {
  contributionCalendar: GitHubContributionCalendar
}

export interface GitHubUser {
  contributionsCollection: GitHubContributionsCollection
}

export interface GitHubApiResponse {
  data: {
    user: GitHubUser
  }
}
