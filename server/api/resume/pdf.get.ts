import puppeteer from 'puppeteer'
import type { Browser } from 'puppeteer'

export default defineEventHandler(async (event) => {
  let browser: Browser | null = null

  try {
    const requestUrl = getRequestURL(event)
    const query = getQuery(event)
    const locale = (query.locale as string) || 'en'
    const isRTL = locale === 'fa'

    const host = requestUrl.host.includes('192.168') || requestUrl.host.includes('localhost')
      ? 'localhost:5000'
      : requestUrl.host
    const baseUrl = `http://${host}`

    // For Persian, use /fa/resume path; for English, use /resume
    const resumePath = locale === 'fa' ? '/fa/resume' : '/resume'
    const resumeUrl = `${baseUrl}${resumePath}?print=true`

    console.log('[PDF API] Generating from:', resumeUrl, '(locale:', locale, ')')

    const isDev = process.env.NODE_ENV === 'development'

    if (isDev) {
      browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
    } else {
      const chromium = await import('@sparticuz/chromium')
      const puppeteerCore = await import('puppeteer-core')
      browser = await puppeteerCore.default.launch({
        args: chromium.default.args,
        executablePath: await chromium.default.executablePath(),
        headless: true,
      })
    }

    const page = await browser.newPage()

    // Set viewport to A4 dimensions (210mm x 297mm at 96 DPI)
    await page.setViewport({
      width: 794,  // 210mm
      height: 1123 // 297mm
    })

    // Enable print media type BEFORE loading page
    await page.emulateMediaType('print')

    const response = await page.goto(resumeUrl, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })

    if (!response || !response.ok()) {
      throw new Error(`Failed to load: ${response?.status()}`)
    }

    // Wait for fonts to be ready - excessive wait to ensure Persian fonts render correctly
    await page.evaluateHandle('document.fonts.ready')

    // Wait for Vue hydration
    await page.waitForSelector('strong', { timeout: 5000 }).catch(() => {
      console.log('[PDF API] No strong tags found, continuing anyway')
    })

    // Inject critical CSS fixes for PDF generation
    // STRATEGY: Use @page margin: 0 to prevent RTL clipping.
    // MARGIN FIX: Use 'border' on the wrapper to simulate page margins. 
    // This is more robust than padding in RTL/Puppeteer and prevents the "margins ignored" bug.
    await page.addStyleTag({
      content: `
        @page {
          size: A4;
          margin: 0; 
        }
        
        * { 
          box-shadow: none !important;
          word-break: normal !important;
          overflow-wrap: break-word !important;
          hyphens: none !important;
          -webkit-hyphens: none !important;
          -ms-hyphens: none !important;
          print-color-adjust: exact !important;
          -webkit-print-color-adjust: exact !important;
        }
        
        html {
          direction: ${isRTL ? 'rtl' : 'ltr'} !important;
        }
        
        html, body { 
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
          min-height: auto !important;
          width: 100% !important;
        }
        
        .resume-wrapper {
          background: white !important;
          /* Use border to simulate margin - prevents RTL padding bugs */
          border: 0.7cm solid white !important; 
          padding: 0 !important;
          display: block !important;
          margin: 0 !important;
          width: 100% !important;
          box-sizing: border-box !important;
          /* FIX BLANK FIRST PAGE: Prevent browser from trying to keep it all together */
          break-inside: auto !important;
          page-break-inside: auto !important;
        }
        
        /* High specificity to override Vue scoped styles [data-v-...] which force 210mm width */
        .resume-wrapper .resume-container {
          box-shadow: none !important;
          max-width: 100% !important;
          width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        
        .resume-wrapper .resume-content {
          padding: 0.7rem !important; /* Minimal internal padding */
          width: 100% !important;
          box-sizing: border-box !important;
        }
        
        /* Balanced spacing for sections */
        section {
          margin-bottom: ${isRTL ? '1.5rem' : '0.85rem'} !important; /* Increased spacing for Persian to fill page */
          page-break-inside: auto !important;
          break-inside: auto !important;
        }
        
        section:last-child {
          margin-bottom: 0 !important;
        }
        
        /* TARGET HEADER: Reduce space under the first element (Header) to save space */
        .resume-content > div:first-child {
          margin-bottom: 0.5rem !important;
          padding-bottom: 0 !important;
        }
        
        /* Section titles */
        section h2 {
          margin-bottom: 0.5rem !important;
          padding-bottom: 0.25rem !important;
          page-break-after: avoid !important;
          break-after: avoid !important;
        }
        
        /* Work experience job blocks */
        section > div {
          margin-bottom: ${isRTL ? '1.4rem' : '0.8rem'} !important; /* Significantly more space for Persian items */
        }
        
        section > div:last-child {
          margin-bottom: 0 !important;
        }
        
        /* Bullet lists */
        ul {
          margin-top: 0.4rem !important;
        }
        
        ul li {
          margin-bottom: ${isRTL ? '0.4rem' : '0.25rem'} !important; /* More breathing room for Persian lists */
          line-height: 1.5 !important; /* Restore valid reading height */
          position: relative !important;
          /* Force padding for bullet space */
          ${isRTL ? 'padding-right: 1.2rem !important; padding-left: 0 !important;' : 'padding-left: 1.2rem !important; padding-right: 0 !important;'}
        }
        
        /* Fix bullet visibility - Reconstruct bullets to guarantee print visibility */
        ul li::before {
          content: "•" !important;
          color: black !important;
          font-weight: bold !important;
          position: absolute !important;
          top: -0.1rem !important; /* Align with text */
          ${isRTL ? 'right: 0 !important; left: auto !important;' : 'left: 0 !important; right: auto !important;'}
          width: 1rem !important;
          display: inline-block !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          opacity: 1 !important;
        }

        strong {
          font-weight: 700 !important;
        }
        
        section > p {
          line-height: ${isRTL ? '1.8' : '1.6'} !important; /* Increased reading height for Persian */
        }
        
        strong {
          font-weight: 700 !important;
        }
        
        section > p {
          line-height: 1.6 !important;
        }
      `,
    })

    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      // Margins are handled in CSS now to avoid clipping
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      preferCSSPageSize: true,
    })

    // query already declared at the top
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const filename = (query.filename as string) || `Mahdi_Arghyani_Resume_${year}-${month}.pdf`
    const download = query.download === 'true'

    setResponseHeaders(event, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `${download ? 'attachment' : 'inline'}; filename="${filename}"`,
    })

    return pdf
  } catch (error) {
    console.error('PDF generation failed:', error)
    setResponseStatus(event, 500)
    return {
      error: 'PDF generation failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  } finally {
    if (browser) {
      await browser.close()
    }
  }
})
