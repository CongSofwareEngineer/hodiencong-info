import { InputProps, Label, LabelProps, SearchField } from '@heroui/react'
import { ReactNode } from 'react'

import MyInput, { MyInputProps } from '../MyInput'
type Props = {
  label?: ReactNode
} & LabelProps &
  MyInputProps
function MyInputSearch({ label, placeholder, ...props }: Props) {
  return (
    <SearchField {...(props as any)}>
      {label && <Label>{label}</Label>}
      <SearchField.Group>
        <SearchField.SearchIcon />
        <MyInput placeholder={placeholder} {...(props as any)} />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  )
}

export default MyInputSearch
