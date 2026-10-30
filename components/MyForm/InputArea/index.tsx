import { TextareaHTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'

type Props = {
  label?: string
  errorMessage?: () => string | undefined | null
  showCount?: boolean
  isRequired?: boolean
  isInvalid?: boolean
  row?: number
  onChange?: (value: string) => void
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'>

const InputAreaForm = ({ label, row, errorMessage, showCount, isRequired, isInvalid, onChange, className, ...props }: Props) => {
  const message = errorMessage?.()

  return (
    <fieldset className={cn('fieldset w-full py-0', className)}>
      {label && (
        <legend className='fieldset-legend pb-1 text-sm font-medium'>
          {label}
          {isRequired && <span className='text-error'>*</span>}
        </legend>
      )}
      <textarea
        {...props}
        aria-invalid={isInvalid || !!message}
        className={cn('textarea w-full', (isInvalid || message) && 'textarea-error')}
        required={isRequired}
        rows={row}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {showCount && (
        <div className='pointer-events-none text-end text-xs opacity-50'>
          {String(props?.value ?? '').length}/{props?.maxLength ?? '∞'}
        </div>
      )}
      {message && <p className='text-sm text-error'>{message}</p>}
    </fieldset>
  )
}

export default InputAreaForm
