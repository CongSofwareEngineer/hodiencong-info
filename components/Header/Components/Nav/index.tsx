import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { NAV_ROUTES } from '@/constants/profile'
import useDrawer from '@/hooks/useDrawer'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import { cn } from '@/utils/tailwind'

const Nav = () => {
  const { translate } = useLanguage()
  const { closeDrawer } = useDrawer()
  const { isMobile } = useMedia(850)
  const pathName = usePathname()

  return (
    <nav
      className={cn(
        'flex items-center',
        isMobile ? 'w-full flex-col items-stretch gap-1' : 'gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md'
      )}
    >
      {NAV_ROUTES.map((item, index) => {
        const isActive = pathName === item.link

        return (
          <Link
            key={item.key}
            className={cn(
              'relative rounded-full px-4 py-2 text-sm uppercase tracking-[0.15em] transition-all duration-300',
              isMobile && 'flex items-center gap-3 rounded-xl px-4 py-3 text-base text-gray-800 dark:text-gray-100',
              !isMobile && (isActive ? 'bg-white text-black shadow-[0_0_25px_-5px_rgba(251,191,36,0.8)]' : 'text-white/70 hover:text-white'),
              isMobile && isActive && 'bg-amber-400/15 text-amber-600 dark:text-amber-300'
            )}
            href={item.link}
            onClick={() => closeDrawer()}
          >
            {isMobile && <span className='font-mono text-xs opacity-50'>{`0${index + 1}`}</span>}
            {translate(`portfolio.nav.${item.key}`)}
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav
