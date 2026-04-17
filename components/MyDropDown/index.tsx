import { Button, Dropdown, DropdownItemProps, DropdownMenuProps, DropdownPopoverProps, DropdownProps, Label, LabelProps } from '@heroui/react'
import { ReactNode } from 'react'
type OptionSelect = {
  id?: string
  label?: ReactNode
  textValue?: string
  labelConfig?: LabelProps
} & DropdownItemProps

type Props = {
  options: OptionSelect[]
  menuConfig?: DropdownMenuProps<any>
  popoverConfig?: DropdownPopoverProps
  value?: ReactNode
} & DropdownProps

export function MyDropDown({ options, menuConfig, popoverConfig, value, ...props }: Props) {
  return (
    <Dropdown {...props}>
      <Button aria-label='Menu Dropdown' variant='secondary'>
        {value}
      </Button>
      <Dropdown.Popover {...popoverConfig}>
        <Dropdown.Menu {...menuConfig}>
          {options.map((option) => (
            <Dropdown.Item {...option} key={option.id} id={option.id} textValue={option.textValue}>
              <Label aria-label={option.textValue} {...option.labelConfig}>
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
