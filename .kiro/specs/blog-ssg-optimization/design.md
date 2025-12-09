# Design Document: Blog SSG Optimization

## Overview

این طراحی یک سیستم کامل Static Site Generation برای بلاگ را پیاده‌سازی می‌کند که تمام صفحات بلاگ را در زمان build به صورت استاتیک تولید می‌کند. این رویکرد performance، SEO و قابلیت استقرار را بهبود می‌دهد.

## Architecture

### High-Level Architecture

```
Build Time:
┌─────────────────────────────────────────────────────────┐
│ Nuxt Build Process                                      │
│                                                         │
│  ┌──────────────┐      ┌─────────────────┐            │
│  │   Content    │─────▶│  Route          │            │
│  │   Discovery  │      │  Generator      │            │
│  └──────────────┘      └─────────────────┘            │
│         │                       │                      │
│         │                       ▼                      │
│         │              ┌─────────────────┐            │
│         │              │  Pre-renderer   │            │
│         │              └─────────────────┘            │
│         │                       │                      │
│         ▼                       ▼                      │
│  ┌──────────────┐      ┌─────────────────┐            │
│  │   Sitemap    │      │  Static HTML    │            │
│  │   Generator  │      │  Files          │            │
│  └──────────────┘      └─────────────────┘            │
└─────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  .output/public  │
                    │  (Static Files)  │
                    └──────────────────┘
```

### Runtime Architecture

```
User Request ──▶ CDN/Static Host ──▶ Pre-rendered HTML
                                      (No Server Required)
```

## Components and Interfaces

### 1. Nitro Prerender Configuration

**Purpose:** پیکربندی Nitro برای pre-rendering خودکار تمام مسیرهای بلاگ

**Location:** `nuxt.config.ts`

**Configuration:**
```typescript
nitro: {
  prerender: {
    crawlLinks: true,
    routes: [
      '/',
      '/blog',
      '/fa/blog'
    ]
  }
}
```

**Key Features:**
- `crawlLinks: true` - خزیدن خودکار لینک‌ها برای کشف مسیرها
- مسیرهای seed برای شروع crawling
- پشتیبانی از چند زبانه (en/fa)

### 2. Dynamic Route Generator Hook

**Purpose:** تولید خودکار لیست تمام مسیرهای بلاگ برای pre-rendering

**Location:** `nuxt.config.ts` یا `server/plugins/prerender.ts`

**Implementation Strategy:**


از Nitro hook `prerender:routes` برای اضافه کردن مسیرهای دینامیک:

```typescript
// server/plugins/prerender.ts
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('prerender:routes', async (ctx) => {
    // Fetch all blog posts
    const posts = await queryCollection('blog')
      .where('draft', '<>', true)
      .all()
    
    // Generate routes for each post
    for (const post of posts) {
      ctx.routes.add(post.path)
    }
  })
})
```

**Benefits:**
- تشخیص خودکار تمام پست‌های بلاگ
- عدم نیاز به لیست دستی مسیرها
- پشتیبانی از draft posts (حذف از pre-render)

### 3. Sitemap Module Integration

**Purpose:** تولید خودکار sitemap.xml برای SEO

**Module:** `@nuxtjs/sitemap` یا `nuxt-simple-sitemap`

**Configuration:**
```typescript
// nuxt.config.ts
modules: [
  '@nuxtjs/sitemap'
],

sitemap: {
  hostname: 'https://aliarghyani.vercel.app',
  gzip: true,
  routes: async () => {
    const posts = await queryCollection('blog')
      .where('draft', '<>', true)
      .all()
    
    return posts.map(post => ({
      url: post.path,
      lastmod: post.updatedAt || post.date,
      changefreq: 'monthly',
      priority: 0.8
    }))
  }
}
```

**Output:**
- `/sitemap.xml` - sitemap اصلی
- شامل تمام پست‌های منتشر شده
- تاریخ آخرین تغییر برای هر URL

### 4. Build Script Optimization

**Purpose:** بهینه‌سازی فرآیند build برای SSG

**Location:** `package.json`

**Scripts:**
```json
{
  "scripts": {
    "build": "nuxt build",
    "generate": "nuxt generate",
    "preview": "nuxt preview"
  }
}
```

**Command Usage:**
- `pnpm generate` - تولید فایل‌های استاتیک کامل
- خروجی در `.output/public`

## Data Models

### Blog Post Route Structure

```typescript
interface BlogRoute {
  path: string          // e.g., "/blog/post-slug" or "/fa/blog/post-slug"
  locale: 'en' | 'fa'
  slug: string
  lastmod: string       // ISO 8601 date
  priority: number      // 0.0 to 1.0
}
```

### Prerender Context

```typescript
interface PrerenderContext {
  routes: Set<string>   // مجموعه مسیرهای برای pre-render
}
```

## Error Handling

### 1. Missing Content Files

