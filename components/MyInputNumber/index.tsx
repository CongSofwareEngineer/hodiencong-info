import { NumberField, NumberFieldProps } from '@heroui/react'

import { cn } from '@/utils/tailwind'

type Props = Omit<NumberFieldProps, 'onChange'> & {
  onChange?: (value: number) => void
}

const MyInputNumber = ({ onChange, ...props }: Props) => {
  return (
    <NumberField
      {...props}
      className={cn(props?.className)}
      hideStepper={typeof props?.hideStepper === 'boolean' ? props?.hideStepper : true}
      onChange={(value) => onChange?.(value)}
    />
  )
}

export default MyInputNumber
