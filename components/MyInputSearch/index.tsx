import { Input, InputProps, Label, LabelProps, SearchField, SearchFieldGroupProps, SearchFieldProps } from '@heroui/react'
import { ReactNode } from 'react'

import { cn } from '@/utils/tailwind'

type Props = {
  label?: ReactNode
  className?: string
  placeholder?: string
  inputConfig?: InputProps
  labelConfig?: LabelProps
  groupConfig?: SearchFieldGroupProps
  onChange?: (value: string) => void | Promise<void>
} & Omit<SearchFieldProps, 'className' | 'onChange'>

function MyInputSearch({ label, groupConfig, inputConfig, placeholder, className, ...props }: Props) {
  return (
    <SearchField {...(props as any)} className={cn('w-full flex flex-col gap-1', className)}>
      {label && <Label>{label}</Label>}
      <SearchField.Group {...groupConfig}>
        <SearchField.SearchIcon className='size-4 text-gray-400 dark:text-gray-500 shrink-0 mr-1' />
        <Input placeholder={placeholder} {...inputConfig} />
        <SearchField.ClearButton className='text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors' />
      </SearchField.Group>
    </SearchField>
  )
}

export default MyInputSearch
