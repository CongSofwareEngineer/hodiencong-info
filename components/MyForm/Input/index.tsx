import { FieldError, Label, TextField, TextFieldProps } from '@heroui/react'

import MyInput from '@/components/MyInput'
import { cn } from '@/utils/tailwind'

type Props = {
  label?: string
  errorMessage?: () => string | undefined | null
  placeholder?: string
} & TextFieldProps

const InputForm = ({ label, errorMessage, placeholder, ...props }: Props) => {
  return (
    <TextField
      validate={() => errorMessage?.()}
      {...props}
      className={cn('w-full flex flex-col gap-1', props.className)}
    >
      {label && <Label aria-label={label}>{label}</Label>}
      <MyInput placeholder={placeholder} />
      <FieldError className='text-sm text-danger mt-0.5' />
    </TextField>
  )
}

export default InputForm
