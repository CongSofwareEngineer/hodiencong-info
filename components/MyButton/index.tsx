import { Button, ButtonProps, Spinner } from '@heroui/react'
import { MouseEventHandler, ReactNode } from 'react'

import { cn } from '@/utils/tailwind'

type props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: ButtonProps['variant']
  startContent?: ReactNode
  isLoading?: boolean
} & ButtonProps

const MyButton = ({ color = 'primary', isLoading = false, startContent = <></>, ...props }: props) => {
  return (
    <Button
      {...props}
      isPending={isLoading || props.isPending}
      variant={props?.variant || color}
      className={cn(
        'rounded-lg flex items-center justify-center gap-1.5 text-base font-medium transition-all',
        props?.isDisabled ? 'opacity-60 cursor-not-allowed' : '',
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
