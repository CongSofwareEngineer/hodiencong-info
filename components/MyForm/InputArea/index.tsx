import { FieldError, FieldErrorProps, Label, LabelProps, TextArea, TextAreaProps, TextField, TextFieldProps } from '@heroui/react'

import { cn } from '@/utils/tailwind'

type Props = {
  label?: string
  errorMessage?: () => string | undefined | null
  placeholder?: string
  showCount?: boolean
  inputConfig?: TextAreaProps
  labelConfig?: LabelProps
  errorConfig?: FieldErrorProps
} & TextFieldProps

const InputAreaForm = ({ label, errorMessage, labelConfig, errorConfig, inputConfig, placeholder, showCount, ...props }: Props) => {
  return (
    <TextField validate={() => errorMessage?.()} {...props} className={cn('w-full flex flex-col gap-1', props.className)}>
      {label && (
        <Label {...labelConfig} aria-label={label}>
          {label}
        </Label>
      )}
      <TextArea {...inputConfig} placeholder={placeholder} />
      {showCount && (
        <div className='text-xs text-gray-400 dark:text-gray-500 pointer-events-none'>
          {String(props?.value ?? '').length}/{props?.maxLength ?? '∞'}
        </div>
      )}
      <FieldError {...errorConfig} className='text-sm text-danger mt-0.5' />
    </TextField>
  )
}

export default InputAreaForm
