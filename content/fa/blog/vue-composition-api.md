---
title: "راهنمای Composition API در Vue 3"
description: "آموزش کامل Composition API در Vue 3 با مثال‌های کاربردی و بهترین روش‌های پیاده‌سازی."
date: "2024-11-07"
tags: ["vue", "composition-api", "آموزش", "فارسی"]
author: "علی ارغیانی"
draft: false
---

# راهنمای Composition API در Vue 3

Composition API یکی از مهم‌ترین ویژگی‌های Vue 3 است که روش جدیدی برای سازماندهی و استفاده مجدد از منطق کامپوننت‌ها ارائه می‌دهد.

## چرا Composition API؟

Composition API مشکلات Options API را حل می‌کند:

- **سازماندهی بهتر**: منطق مرتبط را در کنار هم نگه دارید
- **استفاده مجدد**: composable ها را به راحتی به اشتراک بگذارید
- **Type Safety**: پشتیبانی بهتر از TypeScript
- **خوانایی**: کد تمیزتر و قابل فهم‌تر

## مفاهیم پایه

### Reactive State

برای ایجاد state واکنش‌پذیر از `ref` یا `reactive` استفاده کنید:

```vue
<script setup>
import { ref, reactive } from 'vue'

// با ref
const count = ref(0)

// با reactive
const state = reactive({
  name: 'علی',
  age: 25
})
</script>
```

### Computed Properties

برای مقادیر محاسبه‌شده از `computed` استفاده کنید:

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('علی')
const lastName = ref('ارغیانی')

const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`
})
</script>
```

### Watchers

برای نظارت بر تغییرات از `watch` یا `watchEffect` استفاده کنید:

```vue
<script setup>
import { ref, watch } from 'vue'

const count = ref(0)

watch(count, (newValue, oldValue) => {
  console.log(`تغییر از ${oldValue} به ${newValue}`)
})
</script>
```

## Composables

composable ها توابع قابل استفاده مجددی هستند که منطق stateful را کپسوله می‌کنند:

```typescript
// composables/useCounter.ts
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  
  const increment = () => {
    count.value++
  }
  
  const decrement = () => {
    count.value--
  }
  
  const reset = () => {
    count.value = initialValue
  }
  
  return {
    count: readonly(count),
    increment,
    decrement,
    reset
  }
}
```

استفاده از composable:

```vue
<script setup>
const { count, increment, decrement } = useCounter(10)
</script>

<template>
  <div>
    <p>شمارنده: {{ count }}</p>
    <button @click="increment">افزایش</button>
    <button @click="decrement">کاهش</button>
  </div>
</template>
```

## Lifecycle Hooks

از lifecycle hooks در `<script setup>` استفاده کنید:

```vue
<script setup>
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('کامپوننت mount شد')
})

onUnmounted(() => {
  console.log('کامپوننت unmount شد')
})
</script>
```

## بهترین روش‌ها

### 1. استفاده از `<script setup>`

این سینتکس مختصرتر و بهینه‌تر است:

```vue
<script setup>
// کد شما اینجا
</script>
```

### 2. سازماندهی Composables

composable ها را در دایرکتوری `composables/` قرار دهید:

```
composables/
  ├── useAuth.ts
  ├── useCounter.ts
  └── useFetch.ts
```

### 3. نام‌گذاری

composable ها را با `use` شروع کنید:

```typescript
export function useMyFeature() {
  // ...
}
```

## نتیجه‌گیری

Composition API روش قدرتمندی برای نوشتن کامپوننت‌های Vue است که کد را قابل نگهداری‌تر، قابل استفاده مجددتر و type-safe تر می‌کند.

با تمرین و استفاده مداوم، Composition API به بخش طبیعی از توسعه Vue شما تبدیل خواهد شد.
