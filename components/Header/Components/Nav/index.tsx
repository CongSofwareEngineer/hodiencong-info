import Link from 'next/link'

import useDrawer from '@/hooks/useDrawer'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import { cn } from '@/utils/tailwind'

interface Item {
  title: string
  link: string
}
const ItemMenu = ({ link, title }: Item) => {
  const { closeDrawer } = useDrawer()
  const { isMobile } = useMedia()

  return (
    <Link
      className={cn(
        'relative px-4 w-full py-3 text-gray-700 dark:text-gray-300 transition-all duration-300 group',
        !isMobile && 'hover:text-blue-600 dark:hover:text-blue-400 '
      )}
      href={link}
      onClick={() => closeDrawer()}
    >
      <span className='relative z-10 text-lg'>{title}</span>
      {!isMobile && (
        <>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100' />
          <div className='absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full' />
        </>
      )}
    </Link>
  )
}
const Nav = () => {
  const { translate } = useLanguage()

  const NAV_ITEM: Item[] = [
    { title: translate('header.home'), link: '#home' },
    { title: translate('header.contact'), link: '#contactMe' },
    { title: translate('header.skills'), link: '#skills' },
    { title: translate('header.experience'), link: '#experience' },
    { title: translate('header.info'), link: '#info' },
  ]

  return (
    <nav className='items-center flex min-[850px]:flex-row flex-col md:gap-8'>
      {NAV_ITEM.map((item, index) => (
        <ItemMenu key={index} link={item.link} title={item.title} />
      ))}
    </nav>
  )
}

export default Nav
