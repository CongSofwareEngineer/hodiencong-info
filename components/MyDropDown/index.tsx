import {
  Button,
  Dropdown,
  DropdownItemProps,
  DropdownMenuProps,
  DropdownPopoverProps,
  DropdownProps,
  DropdownTriggerProps,
  Label,
  LabelProps,
} from '@heroui/react'
import { ReactNode } from 'react'

import { cn } from '@/utils/tailwind'

export type OptionDropDown = {
  id?: string
  label?: ReactNode
  textValue?: string
  labelConfig?: LabelProps
  icon?: ReactNode
  className?: string
} & DropdownItemProps

type Props = {
  options: OptionDropDown[]
  menuConfig?: DropdownMenuProps<any>
  popoverConfig?: DropdownPopoverProps
  value?: ReactNode
  triggerConfig?: DropdownTriggerProps
  children?: ReactNode
} & DropdownProps

export function MyDropDown({ options, menuConfig, popoverConfig, value, triggerConfig, children, ...props }: Props) {
  return (
    <Dropdown {...props}>
      <Dropdown.Trigger {...triggerConfig}>{children || value}</Dropdown.Trigger>
      <Dropdown.Popover {...popoverConfig}>
        <Dropdown.Menu {...menuConfig}>
          {options.map((option) => (
            <Dropdown.Item
              {...option}
              className={cn('w-full hover:rounded-[8px]', option.className)}
              key={option.id}
              id={option.id}
              textValue={option.textValue}
            >
              <Label className={cn('flex w-full items-center gap-2', option.className)} aria-label={option.textValue} {...option.labelConfig}>
                {option.icon}
                {option.label}
              </Label>
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
export default MyDropDown
