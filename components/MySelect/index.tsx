import { Select, SelectPopover, SelectProps, ListBoxItem, ListBox, Label } from '@heroui/react'
import { ReactNode, useEffect } from 'react'

import { cn } from '@/utils/tailwind'
export type OptionSelect = Array<{ label: ReactNode; id: string }>
type Props = {
  options: OptionSelect
  configItem?: ListBoxItem
  hiddenScroll?: boolean
  label?: ReactNode
} & SelectProps<any, any>
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
    <Select {...props} className={cn(props.className)}>
      {props.label && <Label aria-label={'select'}>{props.label}</Label>}
      <Select.Trigger className={' dark:text-white  dark:bg-gray-800 dark:border-gray-700 border  light:bg-gray-100'}>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover placement='bottom left' className={'  dark:text-white  dark:bg-gray-800 dark:border-gray-700 border  light:bg-gray-100'}>
        <ListBox>
          {options.map((item) => (
            <ListBoxItem className='  rounded-lg' {...configItem} id={item.id} key={item.id}>
              {item.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}

export default MySelect
