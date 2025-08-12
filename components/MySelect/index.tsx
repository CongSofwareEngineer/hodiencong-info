import { Select, SelectProps, SelectItem, SelectItemProps } from '@heroui/select'
import { ReactNode, useEffect } from 'react'

export type OptionSelect = Array<{ label: ReactNode; key: string }>
type Props = {
  options: OptionSelect
  configItem?: SelectItemProps
  hiddenScroll?: boolean
} & Omit<SelectProps, 'children'> & {
    children?: ReactNode
  }
const MySelect = ({ options, hiddenScroll = false, configItem, ...props }: Props) => {
  useEffect(() => {
    if (hiddenScroll) {
      document.documentElement.style.scrollbarGutter = 'unset !important'
    }

    return () => {
      document.documentElement.style.removeProperty('scrollbar-gutter')
    }
  }, [hiddenScroll])

  return (
    <Select {...props}>
      {options.map((animal) => (
        <SelectItem {...configItem} key={animal.key}>
          {animal.label}
        </SelectItem>
      ))}
    </Select>
  )
}

export default MySelect
