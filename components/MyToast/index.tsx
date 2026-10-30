'use client'
import { toastZustand } from '@/zustand/toast'
import { cn } from '@/utils/tailwind'

const ALERT_CLASS = {
  success: 'alert-success',
  error: 'alert-error',
  info: 'alert-info',
  warning: 'alert-warning',
}

const MyToast = () => {
  const toasts = toastZustand((state) => state.toasts)
  const removeToast = toastZustand((state) => state.removeToast)

  if (toasts.length === 0) return null

  return (
    <div className='toast toast-top toast-end z-[10000]'>
      {toasts.map((toast) => (
        <div key={toast.id} className={cn('alert alert-soft text-sm shadow-xl animate-scale-in', ALERT_CLASS[toast.variant])} role='alert'>
          <div className='flex flex-col'>
            <span className='font-medium'>{toast.message}</span>
            {toast.description && <span className='text-xs opacity-70'>{toast.description}</span>}
          </div>
          <button className='btn btn-ghost btn-xs btn-circle' type='button' onClick={() => removeToast(toast.id)}>
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}

export default MyToast
