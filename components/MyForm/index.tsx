import React from 'react'
import { Form, FormProps } from '@heroui/form'

import { cn } from '@/utils/tailwind'

type Props = Omit<FormProps, 'onSubmit'> & {
  onSubmit?: (data: any) => any
}
const MyForm = ({ ...props }: Props) => {
  return (
    <Form
      {...props}
      className={cn('w-full', props?.className)}
      onSubmit={(e) => {
        e.preventDefault()
        const data = Object.fromEntries(new FormData(e.currentTarget))

        if (props?.onSubmit) {
          props?.onSubmit(data)
        }
      }}
    >
      {props?.children}
    </Form>
  )
}

export default MyForm
