import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

import { COOKIE_KEY } from '@/constants/app'
import { ZUSTAND } from '@/constants/zustand'
import { deleteCookie, setCookie } from '@/services/Cookies'
import { User } from '@/types'
import { decryptData, encryptData } from '@/utils/CryptoJS'
import { cloneData } from '@/utils/functions'

interface UserState {
  user: User | null
  setUser: (user: User | null) => void
}
export const userZustand = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        listModals: [],
        [ZUSTAND.User]: null,
        setUser: (user: User | null) => {
          if (user) {
            const userClone = cloneData(user) as User

            delete userClone.token
            delete userClone.TokenRefresh
            delete userClone.password

            set({ [ZUSTAND.User]: user })
            setCookie(COOKIE_KEY.Token, user.token)
            setCookie(COOKIE_KEY.TokenRefresh, user.TokenRefresh)
          } else {
            set({ [ZUSTAND.User]: null })
            deleteCookie(COOKIE_KEY.Token)
            deleteCookie(COOKIE_KEY.TokenRefresh)
          }
        },
      }),
      {
        name: 'user-zustand',
        storage: {
          getItem: (name) => {
            const dataEncode = localStorage.getItem(name)

            if (dataEncode) {
              const data = decryptData(dataEncode)

              return {
                state: {
                  [ZUSTAND.User]: data,
                },
              }
            }

            return null
          },
          setItem: (name, user) => {
            const userClone = cloneData(user) as User

            delete userClone.token
            delete userClone.TokenRefresh
            const dataEncode = encryptData(userClone)

            localStorage.setItem(name, dataEncode)
          },
          removeItem: (name) => {
            localStorage.removeItem(name)
          },
        },
      }
    ),
    {
      name: `${ZUSTAND.User}-zustand`,
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)
