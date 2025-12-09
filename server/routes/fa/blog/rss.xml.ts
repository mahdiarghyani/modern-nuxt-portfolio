export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://example.com'

  // Persian locale
  const locale = 'fa'

  // Fetch published blog posts
  const posts = await serverQueryContent(event, `${locale}/blog`)
    .where({ draft: { $ne: true } })
    .sort({ date: -1 })
    .find()

  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')
  }

  const rssItems = posts
    .map((post) => {
      const link = `${siteUrl}${post._path}`
      const pubDate = new Date(post.date).toUTCString()

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid>${escapeXml(link)}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(post.description || '')}</description>
    </item>`
    })
    .join('')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>وبلاگ - ${escapeXml(config.public.siteName || 'سایت من')}</title>
    <link>${siteUrl}/fa/blog</link>
    <description>آخرین پست‌های وبلاگ</description>
    <language>${locale}</language>
    <atom:link href="${siteUrl}/fa/blog/rss.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`

  event.node.res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8')
  return rss
})
