import React, { useEffect } from 'react'
import { Drawer, DrawerContent, DrawerHeader, DrawerBody } from '@heroui/drawer'

import { drawer as drawerZustand } from '@/zustand/drawer'
import { cn } from '@/utils/tailwind'

const MyDrawer = () => {
  const { drawer, closeDrawer } = drawerZustand((state) => state)

  useEffect(() => {
    if (drawer?.isOpen) {
      document.documentElement.style.scrollbarGutter = ''

      document.documentElement.style.removeProperty('scrollbar-gutter')
    }
  }, [drawer])

  return (
    <Drawer
      {...drawer}
      key={`drawer-${drawer?.isOpen}`}
      className='Drawer'
      classNames={{
        closeButton: 'w-5 h-5',
        ...drawer?.classNames,
      }}
      onOpenChange={(open) => {
        if (open === false) {
          closeDrawer()
          document.body.style.removeProperty('overflow')
        } else {
          document.body.style.overflow = 'hidden'
        }
      }}
    >
      <DrawerContent
        className={cn(
          'w-full  max-h-[calc(100dvh-70px)] pb-5',
          drawer?.placement === 'bottom' || drawer?.placement === 'top' ? ' ' : 'rounded-none',
          drawer?.classNames?.base
        )}
      >
        {drawer?.title && (
          <DrawerHeader className={cn('flex flex-col gap-1 dark:text-white', drawer?.classNames?.header)}>{drawer?.title}</DrawerHeader>
        )}
        <DrawerBody className={cn('overflow-auto  ')}>{drawer?.children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default MyDrawer
