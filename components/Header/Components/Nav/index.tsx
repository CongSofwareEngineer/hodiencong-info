import BackLink from '@/app/(Components)/BackLink'
import { InfoIcon } from '@/components/Icons/Info'
import useDrawer from '@/hooks/useDrawer'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import { cn } from '@/utils/tailwind'

interface Item {
  title: string
  link: string
  icon?: React.ReactNode
}
const ItemMenu = ({ link, title, icon }: Item) => {
  const { closeDrawer } = useDrawer()
  const { isMobile } = useMedia()

  return (
    <BackLink
      className={cn(
        'relative px-4 w-full py-3 text-gray-700 dark:text-gray-300 transition-all duration-300 group',
        !isMobile && 'hover:text-blue-600 dark:hover:text-blue-400 '
      )}
      href={link}
      onClick={() => closeDrawer()}
    >
      <div className='relative z-10 text-lg text-nowrap flex items-center gap-2'>
        {isMobile && icon}
        {title}
      </div>
      {!isMobile && (
        <>
          <div className='absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100' />
          <div className='absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full' />
        </>
      )}
    </BackLink>
  )
}
const Nav = () => {
  const { translate } = useLanguage()

  const NAV_ITEM: Item[] = [
    { title: translate('header.info'), link: '#info', icon: <InfoIcon /> },
    { title: translate('header.skills'), link: '#skills', icon: <InfoIcon /> },
    { title: translate('header.experience'), link: '#experience', icon: <InfoIcon /> },
    { title: translate('header.contact'), link: '#contact-me', icon: <InfoIcon /> },
  ]

  return (
    <nav className='flex min-[850px]:flex-row flex-col items-center gap-2 md:gap-4'>
      {NAV_ITEM.map((item, index) => (
        <ItemMenu key={`menu-nav-${index}`} link={item.link} title={item.title} />
      ))}
    </nav>
  )
}

export default Nav
