export default defineAppConfig({
  ui: {
    strategy: "merge",
    primary: "violet",
    gray: "zinc",
    colors: {
      primary: 'violet',
    },
    icons: {
      dynamic: true,
    },
    tooltip: {
      base: "h-auto overflow-visible text-overflow-clip whitespace-normal",
      popper: { placement: "top" },
    },
    timeline: {
      slots: {
        separator: 'flex-1 rounded-full bg-gray-200 dark:bg-gray-700',
      },
      variants: {
        color: {
          primary: {
            separator: 'group-data-[state=completed]:bg-primary-500 dark:group-data-[state=completed]:bg-primary-400'
          }
        }
      }
    },
    prose: {
      h1: {
        class: 'text-4xl font-bold mb-6 mt-8 text-gray-900 dark:text-gray-100'
      },
      h2: {
        class: 'text-3xl font-semibold mb-4 mt-8 text-gray-900 dark:text-gray-100'
      },
      h3: {
        class: 'text-2xl font-semibold mb-3 mt-6 text-gray-900 dark:text-gray-100'
      },
      h4: {
        class: 'text-xl font-semibold mb-2 mt-4 text-gray-900 dark:text-gray-100'
      },
      p: {
        class: 'mb-4 leading-7 text-gray-700 dark:text-gray-300'
      },
      a: {
        class: 'text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 underline underline-offset-2 transition-colors'
      },
      code: {
        class: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-1.5 py-0.5 rounded text-sm font-mono'
      },
      img: {
        class: 'rounded-lg my-6 w-full'
      },
      ul: {
        class: 'mb-4 list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'
      },
      ol: {
        class: 'mb-4 list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300'
      },
      li: {
        class: 'leading-7'
      },
      blockquote: {
        class: 'border-l-4 border-primary-500 pl-4 italic my-6 text-gray-700 dark:text-gray-300'
      }
    }
  } as any,
  repoUrl: "https://github.com/mahdi/mahdi-portfolio-nuxt",
  myWebsiteUrl: "https://mahdi-portfolio.vercel.app",
  myContactUrl: "https://www.linkedin.com/in/mahdi/",
})
