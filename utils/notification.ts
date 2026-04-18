import { ButtonProps, toast, ToastContentValue } from '@heroui/react'

type ToastOptions = {
  description?: ReactNode
  indicator?: ReactNode
  variant?: ToastContentValue['variant']
  actionProps?: ButtonProps
  isLoading?: boolean
  timeout?: number
  onClose?: () => void
}

import { ReactNode } from 'react'

import { language } from '@/zustand/language'
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
  toast.danger(errorMessage, {
    ...options,
    timeout: options?.timeout || 3000,
  })
}

export const showNotificationSuccess = (message = '', options?: ToastOptions) => {
  toast.success(message, {
    ...options,
    timeout: options?.timeout || 3000,
  })
}
