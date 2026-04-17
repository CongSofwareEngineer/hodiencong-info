import {
  Select,
  SelectProps,
  ListBoxItem,
  ListBox,
  Label,
  SelectTriggerProps,
  SelectPopoverProps,
  ListBoxProps,
  ListBoxItemProps,
  SelectValueProps,
  ListBoxRootProps,
  SelectIndicatorProps,
  LabelProps,
} from '@heroui/react'
import { ReactNode, useEffect } from 'react'

import { cn } from '@/utils/tailwind'

// export type OptionSelect = Array<{ label: ReactNode; id: string }>
export type OptionSelect = {
  id?: string
  label?: ReactNode
  textValue?: string
  labelConfig?: LabelProps
}

type Props = {
  options: OptionSelect[]
  hiddenScroll?: boolean
  label?: ReactNode
  triggerConfig?: SelectTriggerProps
  popoverConfig?: SelectPopoverProps
  listboxConfig?: ListBoxRootProps<any>
  listBoxItemConfig?: ListBoxItemProps
  valueConfig?: SelectValueProps
  indicatorConfig?: SelectIndicatorProps
} & SelectProps<any, any>

const MySelect = ({
  options,
  valueConfig,
  listboxConfig,
  listBoxItemConfig,
  popoverConfig,
  indicatorConfig,
  hiddenScroll = false,
  label,
  triggerConfig,
  ...props
}: Props) => {
  useEffect(() => {
    if (hiddenScroll) {
      document.documentElement.style.scrollbarGutter = 'unset !important'
    }

    return () => {
      document.documentElement.style.removeProperty('scrollbar-gutter')
    }
  }, [hiddenScroll])

  return (
    <Select {...props} className={cn('w-full', props.className)}>
      {label && <Label aria-label='select'>{label}</Label>}

      <Select.Trigger
        // className={cn(
        //   'w-full h-10 rounded-lg border px-3',
        //   'bg-white border-gray-200 text-gray-900',
        //   'dark:bg-gray-800 dark:border-gray-700 dark:text-white',
        //   'hover:border-gray-400 dark:hover:border-gray-500',
        //   'data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2'
        // )}
        {...triggerConfig}
      >
        <Select.Value {...valueConfig} />
        <Select.Indicator {...indicatorConfig} />
      </Select.Trigger>

      <Select.Popover
        // offset={4}
        // placement='bottom start'
        // className={cn('rounded-lg border shadow-lg p-1', 'bg-white border-gray-200', 'dark:bg-gray-800 dark:border-gray-700')}
        {...popoverConfig}
      >
        <ListBox {...listboxConfig}>
          {options.map((item) => (
            <ListBoxItem
              {...listBoxItemConfig}
              id={item.id}
              key={item.id}
              className={cn(
                'flex items-center px-3 py-2 rounded-[4px] text-sm cursor-pointer outline-none transition-colors',
                'text-gray-900 hover:bg-gray-100',
                'dark:text-white dark:hover:bg-gray-700',
                'data-focused:bg-gray-100 dark:data-focused:bg-gray-700',
                'data-selected:bg-primary/10 dark:data-selected:bg-primary/20 data-selected:font-medium',
                listBoxItemConfig?.className
              )}
            >
              {item.label}
            </ListBoxItem>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}

export default MySelect
