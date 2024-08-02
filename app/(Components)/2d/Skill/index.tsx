import { images } from '@/common/images'
import useMedia from '@/hook/useMedia'
import React from 'react'
import Item from './Item'
import useAos from '@/hook/useAos'
import CubeSkill from './CubeSkill'

const Skill = () => {
  useAos()
  const { isMobile } = useMedia()

  const renderMobile = () => {
    const list = [
      {
        icon: images.home.iconTech.iconReactjs,
        title: 'React Native',
      },
      {
        icon: images.home.iconTech.iconReactjs,
        title: 'Reactjs',
      },
      {
        icon: images.home.iconTech.iconCss,
        title: 'CSS',
      },
      {
        icon: images.home.iconTech.iconFirebase,
        title: 'Firebase',
      },
      {
        icon: images.home.iconTech.iconHtml,
        title: 'Html',
      },
      {
        icon: images.home.iconTech.iconJs,
        title: 'Javascript',
      },
      {
        icon: images.home.iconTech.iconTailwincss,
        title: 'Tailwincss',
      },
      {
        icon: images.home.iconTech.iconSql,
        title: 'SQL',
      },
    ]
    return (
      <div className="flex flex-col gap-3  px-[20px] pb-5  ">
        <div
          className="font-fast-hand uppercase text-[35px]"
          data-aos="fade-right"
        >
          Skill
        </div>
        <div className="w-full grid sm:grid-cols-2 grid-cols-1 gap-5">
          {list.map((e, index) => {
            return (
              <Item key={`icon-skill-${index}`} icon={e.icon} title={e.title} />
            )
          })}
        </div>
      </div>
    )
  }

  return isMobile ? renderMobile() : <CubeSkill />
}

export default Skill
