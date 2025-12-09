#!/usr/bin/env node
/**
 * Portfolio-Resume Sync Script
 * 
 * Purpose: Analyzes differences between portfolio.en.ts and resume.en.ts,
 * applies RESUME-STANDARDS.md rules, and suggests updates.
 * 
 * Usage:
 *   npm run sync-resume
 *   node scripts/sync-portfolio-to-resume.ts
 * 
 * This script is agent-agnostic and can be:
 * - Run manually by developers
 * - Triggered by Kiro Hooks
 * - Called by any AI agent (Claude, ChatGPT, Cursor)
 * - Integrated into CI/CD pipelines
 */

import { readFileSync } from 'fs'
import { resolve } from 'path'

// Types
interface PortfolioProject {
  name: string
  description: string
  highlights: string[]
  keywords: string[]
  startDate: string
  endDate?: string
  url?: string
}

interface ResumeProject {
  name: string
  description: string
  highlights: string[]
  keywords: string[]
}

interface WorkExperience {
  company: string
  position: string
  startDate: string
  endDate?: string
  highlights: string[]
}

interface Skill {
  name: string
  keywords: string[]
}

interface SyncResult {
  type: 'project' | 'skill' | 'work' | 'info'
  action: 'add' | 'update' | 'remove' | 'none'
  item: string
  suggestion?: string
  reason: string
}

// Configuration
const PATHS = {
  portfolio: resolve(process.cwd(), 'app/data/portfolio.en.ts'),
  resume: resolve(process.cwd(), 'app/data/resume.en.ts'),
  standards: resolve(process.cwd(), 'docs/RESUME-STANDARDS.md'),
}

// Main function
async function syncPortfolioToResume(): Promise<SyncResult[]> {
  console.log('🔄 Portfolio-Resume Sync Analysis\n')
  console.log('📋 Reading files...')

  const results: SyncResult[] = []

  try {
    // Read files
    const portfolioContent = readFileSync(PATHS.portfolio, 'utf-8')
    const resumeContent = readFileSync(PATHS.resume, 'utf-8')

    // Extract data (simplified - in production, use proper parsing)
    const portfolioProjects = extractProjects(portfolioContent, 'portfolio')
    const resumeProjects = extractProjects(resumeContent, 'resume')
    const portfolioSkills = extractSkills(portfolioContent)
    const resumeSkills = extractSkills(resumeContent)

    console.log(`✅ Found ${portfolioProjects.length} portfolio projects`)
    console.log(`✅ Found ${resumeProjects.length} resume projects`)
    console.log(`✅ Found ${portfolioSkills.length} portfolio skill categories\n`)

    // Analyze projects
    console.log('🔍 Analyzing Projects...\n')
    const projectResults = analyzeProjects(portfolioProjects, resumeProjects)
    results.push(...projectResults)

    // Analyze skills
    console.log('\n🔍 Analyzing Skills...\n')
    const skillResults = analyzeSkills(portfolioSkills, resumeSkills)
    results.push(...skillResults)

    // Summary
    console.log('\n' + '='.repeat(60))
    console.log('📊 SYNC ANALYSIS SUMMARY')
    console.log('='.repeat(60) + '\n')

    const addCount = results.filter(r => r.action === 'add').length
    const updateCount = results.filter(r => r.action === 'update').length
    const noneCount = results.filter(r => r.action === 'none').length

    console.log(`✅ Items to ADD: ${addCount}`)
    console.log(`🔄 Items to UPDATE: ${updateCount}`)
    console.log(`⏭️  Items to SKIP: ${noneCount}`)
    console.log(`📝 Total analyzed: ${results.length}\n`)

    // Detailed results
    if (addCount > 0) {
      console.log('📌 ITEMS TO ADD:\n')
      results
        .filter(r => r.action === 'add')
        .forEach((r, i) => {
          console.log(`${i + 1}. [${r.type.toUpperCase()}] ${r.item}`)
          console.log(`   Reason: ${r.reason}`)
          if (r.suggestion) {
            console.log(`   Suggestion: ${r.suggestion}`)
          }
          console.log()
        })
    }

    if (updateCount > 0) {
      console.log('🔄 ITEMS TO UPDATE:\n')
      results
        .filter(r => r.action === 'update')
        .forEach((r, i) => {
          console.log(`${i + 1}. [${r.type.toUpperCase()}] ${r.item}`)
          console.log(`   Reason: ${r.reason}`)
          if (r.suggestion) {
            console.log(`   Suggestion: ${r.suggestion}`)
          }
          console.log()
        })
    }

    console.log('\n' + '='.repeat(60))
    console.log('💡 NEXT STEPS')
    console.log('='.repeat(60) + '\n')
    console.log('1. Review suggestions above')
    console.log('2. Apply changes to app/data/resume.en.ts')
    console.log('3. Follow RESUME-STANDARDS.md for formatting')
    console.log('4. Validate with Pre-Commit Checklist')
    console.log('\n📖 Reference: docs/RESUME-STANDARDS.md\n')

    return results
  } catch (error) {
    console.error('❌ Error during sync:', error)
    throw error
  }
}

