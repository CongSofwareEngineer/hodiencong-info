import { Button, ButtonProps, Spinner } from '@heroui/react'
import { MouseEventHandler, ReactNode } from 'react'

import { cn } from '@/utils/tailwind'

type props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: ButtonProps['variant']
  isLoading?: boolean
  startContent?: ReactNode
} & ButtonProps

const MyButton = ({ color = 'primary', startContent = <></>, isLoading, ...props }: props) => {
  return (
    <Button
      {...props}
      isPending={isLoading}
      variant={props?.variant || color}
      className={cn(
        'rounded-lg flex items-center justify-center gap-1.5 text-base font-medium transition-all',
        props?.isDisabled || isLoading ? 'opacity-60 cursor-not-allowed' : '',
        props?.className
      )}
    >
      {({ isPending }) => (
        <>
          {isPending && <Spinner color='current' size='sm' className='mr-1' />}
          {startContent}
          {props.children}
        </>
      )}
    </Button>
  )
}

export default MyButton
