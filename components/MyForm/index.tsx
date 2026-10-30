import React, { FormHTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'

type Props = Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  onSubmit?: (data: any) => any
  validationErrors?: Record<string, string | undefined | null>
}
const MyForm = ({ validationErrors: _validationErrors, ...props }: Props) => {
  return (
    <form
      noValidate
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
    </form>
  )
}

export default MyForm
