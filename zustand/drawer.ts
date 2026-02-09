import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { DrawerProps } from '@heroui/drawer'

import { ZUSTAND } from '@/constants/zustand'

export type Drawer = {
  callBackAfter?: () => any
} & DrawerProps

interface DrawerState {
  [ZUSTAND.Drawer]: Drawer
  openDrawer: (nextDrawerAdmin: Drawer) => void
  closeDrawer: (isIconClose?: boolean) => void
}
export const drawer = create<DrawerState>()(
  devtools(
    (set, get) => ({
      [ZUSTAND.Drawer]: {
        isOpen: false,
      },
      openDrawer: (param: Drawer) => {
        set({
          [ZUSTAND.Drawer]: {
            placement: 'bottom',

            ...param,
            isOpen: true,
          },
        })
      },
      closeDrawer: () => {
        const drawer = get()[ZUSTAND.Drawer]

        drawer.callBackAfter && drawer.callBackAfter()
        const init = {
          [ZUSTAND.Drawer]: {
            ...drawer,
            children: null,
            isOpen: false,
          },
        }

        set(init as any)
      },
    }),
    {
      name: 'modal-zustand',
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)
