import { HtmlHTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'

type Props = HtmlHTMLAttributes<SVGSVGElement>

export const ArrowUpIcon = ({ ...props }: Props) => {
  return (
    <svg
      className={cn('size-6', props.className)}
      fill='none'
      stroke='currentColor'
      strokeWidth={1.5}
      viewBox='0 0 24 24'
      xmlns='http://www.w3.org/2000/svg'
      {...props}
    >
      <path d='m4.5 15.75 7.5-7.5 7.5 7.5' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}
