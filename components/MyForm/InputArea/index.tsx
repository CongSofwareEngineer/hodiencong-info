import { FieldError, Label, TextArea, TextField, TextFieldProps } from '@heroui/react'

type Props = {
  label: string
  errorMessage?: () => string | undefined | null
  placeholder?: string
  showCount?: boolean
} & TextFieldProps
const InputAreaForm = ({ label, errorMessage, placeholder, ...props }: Props) => {
  return (
    <TextField validate={(e) => errorMessage?.()} {...props}>
      <Label aria-label={label}>{label}</Label>
      <TextArea placeholder={placeholder} />
      <FieldError />
    </TextField>
  )
}

export default InputAreaForm
