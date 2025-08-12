import { HTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'
interface Props extends HTMLAttributes<HTMLDivElement> {
  value?: number
}
const Progress = ({ value, ...props }: Props) => {
  return (
    <div {...props} className={cn('w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700', props.className)}>
      <div className='h-full bg-blue-600 rounded-full dark:bg-blue-500' style={{ width: `${value}%` }} />
    </div>
  )
}

export default Progress
