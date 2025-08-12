import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { THEME_MODE } from '@/constants/app'
import { ZUSTAND } from '@/constants/zustand'

interface ThemeState {
  [ZUSTAND.Theme]: THEME_MODE
  seTheme: (theme: THEME_MODE) => void
}
export const themeZustand = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        [ZUSTAND.Theme]: THEME_MODE.Light,
        seTheme: (theme: THEME_MODE) => {
          set({ [ZUSTAND.Theme]: theme })
        },
      }),
      {
        name: `${ZUSTAND.Theme}-zustand`,
      }
    ),
    {
      name: `${ZUSTAND.Theme}-zustand`,
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)

const useTheme = () => {
  const theme = themeZustand((state) => state)

  return {
    ...theme,
    isDarkMode: theme[ZUSTAND.Theme] === THEME_MODE.Dark,
  }
}

export default useTheme
