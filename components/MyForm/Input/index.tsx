import { FieldError, Label, TextField, TextFieldProps, InputProps, Input, LabelProps, FieldErrorProps } from '@heroui/react'

import { cn } from '@/utils/tailwind'

type Props = {
  label?: string
  errorMessage?: () => string | undefined | null
  placeholder?: string
  inputConfig?: InputProps
  labelConfig?: LabelProps
  errorConfig?: FieldErrorProps
} & TextFieldProps

const InputForm = ({ label, errorMessage, labelConfig, errorConfig, placeholder, inputConfig, ...props }: Props) => {
  return (
    <TextField validate={() => errorMessage?.()} {...props} className={cn('w-full flex flex-col gap-1 mb-0', props.className)}>
      {label && (
        <Label aria-label={props.name} {...labelConfig}>
          {label}
        </Label>
      )}
      <Input placeholder={placeholder} {...inputConfig} className={cn('flex-1', inputConfig?.className)} />
      <FieldError {...errorConfig} className={cn('text-sm text-danger mt-0.5', errorConfig?.className)} />
    </TextField>
  )
}

export default InputForm
