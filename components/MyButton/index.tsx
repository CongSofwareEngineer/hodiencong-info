import { Button, ButtonProps } from '@heroui/react/dist/components/button'
import { MouseEventHandler } from 'react'

import { cn } from '@/utils/tailwind'

type props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: string
  // color?: Button['color'] | 'outline'
} & ButtonProps
// } & Omit<ButtonProps, 'color'>

const MyButton = ({ color = 'default', ...props }: props) => {
  return (
    <Button
      {...props}
      className={cn('min-h-12 skeleton-loading text-base', props?.className, props?.disabled ? 'opacity-70 cursor-not-allowed' : '')}
      // color={color as any}
    />
  )
}

export default MyButton
