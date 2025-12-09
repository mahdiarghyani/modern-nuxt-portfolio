export default defineNitroPlugin(async (nitroApp) => {
  if (!import.meta.prerender) {
    return
  }

  const routes: string[] = []

  nitroApp.hooks.hook('content:file:afterParse' as any, (file: any) => {
    // Collect blog post routes for prerendering
    if (file._path && !file.draft) {
      // English routes: /en/blog/post -> /blog/post (no prefix for default locale)
      if (file._path.startsWith('/en/blog/')) {
        const routeWithoutPrefix = file._path.replace('/en', '')
        routes.push(routeWithoutPrefix)
      }
      // Persian routes: /fa/blog/post -> /fa/blog/post (keep prefix)
      else if (file._path.startsWith('/fa/blog/')) {
        routes.push(file._path)
      }
    }
  })

  nitroApp.hooks.hook('prerender:generate' as any, async () => {
    for (const route of routes) {
      console.log(`Prerendering blog route: ${route}`)
    }
  })
})
