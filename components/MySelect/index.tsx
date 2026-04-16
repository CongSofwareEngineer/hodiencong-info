import { Select, SelectPopover, SelectProps, ListBoxItem, ListBox } from '@heroui/react'
import { ReactNode, useEffect } from 'react'
export type OptionSelect = Array<{ label: ReactNode; key: string }>
type Props = {
  options: OptionSelect
  configItem?: ListBoxItem
  hiddenScroll?: boolean
} & Omit<ListBoxItem, 'children'> & {
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
      <SelectPopover>
        <ListBox>
          {options.map((animal) => (
            <ListBoxItem {...configItem} key={animal.key}>
              {animal.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </SelectPopover>
    </Select>
  )
}

export default MySelect
