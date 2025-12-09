<script setup lang="ts">
const props = defineProps<{
  code?: string
  language?: string
  filename?: string
  highlights?: number[]
  class?: string
}>()

const { t } = useI18n()
const copied = ref(false)
const isHovered = ref(false)

// Copy code to clipboard
const copyCode = async () => {
  if (props.code) {
    try {
      await navigator.clipboard.writeText(props.code)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }
}

// Get language label
const languageLabel = computed(() => {
  if (!props.language) return null

  const languageMap: Record<string, string> = {
    js: 'JavaScript',
    ts: 'TypeScript',
    vue: 'Vue',
    html: 'HTML',
    css: 'CSS',
    scss: 'SCSS',
    bash: 'Bash',
    sh: 'Shell',
    json: 'JSON',
    md: 'Markdown',
    yaml: 'YAML',
    python: 'Python',
    py: 'Python'
  }

  return languageMap[props.language] || props.language.toUpperCase()
})
</script>

<style scoped>
.code-block-wrapper {
  position: relative;
  margin: 2rem 0;
  border-radius: 0.875rem;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background: linear-gradient(to bottom, #1e293b, #0f172a);
}

:global(.dark) .code-block-wrapper {
  border-color: rgba(71, 85, 105, 0.3);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
}

.code-block-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.5rem;
  background: rgba(30, 41, 59, 0.8);
  border-bottom: 1px solid rgba(71, 85, 105, 0.3);
  backdrop-filter: blur(8px);
  min-height: 2.75rem;
}

.code-filename {
  font-size: 0.875rem;
  color: #e2e8f0;
  font-family: 'Courier New', monospace;
  font-weight: 500;
}

.code-language {
  font-size: 0.75rem;
  color: #cbd5e1;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.625rem;
  background: rgba(99, 102, 241, 0.2);
  border-radius: 0.375rem;
  border: 1px solid rgba(99, 102, 241, 0.4);
}

.code-block-content {
  position: relative;
  background: #0f172a;
}

.code-pre {
  overflow-x: auto;
  padding: 1.75rem 1.5rem;
  font-size: 0.9375rem;
  line-height: 1.8;
  margin: 0;
  background: transparent !important;
  min-height: 4rem;
}

.code-pre::-webkit-scrollbar {
  height: 8px;
}

.code-pre::-webkit-scrollbar-track {
  background: rgba(30, 41, 59, 0.5);
  border-radius: 4px;
}

.code-pre::-webkit-scrollbar-thumb {
  background: rgba(71, 85, 105, 0.8);
  border-radius: 4px;
}

.code-pre::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 116, 139, 0.9);
}

.code-copy-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.625rem;
  border-radius: 0.5rem;
  background: rgba(30, 41, 59, 0.95);
  border: 1px solid rgba(71, 85, 105, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: 0;
  transform: translateY(-2px);
  color: #cbd5e1;
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
}

.code-copy-button.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.code-copy-button:hover {
  background: rgba(51, 65, 85, 0.95);
  border-color: rgba(99, 102, 241, 0.5);
  color: #e2e8f0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);
}

.code-copy-button.is-copied {
  background: rgba(34, 197, 94, 0.2);
  border-color: rgba(34, 197, 94, 0.5);
  color: #86efac;
}

.code-copy-button:active {
  transform: scale(0.95);
}
</style>

<template>
  <div class="code-block-wrapper" @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <!-- Header with filename and language -->
    <div v-if="filename || language" class="code-block-header">
      <span v-if="filename" class="code-filename">
        {{ filename }}
      </span>
      <span v-if="language && !filename" class="code-language">
        {{ languageLabel }}
      </span>
    </div>

    <!-- Code block -->
    <div class="code-block-content">
      <pre :class="props.class" class="code-pre"><slot /></pre>

      <!-- Copy button -->
      <button type="button" :aria-label="copied ? t('blog.codeCopied') : t('blog.copyCode')" class="code-copy-button"
        :class="{ 'is-visible': isHovered || copied, 'is-copied': copied }" @click="copyCode">
        <UIcon :name="copied ? 'i-heroicons-check' : 'i-heroicons-clipboard-document'" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
