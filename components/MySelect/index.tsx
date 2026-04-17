import { Select, SelectProps, ListBoxItem, ListBox, Label } from '@heroui/react'
import { ReactNode, useEffect } from 'react'

import { cn } from '@/utils/tailwind'

export type OptionSelect = Array<{ label: ReactNode; id: string }>

type Props = {
  options: OptionSelect
  configItem?: any
  hiddenScroll?: boolean
  label?: ReactNode
} & SelectProps<any, any>

const MySelect = ({ options, hiddenScroll = false, configItem, label, ...props }: Props) => {
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
        className={cn(
          'w-full h-10 rounded-[6px] border px-3',
          'bg-white border-gray-200 text-gray-900',
          'dark:bg-gray-800 dark:border-gray-700 dark:text-white',
          'hover:border-gray-400 dark:hover:border-gray-500',
          'data-[focus-visible]:outline-2 data-[focus-visible]:outline-offset-2'
        )}
      >
        <Select.Value className='text-sm' />
        <Select.Indicator className='text-gray-500 dark:text-gray-400' />
      </Select.Trigger>

      <Select.Popover
        offset={4}
        placement='bottom start'
        className={cn(
          'rounded-[6px] border shadow-lg p-1',
          'bg-white border-gray-200',
          'dark:bg-gray-800 dark:border-gray-700'
        )}
      >
        <ListBox className='outline-none'>
          {options.map((item) => (
            <ListBoxItem
              {...configItem}
              id={item.id}
              key={item.id}
              className={cn(
                'flex items-center px-3 py-2 rounded-[4px] text-sm cursor-pointer outline-none transition-colors',
                'text-gray-900 hover:bg-gray-100',
                'dark:text-white dark:hover:bg-gray-700',
                'data-[focused]:bg-gray-100 dark:data-[focused]:bg-gray-700',
                'data-[selected]:bg-primary/10 dark:data-[selected]:bg-primary/20 data-[selected]:font-medium',
                configItem?.className
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
