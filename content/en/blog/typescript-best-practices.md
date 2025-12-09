---
title: "TypeScript Best Practices for Vue 3"
description: "Discover essential TypeScript patterns and best practices for building type-safe Vue 3 applications with Composition API."
date: "2024-11-08"
tags: ["typescript", "vue", "best-practices", "composition-api"]
author: "Ali Arghyani"
draft: false
---

# TypeScript Best Practices for Vue 3

TypeScript has become an essential tool for building robust Vue 3 applications. In this guide, we'll explore best practices for leveraging TypeScript's type system with Vue 3's Composition API.

## Type-Safe Props

Define props with proper TypeScript interfaces:

```vue
<script setup lang="ts">
interface Props {
  title: string
  count?: number
  items: string[]
}

const props = defineProps<Props>()
</script>
```

## Typed Composables

Create reusable composables with full type safety:

```typescript
export function useCounter(initialValue = 0) {
  const count = ref<number>(initialValue)
  
  const increment = (): void => {
    count.value++
  }
  
  const decrement = (): void => {
    count.value--
  }
  
  return {
    count: readonly(count),
    increment,
    decrement
  }
}
```

## Generic Components

Build flexible components with generics:

```vue
<script setup lang="ts" generic="T extends { id: string }">
interface Props {
  items: T[]
  onSelect: (item: T) => void
}

const props = defineProps<Props>()
</script>
```

## Type-Safe Event Emits

Define emits with proper typing:

```vue
<script setup lang="ts">
interface Emits {
  (e: 'update', value: string): void
  (e: 'delete', id: number): void
}

const emit = defineEmits<Emits>()
</script>
```

## Utility Types

Leverage TypeScript utility types:

```typescript
// Pick specific properties
type UserPreview = Pick<User, 'id' | 'name' | 'email'>

// Make all properties optional
type PartialUser = Partial<User>

// Make all properties required
type RequiredUser = Required<User>

// Exclude properties
type UserWithoutPassword = Omit<User, 'password'>
```

## Type Guards

Implement type guards for runtime type checking:

```typescript
function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  )
}
```

## Async Data Typing

Type your async data properly:

```typescript
const { data, pending, error } = await useAsyncData<User[]>(
  'users',
  () => $fetch('/api/users')
)
```

## Conclusion

TypeScript enhances Vue 3 development by providing type safety, better IDE support, and improved code maintainability. By following these best practices, you'll build more robust and maintainable applications.

Remember: TypeScript is a tool to help you, not hinder you. Start simple and gradually add more type safety as needed.
