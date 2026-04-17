import { Input, InputProps } from '@heroui/react'
import { useState } from 'react'

import { EyeSlashIcon } from '../Icons/EyeSlash'
import { EyeIcon } from '../Icons/Eye'

import { cn } from '@/utils/tailwind'

export type MyInputProps = {
  onChange?: (value: string) => void | Promise<void>
} & Omit<InputProps, 'onChange'>

const MyInput = ({ ...props }: MyInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = props?.type === 'password'

  return (
    <Input
      {...props}
      className={cn(props?.className)}
      onChange={(e) => props?.onChange?.(e.target.value?.toString() || '')}
      type={isPassword ? (showPassword ? 'text' : 'password') : props?.type}
      endContent={
        isPassword ? (
          <button className='focus:outline-none text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors' type='button' onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeSlashIcon className='size-5' /> : <EyeIcon className='size-5' />}
          </button>
        ) : props?.endContent
      }
    />
  )
}

export default MyInput
