import { Label, LabelProps, SearchField } from '@heroui/react'
import { ReactNode } from 'react'

import MyInput, { MyInputProps } from '../MyInput'

import { cn } from '@/utils/tailwind'

type Props = {
  label?: ReactNode
  className?: string
} & Omit<LabelProps, 'className' | 'onChange'> &
  MyInputProps

function MyInputSearch({ label, placeholder, className, ...props }: Props) {
  return (
    <SearchField {...(props as any)} className={cn('w-full flex flex-col gap-1', className)}>
      {label && <Label>{label}</Label>}
      <SearchField.Group
        className={cn(
          'flex items-center rounded-[6px] border px-2 h-10',
          'bg-white border-gray-200',
          'dark:bg-gray-800 dark:border-gray-700',
          'focus-within:border-primary dark:focus-within:border-primary'
        )}
      >
        <SearchField.SearchIcon className='size-4 text-gray-400 dark:text-gray-500 shrink-0 mr-1' />
        <MyInput
          placeholder={placeholder}
          {...(props as any)}
          className='border-0 bg-transparent shadow-none flex-1 h-full'
        />
        <SearchField.ClearButton className='text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors' />
      </SearchField.Group>
    </SearchField>
  )
}

export default MyInputSearch
