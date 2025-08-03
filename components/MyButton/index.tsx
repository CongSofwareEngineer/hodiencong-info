import { Button, ButtonProps } from '@heroui/button'
import { MouseEventHandler } from 'react'

import { cn } from '@/utils/tailwind'

type props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: ButtonProps['color'] | 'outline'
} & Omit<ButtonProps, 'color'>

const MyButton = ({ color = 'default', ...props }: props) => {
  return (
    <Button
      {...props}
      className={cn('min-h-12 text-base', props?.className, props?.disabled ? 'opacity-70 cursor-not-allowed' : '')}
      color={color as any}
    />
  )
}

export default MyButton
