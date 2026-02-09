import { Input, InputProps } from '@heroui/input'
import { useState } from 'react'

import { EyeSlashIcon } from '../Icons/EyeSlash'
import { EyeIcon } from '../Icons/Eye'

import useTheme from '@/zustand/theme'
import { cn } from '@/utils/tailwind'

const MyInput = ({ ...props }: InputProps) => {
  const { isDarkMode } = useTheme()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Input
      {...props}
      // className={cn('data-[has-label=true]:mt-[30px]', props?.className)}
      classNames={{
        ...props?.classNames,
        label: cn(isDarkMode ? 'dark:!text-white' : '!text-black', 'font-bold text-base top-6 z-[2] ', props?.classNames?.label),
        input: cn(isDarkMode ? 'dark:!text-white dark:!bg-[#364153]' : '!text-black', ' text-base  ', props?.classNames?.input),
        errorMessage: cn('text-start', props?.classNames?.errorMessage),
        inputWrapper: cn(
          'min-h-12 !ring-0  border-[1px] border-gray-300 !bg-gray-50 !ring-transparent',
          isDarkMode ? '!text-white' : '!bg-gray-50 !text-black',
          isDarkMode ? 'dark:!bg-[#364153]' : '!bg-gray-50 !text-black',
          isDarkMode ? 'dark:!border-[#4a5565]' : 'border-gray-300',
          isDarkMode
            ? 'dark:group-data-[focus-visible=true]:bg-[#364153] dark:group-data-[focus=true]:!bg-[#364153] dark:group-data-[hover=true]:!bg-[#364153]'
            : 'group-data-[focus-visible=true]:bg-gray-50 group-data-[focus=true]:!bg-gray-50group-data-[hover=true]:!bg-gray-50',

          props?.classNames?.inputWrapper
        ),
      }}
      endContent={
        props?.type === 'password' ? (
          <button className='focus:outline-none' type='button' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeSlashIcon className='text-[20px]' /> : <EyeIcon className='text-[20px]' />}
          </button>
        ) : null
      }
      labelPlacement={props?.labelPlacement ?? 'outside'}
      type={props?.type === 'password' ? (showPassword ? 'text' : 'password') : props?.type}
    />
  )
}

export default MyInput
