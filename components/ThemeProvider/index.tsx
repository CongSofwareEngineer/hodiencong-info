// app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'

import useTheme from '@/zustand/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme()

  return (
    <ThemeProvider attribute={['class', 'data-theme']} defaultTheme={isDarkMode ? 'dark' : 'light'} forcedTheme={isDarkMode ? 'dark' : 'light'}>
      {children}
    </ThemeProvider>
  )
}
