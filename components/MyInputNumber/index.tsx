import { InputProps, Label, LabelProps, NumberField, NumberFieldGroupProps, NumberFieldProps } from '@heroui/react'

type Props = {
  onChange?: (value: number) => void | Promise<void>
  label?: string
  inputConfig?: InputProps
  labelConfig?: LabelProps
  groupConfig?: NumberFieldGroupProps
} & Omit<NumberFieldProps, 'onChange'>

const MyInputNumber = ({ onChange, inputConfig, labelConfig, groupConfig, ...props }: Props) => {
  return (
    <NumberField onChange={(value) => onChange?.(value)} {...props}>
      {props?.label && (
        <Label {...labelConfig} aria-label={`label input number ${props?.name}`}>
          {props.label}
        </Label>
      )}
      <NumberField.Group {...groupConfig}>
        {/* <NumberField.DecrementButton /> */}
        <NumberField.Input type='number' {...inputConfig} />
        {/* <NumberField.IncrementButton /> */}
      </NumberField.Group>
    </NumberField>
  )
}

export default MyInputNumber
