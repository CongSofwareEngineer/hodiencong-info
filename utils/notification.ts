import { ReactNode } from 'react'

import { language } from '@/zustand/language'
import { toastZustand } from '@/zustand/toast'

type ToastOptions = {
  description?: ReactNode
  timeout?: number
}

export const copyToClipboard = (text: any) => {
  const tmp = document.createElement('input')

  tmp.value = text
  document.body.appendChild(tmp)
  tmp.select()
  document.execCommand('copy')
  tmp.remove()
  showNotificationSuccess(language.getState().language.messages.text.copied, {
    timeout: 3000,
  })
}

export const showNotificationError = (errorMessage = '', options?: ToastOptions) => {
  toastZustand.getState().addToast({ message: errorMessage, description: options?.description, variant: 'error' }, options?.timeout || 3000)
}

export const showNotificationSuccess = (message = '', options?: ToastOptions) => {
  toastZustand.getState().addToast({ message, description: options?.description, variant: 'success' }, options?.timeout || 3000)
}
