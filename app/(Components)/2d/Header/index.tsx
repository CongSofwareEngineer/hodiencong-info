import { images } from '@/common/images'
import MyImage from '@/components/MyImage'
import { OBSERVER_KEY } from '@/constant/observer'
import useMedia from '@/hook/useMedia'
import useModalDrawer from '@/hook/useModalDrawer'
import ObserverService from '@/services/observer'
import { MenuOutlined } from '@ant-design/icons'
import Link from 'next/link'
import React from 'react'

const Item = ({ title, keyType }: { title: string; keyType: OBSERVER_KEY }) => {
  const { closeModalDrawer } = useModalDrawer()
  const handleScrollMenu = (key: OBSERVER_KEY) => {
    closeModalDrawer()
    ObserverService.emit(key)
  }
  return (
    <div
      className="cursor-pointer hover:underline text-medium uppercase md:text-white text-black"
      onClick={() => handleScrollMenu(keyType)}
    >
      {title}
    </div>
  )
}
const Header = () => {
  const { isMobile } = useMedia()
  const { openModalDrawer } = useModalDrawer()

  const handleOpenMenu = () => {
    openModalDrawer({
      content: (
        <div className="flex flex-col gap-3 w-full">
          <Item keyType={OBSERVER_KEY.ScrollToInfo} title="ScrollToInfo" />
          <Item keyType={OBSERVER_KEY.ScrollToSkill} title="Skill" />
          <Item keyType={OBSERVER_KEY.ScrollToExperience} title="Experiences" />
          <Item keyType={OBSERVER_KEY.ScrollToService} title="Service" />
          <Item keyType={OBSERVER_KEY.ScrollToContact} title="Contact" />
        </div>
      ),
      onlyDrawer: true,
      configDrawer: {
        width: '70vw',
        placement: 'right',
      },
    })
  }

  return (
    <header className="h-12 w-full flex items-center gap-3 ">
      <div className="absolute inset-0 z-[-1] select-none flex flex-col flex-wrap">
        <Link
          className="h-0 w-0 opacity-0 z-[-1]"
          href={'https://tcstore.vercel.app/'}
        >
          TC Store
        </Link>
        <Link
          className="h-0 w-0 opacity-0 z-[-1]"
          href={'mailto:hodiencong2000@gmail.com'}
        >
          hodiencong2000@gmail.com
        </Link>
        <Link className="h-0 w-0 opacity-0 z-[-1]" href={'tel:0392225405'}>
          0392225405
        </Link>
        <Link
          className="h-0 w-0 opacity-0 z-[-1]"
          href={'https://github.com/CongSofwareEngineer'}
        >
          CongSofwareEngineer
        </Link>
      </div>
      <div className="container-base  ">
        <div className="container-content flex justify-between items-center h-12 ">
          <div className="h-10 overflow-hidden aspect-square relative rounded-md">
            <div className="absolute-center w-full h-full flex justify-center items-center">
              <MyImage
                alt="logo-name-hodiencong"
                src={images.logoName}
                heightImage="100%"
                widthImage="auto"
                style={{ maxWidth: 'unset' }}
              />
            </div>
          </div>
          <div className=" flex flex-row gap-5 items-end justify-end">
            {isMobile ? (
              <div className="w-full flex justify-end items-end">
                <MenuOutlined
                  onClick={handleOpenMenu}
                  style={{ fontSize: 20, color: 'white' }}
                />
              </div>
            ) : (
              <>
                <Item keyType={OBSERVER_KEY.ScrollToService} title="Service" />
                <Item keyType={OBSERVER_KEY.ScrollToSkill} title="Skill" />
                <Item
                  keyType={OBSERVER_KEY.ScrollToExperience}
                  title="Experiences"
                />
                <Item keyType={OBSERVER_KEY.ScrollToContact} title="Contact" />
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
