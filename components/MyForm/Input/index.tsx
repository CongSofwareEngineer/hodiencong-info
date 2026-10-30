import { InputHTMLAttributes, useState } from 'react'

import { cn } from '@/utils/tailwind'

type Props = {
  label?: string
  errorMessage?: () => string | undefined | null
  error?: string
  validate?: (value: string) => string | undefined | null | true
  isRequired?: boolean
  isInvalid?: boolean
  isDisabled?: boolean
  inputConfig?: InputHTMLAttributes<HTMLInputElement>
  onChange?: (value: string) => void
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'>

const InputForm = ({
  label,
  error,
  errorMessage,
  validate,
  isRequired,
  isInvalid,
  isDisabled,
  inputConfig,
  onChange,
  className,
  ...props
}: Props) => {
  const [touched, setTouched] = useState(false)
  const validateResult = touched && validate ? validate(String(props.value ?? '')) : undefined
  const message = error || errorMessage?.() || (typeof validateResult === 'string' ? validateResult : undefined)

  return (
    <fieldset className={cn('fieldset w-full py-0', className)}>
      {label && (
        <legend className='fieldset-legend pb-1 text-sm font-medium'>
          {label}
          {isRequired && <span className='text-error'>*</span>}
        </legend>
      )}
      <input
        {...props}
        {...inputConfig}
        aria-invalid={isInvalid || !!message}
        className={cn('input w-full', (isInvalid || message) && 'input-error', inputConfig?.className)}
        disabled={isDisabled || props.disabled}
        required={isRequired}
        onBlur={(e) => {
          setTouched(true)
          props.onBlur?.(e)
        }}
        onChange={(e) => onChange?.(e.target.value)}
      />
      {message && <p className='text-sm text-error'>{message}</p>}
    </fieldset>
  )
}

export default InputForm
