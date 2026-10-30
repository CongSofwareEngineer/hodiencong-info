import { ReactNode } from 'react'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type ToastItem = {
  id: number
  message: ReactNode
  description?: ReactNode
  variant: 'success' | 'error' | 'info' | 'warning'
}

interface ToastState {
  toasts: ToastItem[]
  addToast: (toast: Omit<ToastItem, 'id'>, timeout?: number) => void
  removeToast: (id: number) => void
}

export const toastZustand = create<ToastState>()(
  devtools(
    (set, get) => ({
      toasts: [],
      addToast: (toast, timeout = 3000) => {
        const id = Date.now() + Math.random()

        set({ toasts: [...get().toasts, { ...toast, id }] })
        setTimeout(() => get().removeToast(id), timeout)
      },
      removeToast: (id) => set({ toasts: get().toasts.filter((item) => item.id !== id) }),
    }),
    {
      name: 'toast-zustand',
      enabled: process.env.NEXT_PUBLIC_ENV !== 'production',
    }
  )
)
