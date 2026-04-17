import { Label, NumberField, NumberFieldProps } from '@heroui/react'

import { cn } from '@/utils/tailwind'

type Props = Omit<NumberFieldProps, 'onChange'> & {
  onChange?: (value: number) => void | Promise<void>
  label?: string
  errorMessage?: () => string | undefined | null
  placeholder?: string
  classNames?: {
    container?: string
    label?: string
    error?: string
  }
  defaultValue?: number
  minValue?: number
  maxValue?: number
}

const MyInputNumber = ({ onChange, ...props }: Props) => {
  return (
    <NumberField
      onChange={(value) => onChange?.(value)}
      className='w-full max-w-64'
      defaultValue={props.defaultValue}
      minValue={props.minValue}
      maxValue={props.maxValue}
      name={props.name}
    >
      {props?.label && <Label aria-label={`label input number ${props?.name}`}>{props.label}</Label>}
      <NumberField.Group>
        {/* <NumberField.DecrementButton /> */}
        <NumberField.Input className='w-[120px]' />
        {/* <NumberField.IncrementButton /> */}
      </NumberField.Group>
    </NumberField>
  )
}

export default MyInputNumber
