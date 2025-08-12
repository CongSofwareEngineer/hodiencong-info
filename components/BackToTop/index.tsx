import { ArrowUp } from 'lucide-react'
import { HTMLAttributes, useEffect, useState } from 'react'

import { scrollTop } from '@/utils/functions'
import { cn } from '@/utils/tailwind'
import useTheme from '@/zustand/theme'

const BackToTop = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const { isDarkMode } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <span
      {...props}
      className={cn(
        isScrolled ? 'opacity-100' : 'opacity-0',
        'fixed md:right-6 right-5 md:bottom-10 bottom-5 bg-gray-200 dark:bg-gray-700 p-2 rounded-full z-50 cursor-pointer transition-all duration-300 hover:bg-gray-300 hover:dark:bg-gray-700',
        isDarkMode ? 'text-white' : 'text-black',
        props.className
      )}
    >
      <ArrowUp size={35} onClick={() => scrollTop()} />
    </span>
  )
}

export default BackToTop
