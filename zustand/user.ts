import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { ZUSTAND } from '@/constants/zustand'
import { User } from '@/types'

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
}
export const userZustand = create<UserState>()(
  devtools(
    (set) => ({
      listModals: [],
      [ZUSTAND.User]: null,
      setUser: (user: User | null) => set({ [ZUSTAND.User]: user }),
    }),
    {
      name: `${ZUSTAND.User}-zustand`,
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)
