// app/providers.tsx
'use client'

import { ThemeProvider } from 'next-themes'

import useTheme from '@/zustand/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useTheme()

  return (
    <ThemeProvider attribute='class' defaultTheme={isDarkMode ? 'dark' : 'light'}>
      {children}
    </ThemeProvider>
  )
}
