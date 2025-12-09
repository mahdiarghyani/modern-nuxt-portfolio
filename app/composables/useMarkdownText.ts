/**
 * Utility function for parsing simple markdown bold syntax (**text**) to HTML
 * Used in resume components to highlight important keywords
 * SSR-compatible - works on both server and client
 */

/**
 * Converts **text** to <strong>text</strong>
 */
export function parseMarkdownBold(text: string): string {
  if (!text) return ''
  return text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}

/**
 * Composable wrapper for Vue components
 */
export function useMarkdownText() {
  return {
    parseMarkdownBold,
  }
}
