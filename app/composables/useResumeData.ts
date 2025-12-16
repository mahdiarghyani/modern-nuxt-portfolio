/**
 * Resume Data Composable
 * Provides reactive access to resume data and helper functions
 * Supports i18n - loads resume data based on current locale
 */

import { computed } from 'vue'
import { resumeData as resumeDataEn } from '~/data/resume.en'
import { resumeData as resumeDataFa } from '~/data/resume.fa'

export function useResumeData() {
  const { locale } = useI18n()
  
  // Reactive reference to resume data based on current locale
  const resume = computed(() => {
    return locale.value === 'fa' ? resumeDataFa : resumeDataEn
  })

  function getCurrentMonthTag(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    return `${year}-${month}`
  }

  /**
   * Convert Persian digits to English digits
   */
  function persianToEnglishDigits(str: string): string {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return str.replace(/[۰-۹]/g, (d) => String(persianDigits.indexOf(d)))
  }

  /**
   * Format date string to readable format
   * Supports both Gregorian (YYYY-MM) and Persian (۱۴۰۲-۰۶) formats
   * @param date - Date string in YYYY-MM format (e.g., "2023-01" or "۱۴۰۲-۰۶")
   * @param localeOverride - Optional locale override
   * @returns Formatted date string (e.g., "Jan 2023" or "شهریور ۱۴۰۲")
   */
  function formatDate(date: string, localeOverride?: string): string {
    if (!date) return ''
    
    const currentLocale = localeOverride || locale.value
    
    // For Persian locale, dates are already in Persian format (e.g., "۱۴۰۲-۰۶")
    if (currentLocale === 'fa') {
      const [year, month] = date.split('-')
      if (!month) return year || '' // Just year provided
      
      const persianMonths = [
        'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
        'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
      ]
      // Convert Persian digits to English for parsing
      const monthNum = parseInt(persianToEnglishDigits(month))
      const monthIndex = monthNum - 1
      const monthName = persianMonths[monthIndex] || month
      return `${monthName} ${year}`
    }
    
    // For English locale, parse as Gregorian date
    const [year, month] = date.split('-')
    const dateObj = new Date(Number(year), Number(month) - 1)
    const monthName = dateObj.toLocaleDateString('en', { month: 'short' })
    return `${monthName} ${year}`
  }

  /**
   * Get full name from resume data
   * @returns Full name
   */
  function getFullName(): string {
    return resume.value.basics.name
  }

  /**
   * Generate PDF filename from resume data
   * Best practice: include a stable date tag (e.g., YYYY-MM) so recipients can distinguish versions.
   * Always uses English name to avoid encoding issues in HTTP headers
   * @returns Filename in format "Mahdi_Arghyani_Resume_FA_YYYY-MM.pdf"
   */
  function getPdfFilename(): string {
    // Always use English name for filename (HTTP headers don't support non-ASCII)
    const englishName = 'Mahdi_Arghyani'
    const lang = locale.value === 'fa' ? 'FA' : 'EN'
    return `${englishName}_Resume_${lang}_${getCurrentMonthTag()}.pdf`
  }

  return {
    resume,
    formatDate,
    getFullName,
    getPdfFilename,
  }
}
