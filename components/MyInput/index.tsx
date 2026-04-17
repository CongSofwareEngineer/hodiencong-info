import { Input, InputGroup, InputGroupPrefixProps, InputGroupProps, InputGroupSuffixProps, InputProps } from '@heroui/react'
import { useState } from 'react'

import { EyeSlashIcon } from '../Icons/EyeSlash'
import { EyeIcon } from '../Icons/Eye'

import { cn } from '@/utils/tailwind'

export type MyInputProps = {
  onChange?: (value: string) => void | Promise<void>
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  prefixConfig?: InputGroupPrefixProps
  suffixConfig?: InputGroupSuffixProps
  type?: string
  placeholder?: string
  value?: string
} & Omit<InputGroupProps, 'onChange' | 'value'>

const MyInput = ({ prefixConfig, placeholder, suffixConfig, ...props }: MyInputProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = props?.type === 'password'

  return (
    <InputGroup {...(props as any)} className={props?.className}>
      {props?.leftIcon && <InputGroup.Prefix {...prefixConfig}>{props?.leftIcon}</InputGroup.Prefix>}
      <InputGroup.Input
        {...(props as any)}
        placeholder={placeholder}
        onChange={(e) => props?.onChange?.(e.target.value?.toString() || '')}
        className={cn(props?.className)}
        type={isPassword ? (showPassword ? 'text' : 'password') : props?.type}
      />
      {(isPassword || props?.rightIcon) && (
        <InputGroup.Suffix {...suffixConfig}>
          {isPassword ? (
            <button
              className='focus:outline-none text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-200 transition-colors'
              type='button'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlashIcon className='size-5' /> : <EyeIcon className='size-5' />}
            </button>
          ) : (
            props?.rightIcon
          )}
        </InputGroup.Suffix>
      )}
    </InputGroup>
  )
}

export default MyInput
