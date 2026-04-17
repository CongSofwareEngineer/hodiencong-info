import { Button, ButtonProps, Spinner } from '@heroui/react'
import { MouseEventHandler } from 'react'

import { cn } from '@/utils/tailwind'

type props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: ButtonProps['variant']
  isLoading?: boolean
  // color?: Button['color'] | 'outline'
} & ButtonProps
// } & Omit<ButtonProps, 'color'>

const MyButton = ({ color = 'primary', isLoading, ...props }: props) => {
  return (
    <Button
      {...props}
      isPending={isLoading}
      variant={props?.variant || color}
      className={cn('min-h-12 text-base', props?.className, props?.isDisabled || isLoading ? 'opacity-70 cursor-not-allowed' : '')}
      // color={color as any}
    >
      {({ isPending }) => (
        <>
          {isPending ? <Spinner color='current' size='sm' /> : null}
          {props.children}
        </>
      )}
    </Button>
  )
}

export default MyButton
