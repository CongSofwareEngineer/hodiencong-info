import { Button, ButtonProps, Spinner } from '@heroui/react'
import { MouseEventHandler } from 'react'

import { cn } from '@/utils/tailwind'

type props = {
  onClick?: MouseEventHandler<HTMLButtonElement>
  color?: ButtonProps['variant']
  isLoading?: boolean
} & ButtonProps

const MyButton = ({ color = 'primary', isLoading, ...props }: props) => {
  return (
    <Button
      {...props}
      isPending={isLoading}
      variant={props?.variant || color}
      className={cn(
        'rounded-[6px] min-h-10 text-base font-medium transition-all',
        props?.isDisabled || isLoading ? 'opacity-60 cursor-not-allowed' : '',
        props?.className
      )}
    >
      {({ isPending }) => (
        <>
          {isPending && <Spinner color='current' size='sm' className='mr-1' />}
          {props.children}
        </>
      )}
    </Button>
  )
}

export default MyButton
