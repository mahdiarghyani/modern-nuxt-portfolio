# Design Document: Layout Refactoring

## Overview

این طراحی یک refactoring ساده ولی مهم برای جابجایی کامپوننت‌های مشترک UI از `app.vue` به `default.vue` layout است. هدف اصلی پیروی از معماری استاندارد Nuxt و جداسازی concerns است.

### Current Architecture Problems

1. **Mixing Concerns**: `app.vue` هم global configuration و هم specific UI components دارد
2. **Poor Reusability**: اگر بخواهیم صفحه‌ای بدون TopNav داشته باشیم، امکان‌پذیر نیست
3. **Not Following Nuxt Conventions**: Nuxt layout system برای همین موارد طراحی شده ولی استفاده نمی‌شود

### Proposed Solution

جابجایی TopNav و FooterCopyright به `default.vue` layout و تمیز کردن `app.vue` به یک wrapper خالص.

## Architecture

### File Structure

```
app/
├── app.vue                    # Global wrapper (cleaned)
├── layouts/
│   ├── default.vue           # Main layout with TopNav + Footer (updated)
│   └── marketing.vue         # Preserved for future use
├── components/
│   └── common/
│       ├── TopNav.vue        # No changes needed
│       └── FooterCopyright.vue # No changes needed
└── pages/
    ├── index.vue             # Uses default layout automatically
    └── blog/
        ├── index.vue         # Uses default layout automatically
        └── [...slug].vue     # Uses default layout automatically
```

### Component Hierarchy

**Before:**
```
UApp (app.vue)
├── NuxtLoadingIndicator
├── TopNav
├── NuxtPage
│   └── Page Content
└── FooterCopyright
```

**After:**
```
UApp (app.vue)
├── NuxtLoadingIndicator
└── NuxtLayout (default)
    ├── TopNav
    ├── NuxtPage
    │   └── Page Content
    └── FooterCopyright
```

## Components and Interfaces

### 1. app.vue (Refactored)

**Purpose**: Global application wrapper با configuration و global components

**Structure**:
```vue
<template>
  <UApp :toaster="{ expand: false }">
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
```

**Responsibilities**:
- Global app configuration (UApp, toaster)
- Loading indicator
- Head management (fonts, meta tags)
- Language and direction attributes
- Layout wrapper

**What to Remove**:
- TopNav component import and usage
- FooterCopyright component import and usage
- FloatingActions unused import

### 2. layouts/default.vue (Updated)

**Purpose**: Main layout برای صفحات اصلی و بلاگ

**Structure**:
```vue
<template>
  <div class="layout-default">
    <TopNav />
    <slot />
    <FooterCopyright />
  </div>
</template>
```

**Responsibilities**:
- Render TopNav
- Provide slot for page content
- Render FooterCopyright
- Maintain proper spacing and structure

**Styling Considerations**:
- باید مطمئن شویم که spacing بین TopNav و content حفظ می‌شود
- TopNav از قبل `fixed` positioning دارد، پس نیازی به تغییر نیست
- ممکن است نیاز به `padding-top` برای content باشد تا زیر TopNav نرود

### 3. TopNav.vue (No Changes)

این کامپوننت تغییری نمی‌کند چون:
- خودش `fixed positioning` دارد
- مستقل از parent خودش کار می‌کند
- هیچ dependency به app.vue ندارد

### 4. FooterCopyright.vue (No Changes)

این کامپوننت هم تغییری نمی‌کند.

## Data Models

هیچ data model جدیدی نیاز نیست. این یک refactoring ساختاری است.

## Error Handling

### Potential Issues

1. **Layout Not Applied**: اگر Nuxt به درستی default layout را تشخیص ندهد
   - **Solution**: اضافه کردن explicit layout declaration در nuxt.config.ts یا pages

2. **Styling Breaks**: ممکن است spacing یا positioning مشکل پیدا کند
   - **Solution**: بررسی دقیق visual regression و اضافه کردن padding/margin در صورت نیاز

3. **Client-Side Hydration Mismatch**: اگر TopNav در layout و app.vue تفاوت داشته باشد
   - **Solution**: حذف کامل TopNav از app.vue قبل از اضافه کردن به layout

## Migration Strategy

### Step-by-Step Approach

1. **Update default.vue layout**
   - Import TopNav و FooterCopyright
   - Add components to template
   - Test visual appearance

2. **Update app.vue**
   - Remove TopNav و FooterCopyright imports
   - Remove components from template
   - Add NuxtLayout wrapper
   - Keep all head management and global config

3. **Verify pages work correctly**
   - Test homepage
   - Test blog index
   - Test blog post pages
   - Check navigation between pages

4. **Clean up unused code**
   - Remove FloatingActions unused import
   - Remove isLocaleSwitching unused variable

## Testing Strategy

### Manual Testing Checklist

1. **Visual Regression**
   - [ ] Homepage looks identical
   - [ ] Blog index looks identical
   - [ ] Blog post pages look identical
   - [ ] TopNav positioning is correct
   - [ ] Footer positioning is correct

2. **Functionality**
   - [ ] TopNav navigation works (hero, skills, work, projects)
   - [ ] Blog link works
   - [ ] Language switcher works
   - [ ] Theme switcher works
   - [ ] Responsive behavior works on mobile

3. **Navigation**
   - [ ] Navigate from home to blog
   - [ ] Navigate from blog to home
   - [ ] Navigate between blog posts
   - [ ] TopNav and Footer persist correctly

4. **Performance**
   - [ ] No hydration errors in console
   - [ ] No layout shift (CLS)
   - [ ] Loading indicator works

### Browser Testing

- Chrome/Edge (desktop & mobile)
- Firefox
- Safari (if available)

## Performance Considerations

این refactoring نباید تأثیر منفی روی performance داشته باشد:

- **Bundle Size**: تغییری نمی‌کند (فقط جابجایی کد)
- **Rendering**: ممکن است کمی بهتر شود چون Nuxt layout caching دارد
- **Hydration**: باید مشابه قبل باشد

## Future Enhancements

بعد از این refactoring، می‌توانیم:

1. **Create Blog-Specific Layout**: اگر بخواهیم blog layout متفاوتی داشته باشیم
2. **Create Clean Layout**: برای صفحاتی که نیاز به TopNav ندارند (مثل login, 404)
3. **Add Layout Transitions**: انیمیشن بین layout های مختلف
4. **Conditional Footer**: نمایش footer های متفاوت بر اساس صفحه

## References

- [Nuxt Layouts Documentation](https://nuxt.com/docs/guide/directory-structure/layouts)
- [Nuxt app.vue Documentation](https://nuxt.com/docs/guide/directory-structure/app)
- [Vue Slot Documentation](https://vuejs.org/guide/components/slots.html)
