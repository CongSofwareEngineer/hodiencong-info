import React from 'react'
import { Checkbox, CheckboxProps } from '@heroui/checkbox'

const MyCheckbox = ({ ...props }: CheckboxProps) => {
  return (
    <Checkbox
      {...props}
      classNames={{
        ...props?.classNames,
        label: '!text-black ',
      }}
    />
  )
}

export default MyCheckbox
