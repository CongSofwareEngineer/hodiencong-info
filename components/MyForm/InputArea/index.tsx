import { FieldError, Label, TextArea, TextField, TextFieldProps } from '@heroui/react'

import { cn } from '@/utils/tailwind'

type Props = {
  label?: string
  errorMessage?: () => string | undefined | null
  placeholder?: string
  showCount?: boolean
} & TextFieldProps

const InputAreaForm = ({ label, errorMessage, placeholder, showCount, ...props }: Props) => {
  return (
    <TextField validate={() => errorMessage?.()} {...props} className={cn('w-full flex flex-col gap-1', props.className)}>
      {label && <Label aria-label={label}>{label}</Label>}
      <TextArea placeholder={placeholder} />
      <FieldError className='text-sm text-danger mt-0.5' />
    </TextField>
  )
}

export default InputAreaForm