// Helper: Extract projects from file content
function extractProjects(content: string, source: 'portfolio' | 'resume'): any[] {
  const projects: any[] = []
  
  // Simple regex-based extraction (in production, use proper AST parsing)
  const projectMatches = content.matchAll(/{\s*name:\s*['"]([^'"]+)['"]/g)
  
  for (const match of projectMatches) {
    projects.push({ name: match[1] })
  }
  
  return projects
}

// Helper: Extract skills from file content
function extractSkills(content: string): string[] {
  const skills: string[] = []
  
  // Extract skill keywords (simplified)
  const skillMatches = content.matchAll(/keywords:\s*\[([\s\S]*?)\]/g)
  
  for (const match of skillMatches) {
    const keywords = match[1]
      .split(',')
      .map(k => k.trim().replace(/['"]/g, ''))
      .filter(k => k.length > 0)
    skills.push(...keywords)
  }
  
  return [...new Set(skills)] // Remove duplicates
}

// Analyze projects
function analyzeProjects(portfolioProjects: any[], resumeProjects: any[]): SyncResult[] {
  const results: SyncResult[] = []
  
  const resumeProjectNames = new Set(resumeProjects.map(p => p.name))
  
  for (const project of portfolioProjects) {
    if (!resumeProjectNames.has(project.name)) {
      // New project in portfolio, not in resume
      results.push({
        type: 'project',
        action: 'add',
        item: project.name,
        reason: 'Project exists in portfolio but not in resume',
        suggestion: `Add to resume Projects section with 3 achievement-focused bullets. Include metrics (users, performance, impact).`
      })
    } else {
      // Project exists in both - check if update needed
      results.push({
        type: 'project',
        action: 'none',
        item: project.name,
        reason: 'Project already in resume'
      })
    }
  }
  
  return results
}

// Analyze skills
function analyzeSkills(portfolioSkills: string[], resumeSkills: string[]): SyncResult[] {
  const results: SyncResult[] = []
  
  const resumeSkillSet = new Set(resumeSkills.map(s => s.toLowerCase()))
  
  for (const skill of portfolioSkills) {
    if (!resumeSkillSet.has(skill.toLowerCase())) {
      // Skill in portfolio but not resume
      results.push({
        type: 'skill',
        action: 'add',
        item: skill,
        reason: 'Skill used in portfolio projects but not listed in resume',
        suggestion: `Add to appropriate Skills category. If AI-related, add to "AI-Assisted Development" section.`
      })
    }
  }
  
  return results
}

// Run if called directly
if (require.main === module) {
  syncPortfolioToResume()
    .then(() => {
      console.log('✅ Sync analysis complete!\n')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Sync failed:', error)
      process.exit(1)
    })
}

export { syncPortfolioToResume, type SyncResult }
