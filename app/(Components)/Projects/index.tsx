import { Code2, Database, ExternalLink, Globe, Smartphone, Star, Trophy } from 'lucide-react'

import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import { images } from '@/config/images'
import useLanguage from '@/hooks/useLanguage'

const Badge = ({ text }: { text: string }) => {
  return <span className=' py-1 px-4 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'>{text}</span>
}
const Projects = () => {
  const { translate } = useLanguage()

  const renderList = () => {
    const arr = [
      {
        link: 'https://nft.keyring.app/',
        title: 'NFT Viewer',
        category: 'web',
        description: 'Platform thương mại điện tử hoàn chỉnh với React, Node.js và MongoDB',
        image: images.home.project.keyring,
        technologies: ['Nextjs', 'Node.js', 'MongoDB', 'AWS'],
        features: ['View List NFT', 'Deploy TBA', 'Listing NFT in Opensea', 'Send NFT'],
        year: '2023',
      },
      {
        title: 'App Keyring pro',
        category: 'mobile',
        link: 'https://keyring.app/',
        description: 'KEYRING PRO is a multi-chain  wallet',
        image: images.home.project.nftViewer,
        technologies: ['ReactNative', 'Node.js', 'MongoDB'],
        features: ['Wallet connect', 'Manage Account', 'Smart Account', 'Export NFC Account', 'Swap token'],

        year: '2021',
      },
      {
        title: 'BountyKind',
        category: 'web',
        link: 'https://bountykinds.com',
        description: 'An exciting blockchain gaming ecosystem featuring multiple games to play',
        image: images.home.project.bkind,
        technologies: ['Nextjs', 'Node.js', 'MongoDB', 'AWS', 'Unity'],
        features: ['Wallet connect', 'Scholarship NFT', 'Buy NFT', 'Swap token'],
        year: '2022',
      },
    ]

    return (
      <div className='grid md:grid-cols-2 lg:grid-cols-3 animate-scale-in gap-8 mb-20 w-full'>
        {arr.map((project, index) => (
          <div
            key={index}
            className='group hover:translate-y-[-8px] transition-all duration-700 bg-white flex flex-col dark:bg-gray-800 rounded-3xl border border-white/50 dark:border-gray-700/30 shadow-2xl backdrop-blur-sm'
          >
            <div
              key={`project.id-${index}`}
              className='  bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-700 border border-white/20 dark:border-gray-700/30 rounded-3xl overflow-hidden  '
            >
              <div className='relative  group-hover:scale-110 transition-transform duration-500 overflow-hidden'>
                <MyImage alt={project.title} className='!w-full h-48 object-cover ' src={project.image} />
                <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                {/* Category Icon */}
                <div className='absolute top-4 left-4'>
                  <div className='w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg'>
                    {project.category === 'web' && <Globe className='w-5 h-5 text-blue-600' />}
                    {project.category === 'mobile' && <Smartphone className='w-5 h-5 text-purple-600' />}
                    {project.category === 'api' && <Database className='w-5 h-5 text-green-600' />}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex flex-1 flex-col gap-4 px-4 py-5'>
              <div>
                <div className='flex items-start justify-between mb-2'>
                  <div className='text-xl text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300'>
                    {project.title}
                  </div>
                  <span className='text-xs text-white '>{project.year}</span>
                </div>

                <p className='text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300'>
                  {project.description}
                </p>
              </div>

              <div>
                <h4 className=' text-lg flex items-center font-medium text-gray-900 dark:text-white mb-3  '>
                  <Code2 className='w-5 h-5 mr-2 text-blue-600' />
                  Tech Stack:
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {project.technologies.map((tech) => (
                    <Badge key={tech} text={tech} />
                  ))}
                </div>
              </div>

              <div>
                <h4 className='text-lg font-medium text-gray-900 dark:text-white mb-3 flex items-center'>
                  <Star className='w-4 h-4 mr-2 text-yellow-600' />
                  Tính năng chính:
                </h4>
                <div className='space-y-1'>
                  {project.features.map((feature, idx) => (
                    <div key={idx} className='flex items-center text-sm text-gray-600 dark:text-gray-400'>
                      <div className='w-1.5 h-1.5 bg-green-500 rounded-full mr-2' />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <div className='flex flex-1 justify-end items-end'>
                <MyButton className='flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group'>
                  <span className='flex items-center justify-center'>
                    <ExternalLink className='w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300' />
                    Xem chi tiết
                  </span>
                </MyButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='pt-20  flex w-full flex-col items-center justify-center md:gap-6 gap-4' id='contactMe'>
      <div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-cyan-900/30 rounded-full border border-purple-200/50 dark:border-purple-700/50 shadow-lg backdrop-blur-sm  '>
        <Trophy className='w-5 h-5 mr-3 text-purple-600 dark:text-purple-400' />
        <span className='bg-gradient-to-r from-purple-700 to-blue-700 dark:from-purple-300 dark:to-blue-300 bg-clip-text text-transparent'>
          {translate('home.project.title')}
        </span>
      </div>

      <h2 className=' text-gray-900 dark:text-white'>
        <span className='bg-gradient-to-r text-center from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent'>
          {translate('home.project.subTitle')}
        </span>
      </h2>
      <p className='text-xl text-center text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed'> {translate('home.contactMe.des')}</p>
      {renderList()}
    </div>
  )
}

export default Projects
