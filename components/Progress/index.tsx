import { HTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'

interface Props extends HTMLAttributes<HTMLDivElement> {
  value?: number
}

const Progress = ({ value = 0, ...props }: Props) => {
  return (
    <div
      {...props}
      className={cn(
        'w-full h-2 rounded-full overflow-hidden',
        'bg-gray-200 dark:bg-gray-700',
        props.className
      )}
    >
      <div
        className={cn(
          'h-full rounded-full transition-all duration-300 ease-out',
          'bg-primary dark:bg-primary'
        )}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export default Progress