**Scenario:** فایل markdown وجود ندارد

**Handling:**
- در زمان build، خطا نمایش داده شود
- Build process متوقف شود
- پیام خطای واضح برای developer

### 2. Invalid Frontmatter

**Scenario:** frontmatter پست بلاگ نامعتبر است

**Handling:**
- Validation در زمان build
- خطای واضح با نام فایل
- پیشنهاد فرمت صحیح

### 3. Broken Internal Links

**Scenario:** لینک داخلی به صفحه‌ای اشاره می‌کند که وجود ندارد

**Handling:**
- Warning در build logs
- ادامه build process
- لیست لینک‌های شکسته در انتهای build

### 4. Build Timeout

**Scenario:** pre-rendering زمان زیادی می‌برد

**Handling:**
- تنظیم timeout مناسب در Nitro config
- نمایش progress در console
- امکان افزایش timeout برای بلاگ‌های بزرگ

## Testing Strategy

### 1. Build Testing

**Objective:** اطمینان از موفقیت build process

**Tests:**
- اجرای `pnpm generate` و بررسی exit code
- بررسی وجود فایل‌های HTML در `.output/public`
- بررسی تعداد فایل‌های تولید شده

**Example:**
```bash
pnpm generate
# Check exit code
echo $?  # Should be 0

# Check generated files
ls -la .output/public/blog/
ls -la .output/public/fa/blog/
```

### 2. Route Coverage Testing

**Objective:** اطمینان از pre-render تمام مسیرها

**Tests:**
- بررسی وجود HTML برای هر پست بلاگ
- بررسی صفحات index
- بررسی هر دو locale

**Example:**
```bash
# Check English blog posts
test -f .output/public/blog/index.html
test -f .output/public/blog/post-slug/index.html

# Check Persian blog posts
test -f .output/public/fa/blog/index.html
test -f .output/public/fa/blog/post-slug/index.html
```

### 3. Sitemap Validation

**Objective:** اطمینان از صحت sitemap

**Tests:**
- بررسی وجود `/sitemap.xml`
- Validation XML syntax
- بررسی تعداد URLها
- بررسی فرمت تاریخ‌ها

**Example:**
```bash
# Check sitemap exists
test -f .output/public/sitemap.xml

# Validate XML
xmllint --noout .output/public/sitemap.xml
```

### 4. Content Integrity Testing

**Objective:** اطمینان از صحت محتوای pre-rendered

**Tests:**
- بررسی وجود meta tags در HTML
- بررسی وجود محتوای کامل
- بررسی structured data (JSON-LD)

**Example:**
```bash
# Check meta tags
grep -q "og:title" .output/public/blog/post-slug/index.html
grep -q "application/ld+json" .output/public/blog/post-slug/index.html
```

### 5. Performance Testing

**Objective:** اندازه‌گیری بهبود performance

**Metrics:**
- زمان بارگذاری صفحه
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)

**Tools:**
- Lighthouse CI
- WebPageTest
- Chrome DevTools

## Implementation Phases

### Phase 1: Basic SSG Setup
- پیکربندی Nitro prerender
- تست با چند پست نمونه

### Phase 2: Dynamic Route Generation
- پیاده‌سازی prerender hook
- تشخیص خودکار تمام پست‌ها

### Phase 3: Sitemap Integration
- نصب و پیکربندی sitemap module
- تولید sitemap با تمام مسیرها

### Phase 4: Optimization & Testing
- بهینه‌سازی build process
- تست کامل و validation

## Deployment Considerations

### Static Hosting Options

**Recommended Platforms:**
1. **Vercel** - بهترین گزینه برای Nuxt
2. **Netlify** - پشتیبانی عالی از SSG
3. **Cloudflare Pages** - سریع و رایگان
4. **GitHub Pages** - رایگان برای پروژه‌های عمومی

### Build Command

```bash
pnpm generate
```

### Output Directory

```
.output/public
```

### Environment Variables

```env
NUXT_PUBLIC_SITE_URL=https://aliarghyani.vercel.app
```

## Performance Expectations

### Before SSG (SSR)
- TTFB: 200-500ms
- FCP: 800-1200ms
- LCP: 1500-2500ms

### After SSG
- TTFB: 50-100ms (از CDN)
- FCP: 300-600ms
- LCP: 600-1200ms

**Expected Improvement:** 50-70% بهبود در زمان بارگذاری

## Maintenance

### Adding New Posts

1. اضافه کردن فایل markdown به `content/`
2. اجرای `pnpm generate`
3. Deploy فایل‌های جدید

### Updating Existing Posts

1. ویرایش فایل markdown
2. اجرای `pnpm generate`
3. Deploy مجدد

### No Server Maintenance Required

- نیازی به نگهداری سرور Node.js نیست
- فقط فایل‌های استاتیک
- کاهش هزینه‌های infrastructure
