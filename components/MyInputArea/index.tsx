import { TextArea, TextAreaProps } from '@heroui/react'

import { cn } from '@/utils/tailwind'

type MyInputAreaProps = {
  showCount?: boolean
  onChange?: (value: string) => void | Promise<void>
} & Omit<TextAreaProps, 'onChange'>

const MyInputArea = ({ showCount = false, ...props }: MyInputAreaProps) => {
  return (
    <div className='relative w-full'>
      <TextArea {...(props as any)} className={cn(props?.className)} onChange={(e: any) => props?.onChange?.(e.target.value?.toString() || '')} />
      {showCount && (
        <div className='absolute bottom-2 right-3 text-xs text-gray-400 dark:text-gray-500 pointer-events-none'>
          {String(props?.value ?? '').length}/{props?.maxLength ?? '∞'}
        </div>
      )}
    </div>
  )
}

export default MyInputArea
