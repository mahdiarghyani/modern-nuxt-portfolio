import type { PortfolioData } from '@/types/portfolio.types'
import portfolioEn from '@/data/portfolio.en'
import portfolioFa from '@/data/portfolio.fa'

export const usePortfolio = () => {
  const { locale } = useI18n()

  return computed<PortfolioData>(() => {
    if (locale.value === 'fa') {
      return portfolioFa
    }
    return portfolioEn
  })
}
