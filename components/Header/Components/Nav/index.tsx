import BackLink from '@/app/(Components)/BackLink'
import useDrawer from '@/hooks/useDrawer'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import useUser from '@/hooks/useUser'
import { cn } from '@/utils/tailwind'

interface Item {
  title: string
  link: string
}
const ItemMenu = ({ link, title }: Item) => {
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
      <div className='relative z-10 text-lg text-nowrap '>{title}</div>
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
  const { user } = useUser()

  const NAV_ITEM: Item[] = [
    { title: translate('header.info'), link: '#info' },
    { title: translate('header.contact'), link: '#contact-me' },
    { title: translate('header.skills'), link: '#skills' },
    { title: translate('header.experience'), link: '#experience' },
    { title: translate('home.socialMedia.title'), link: '#social-media' },
    ...(user ? [{ title: translate('accounts.title'), link: '/accounts' }] : []),
    ...(user ? [{ title: translate('accountClouds.title'), link: '/account-clouds' }] : []),
    ...(user ? [{ title: translate('finances.title'), link: '/finances' }] : []),
  ]

  return (
    <nav className='items-center flex min-[850px]:flex-row flex-col md:gap-8'>
      {NAV_ITEM.map((item, index) => (
        <ItemMenu key={`menu-nav-${index}`} link={item.link} title={item.title} />
      ))}
    </nav>
  )
}

export default Nav
