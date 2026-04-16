import { FieldError, Label, TextField, TextFieldProps } from '@heroui/react'

import MyInput from '@/components/MyInput'
import { cn } from '@/utils/tailwind'
type Props = {
  label: string
  errorMessage?: () => string | undefined | null
  placeholder?: string
} & TextFieldProps
const InputForm = ({ label, errorMessage, placeholder, ...props }: Props) => {
  return (
    <TextField validate={(e) => errorMessage?.()} {...props} className={cn('w-full', props.className)}>
      <Label aria-label={label}>{label}</Label>
      <MyInput placeholder={placeholder} />
      <FieldError />
    </TextField>
  )
}

export default InputForm
