import { HTMLAttributes } from 'react'

import { cn } from '@/utils/tailwind'

// Card that lifts slightly on hover — pure CSS, no JS work per frame
const HoverCard = ({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...props} className={cn('hover-card', className)}>
      {children}
    </div>
  )
}

export default HoverCard
