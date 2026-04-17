import { FieldError, Label, TextField, TextFieldProps } from '@heroui/react'

import MyInput, { MyInputProps } from '@/components/MyInput'
import { cn } from '@/utils/tailwind'

type Props = {
  label?: string
  errorMessage?: () => string | undefined | null
  placeholder?: string
  inputConfig?: MyInputProps
  classNames?: {
    container?: string
    label?: string
    error?: string
  }
} & TextFieldProps

const InputForm = ({ label, errorMessage, placeholder, inputConfig, ...props }: Props) => {
  return (
    <TextField validate={() => errorMessage?.()} {...props} className={cn('w-full flex flex-col gap-1', props.classNames?.container)}>
      {label && (
        <Label aria-label={label} className={cn(props.classNames?.label)}>
          {label}
        </Label>
      )}
      <MyInput placeholder={placeholder} {...inputConfig} />
      <FieldError className={cn('text-sm text-danger mt-0.5', props.classNames?.error)} />
    </TextField>
  )
}

export default InputForm
