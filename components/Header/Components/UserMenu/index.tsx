'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'

import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import { LogOutIcon } from '@/components/Icons/Functions/LogOut'
import { PaymentIcon } from '@/components/Icons/Payment'
import { UserCircleIcon } from '@/components/Icons/UserCircle'
import useLanguage from '@/hooks/useLanguage'
import useUser from '@/hooks/useUser'
import useMedia from '@/hooks/useMedia'
import { DownloadIcon } from '@/components/Icons/Download'
import { ExternalLinkIcon } from '@/components/Icons/ExternalLink'
import { viewExternal } from '@/utils/functions'
import { LINK_CONTACT } from '@/constants/app'
import useDrawer from '@/hooks/useDrawer'
import MyDropDown, { OptionDropDown } from '@/components/MyDropDown'

const UserMenu = () => {
  const { user, setUser } = useUser()
  const { translate } = useLanguage()
  const router = useRouter()
  const { isMobile } = useMedia()
  const { closeDrawer } = useDrawer()

  const handleLogout = () => {
    setUser(null)
    router.push('/')
  }

  if (!user) {
    // return (
    //   <MyButton
    //     className='h-10 min-h-unit-10 rounded-xl border-none bg-linear-to-r from-blue-600 to-indigo-600 px-6 font-medium text-white shadow-md transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg'
    //     onClick={() => router.push('/login')}
    //   >
    //     {translate('common.login') || 'Login'}
    //   </MyButton>
    // )
    return <></>
  }

  const renderDesktop = () => {
    const options: OptionDropDown[] = [
      {
        key: 'info',
        label: (
          <div className='flex gap-2  items-center w-full  pb-2 border-b border-gray-200 dark:border-gray-800'>
            <UserCircleIcon className='h-6 w-6  text-blue-500' />

            <div className='flex flex-col w-full'>
              <p className='text-xs text-gray-500 dark:text-gray-400'>Signed in as</p>
              <p className='max-w-[150px] truncate font-bold text-blue-600 dark:text-blue-400'>{user.name || user.email || 'User'}</p>
            </div>
          </div>
        ),
        onClick: () => router.push('/'),
      },
      {
        key: 'accounts',
        label: translate('accounts.title'),
        onClick: () => router.push('/accounts'),
        icon: <UserCircleIcon className='h-5 w-5 my-1 text-blue-500' />,
      },
      {
        key: 'account-clouds',
        label: translate('accountClouds.title'),
        onClick: () => router.push('/account-clouds'),
        icon: <UserCircleIcon className='h-5 w-5 my-1 text-green-500' />,
      },
      {
        key: 'finances',
        label: translate('finances.title'),
        onClick: () => router.push('/finances'),
        icon: <PaymentIcon className='h-5 w-5 my-1 text-blue-500' />,
      },
      {
        key: 'logout',
        label: (
          <div className='flex gap-2 p-2    items-center w-full  pb-2 border-t border-gray-200 dark:border-gray-800'>
            <LogOutIcon className='h-5 text-danger w-5 my-1' />

            {translate('common.logout') || 'Logout'}
          </div>
        ),
        onClick: handleLogout,
        className: 'text-danger p-0',
      },
    ]

    return (
      <MyDropDown options={options}>
        <div className='relative h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-lg transition-transform duration-300 group-hover:scale-105 dark:border-gray-700'>
          {user.avatar ? (
            <MyImage alt={user.name || 'User'} className='h-full w-full object-cover' src={user.avatar} />
          ) : (
            <div className='flex h-full w-full items-center justify-center text-white'>
              <UserCircleIcon className='h-6 w-6' />
            </div>
          )}
        </div>
      </MyDropDown>
      // <Dropdown className='border shadow-2xl dark:border-gray-800 dark:bg-gray-900'>
      //   {/* <Dropdown className='border shadow-2xl dark:border-gray-800 dark:bg-gray-900'  placement='bottom-end'> */}
      //   <DropdownTrigger>
      //     <button className='group flex items-center gap-2 rounded-full p-1 transition-all outline-none hover:bg-gray-100 dark:hover:bg-gray-800'>
      //       <div className='relative h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 shadow-lg transition-transform duration-300 group-hover:scale-105 dark:border-gray-700'>
      //         {user.avatar ? (
      //           <MyImage alt={user.name || 'User'} className='h-full w-full object-cover' src={user.avatar} />
      //         ) : (
      //           <div className='flex h-full w-full items-center justify-center text-white'>
      //             <UserCircleIcon className='h-6 w-6' />
      //           </div>
      //         )}
      //       </div>
      //     </button>
      //   </DropdownTrigger>
      //   <DropdownMenu aria-label='User Actions' className='p-2'>
      //     {/* <DropdownMenu aria-label='User Actions' className='p-2' variant='flat'> */}
      //     <DropdownItem key='profile' className='h-14 cursor-default gap-2 opacity-100' textValue={user.name || user.email || 'User'}>
      //       <p className='text-xs text-gray-500 dark:text-gray-400'>Signed in as</p>
      //       <p className='max-w-[150px] truncate font-bold text-blue-600 dark:text-blue-400'>{user.name || user.email || 'User'}</p>
      //     </DropdownItem>

      //     <DropdownItem
      //       key='accounts'
      //       // showDivider
      //       className='transition-colors dark:text-white light:text-b hover:bg-blue-50 dark:hover:bg-blue-900/20'
      //       // startContent={<UserCircleIcon className='h-5 w-5 my-1 text-blue-500' />}
      //       onClick={() => router.push('/accounts')}
      //     >
      //       {translate('accounts.title')}
      //     </DropdownItem>

      //     <DropdownItem
      //       key='account-clouds'
      //       className='transition-colors dark:text-white light:text-b hover:bg-purple-50 dark:hover:bg-purple-900/20'
      //       // startContent={<PaymentIcon className='h-5 w-5 my-1 text-purple-500' />}
      //       onClick={() => router.push('/account-clouds')}
      //     >
      //       {translate('accountClouds.title')}
      //     </DropdownItem>

      //     <DropdownItem
      //       key='finances'
      //       // showDivider
      //       className='transition-colors dark:text-white light:text-b hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
      //       // startContent={<PaymentIcon className='h-5 w-5 my-1 text-emerald-500' />}
      //       onClick={() => router.push('/finances')}
      //     >
      //       {translate('finances.title')}
      //     </DropdownItem>

      //     <DropdownItem
      //       key='logout'
      //       className='text-danger transition-colors'
      //       // color='danger'
      //       // startContent={<LogOutIcon className='h-5 w-5 my-1' />}
      //       onClick={handleLogout}
      //     >
      //       {translate('common.logout') || 'Logout'}
      //     </DropdownItem>
      //   </DropdownMenu>
      // </Dropdown>
    )
  }

  const renderMobile = () => {
    return (
      <div className='flex flex-col gap-2'>
        <Link className='text-lg text-nowrap text-gray-700 px-4 w-full py-3 dark:text-gray-300 ' href='/accounts'>
          {translate('accounts.title')}
        </Link>
        <Link className='text-lg text-nowrap text-gray-700 px-4 w-full py-3 dark:text-gray-300 ' href='/account-clouds'>
          {translate('accountClouds.title')}
        </Link>
        <Link className='text-lg text-nowrap text-gray-700 px-4 w-full py-3 dark:text-gray-300 ' href='/finances'>
          {translate('finances.title')}
        </Link>
        <MyButton
          className='relative md:min-h-12 min-h-min md:py-2.5 bg-linear-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-6  rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group overflow-hidden'
          onClick={() => {
            viewExternal(LINK_CONTACT.CV)
            closeDrawer()
          }}
        >
          <div className='absolute inset-0 bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
          <span className='relative z-10 flex items-center'>
            <DownloadIcon className='w-4 h-4 mr-2 group-hover:animate-bounce' />
            CV
            <ExternalLinkIcon className='w-4 h-4 ml-2 group-hover:rotate-12 transition-transform duration-300' />
          </span>
        </MyButton>
        <MyButton className='w-full mt-4' onClick={handleLogout}>
          {translate('common.logout') || 'Logout'}
        </MyButton>
      </div>
    )
  }

  return isMobile ? renderMobile() : renderDesktop()
}

export default UserMenu
