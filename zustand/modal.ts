import { ModalProps } from '@heroui/modal'
import { ReactNode } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { ZUSTAND } from '@/constants/zustand'

export type Modal = {
  addModal?: boolean
  callBackAfter?: () => any
  showBtnClose?: boolean
  children?: ReactNode
  //   placement?: 'center' | 'auto' | 'top' | 'top-center' | 'bottom' | 'bottom-center' | undefined
} & ModalProps

interface ModalState {
  listModals: Modal[]
  openModal: (nextModalAdmin: Modal) => void
  closeModal: (isIconClose?: boolean) => void
}
export const modal = create<ModalState>()(
  devtools(
    (set, get) => ({
      listModals: [],
      [ZUSTAND.Modal]: {
        open: false,
      },
      openModal: (param: Modal) => {
        const listModals = get().listModals

        if (param.addModal) {
          listModals.push(param)
        } else {
          listModals[listModals.length === 0 ? 0 : listModals.length - 1] = param
        }
        set({ listModals })
      },
      closeModal: () => {
        const listModals = get().listModals
        const modal = listModals.pop()

        modal?.callBackAfter && modal?.callBackAfter()

        set({ listModals })
      },
    }),
    {
      name: 'modal-zustand',
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)
