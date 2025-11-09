import { Code2, Database, ExternalLink, Globe, Smartphone, Trophy } from 'lucide-react'

import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import { images } from '@/config/images'
import useLanguage from '@/hooks/useLanguage'
import useMedia from '@/hooks/useMedia'
import { viewExternal } from '@/utils/functions'

const Badge = ({ text }: { text: string }) => {
  return <span className=' py-1 px-4 rounded-2xl bg-blue-100 dark:bg-blue-900/30 text-blue-700 text-[13px] dark:text-blue-300'>{text}</span>
}
const Projects = () => {
  const { translate } = useLanguage()
  const { isMobile } = useMedia()
  const renderList = () => {
    const arr = [
      {
        link: 'https://x402-premium.vercel.app/premium',
        title: 'x402 Premium',
        category: 'web',
        description: 'x402 Premium is a Web3 membership platform that offers exclusive benefits and rewards to its members.',
        image: images.home.project.keyringSmart,
        technologies: ['Nextjs', 'MongoDB', 'AWS'],
        year: '2025',
      },
      {
        link: 'https://smart.keyring.app/',
        title: 'Keyring Smart',
        category: 'web',
        description: 'Keyring Smart enables a broader audience to easily and safely explore the world of crypto & Web3.',
        image: images.home.project.keyringSmart,
        technologies: ['Nextjs', 'Node.js', 'MongoDB', 'AWS'],
        year: '2024',
      },
      {
        link: 'https://nft.keyring.app/',
        title: 'NFT Viewer',
        category: 'web',
        description: 'A powerful platform to view, manage, and list NFTs across multiple marketplaces with ease.',
        image: images.home.project.nftViewer,
        technologies: ['Nextjs', 'Node.js', 'MongoDB', 'AWS'],
        year: '2023',
      },
      {
        title: 'BountyKind',
        category: 'web',
        link: 'https://bountykinds.com',
        description: 'A gaming platform offering a variety of NFT-powered games and assets.',
        image: images.home.project.bkind,
        technologies: ['Nextjs', 'Node.js', 'MongoDB', 'AWS', 'Unity'],
        year: '2022',
      },
      {
        title: 'App Keyring pro',
        category: 'mobile',
        link: 'https://keyring.app/',
        description: 'A secure and seamless multi-chain crypto wallet for managing digital assets on the go.',
        image: images.home.project.keyring,
        technologies: ['ReactNative', 'Node.js', 'MongoDB'],
        year: '2021',
      },
      {
        title: 'TC Store',
        category: 'web',
        link: 'https://tcstore.vercel.app/',
        description: 'A modern e-commerce store offering premium shoes, electronics, coffee, bonsai, and more.',
        image: images.home.project.tcStore,
        technologies: ['Nextjs', 'Node.js', 'MongoDB', 'Vercel'],
        year: '2024',
        isReference: true,
      },
      {
        title: 'API TC Store',
        category: 'api',
        link: 'https://exuberant-jade-diencong-6e4aa722.koyeb.app/docs',
        description: 'Api service for TC Store',
        image: images.home.project.apiTcStore,
        technologies: ['Nestjs', 'MongoDB', 'Koyeb'],
        year: '2024',
      },
    ]

    return (
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 animate-scale-in gap-8  w-full'>
        {arr.map((project, index) => (
          <div
            key={`experience-${index}`}
            className='group hover:translate-y-[-8px] transition-all duration-700 bg-white flex flex-col dark:bg-gray-800 rounded-3xl border border-white/50 dark:border-gray-700/30 shadow-2xl backdrop-blur-sm'
          >
            <div
              key={`project.id-${index}`}
              className='  bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl hover:shadow-3xl transition-all duration-700 border border-white/20 dark:border-gray-700/30 rounded-tr-3xl rounded-tl-3xl overflow-hidden  '
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
                {!isMobile && (
                  <p className='text-gray-600 text-sm dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300'>
                    {project.description}
                  </p>
                )}
              </div>

              <div>
                <h4 className=' text-base flex items-center font-medium text-gray-900 dark:text-white mb-3  '>
                  <Code2 className='w-5 h-5 mr-2 text-blue-600' />
                  {`${translate('home.project.techStack')} :`}
                </h4>
                <div className='flex flex-wrap gap-2'>
                  {project.technologies.map((tech) => (
                    <Badge key={tech} text={tech} />
                  ))}
                </div>
              </div>

              <div className='flex flex-1 justify-end items-end'>
                <MyButton
                  className='flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group'
                  onClick={(e: any) => {
                    viewExternal(project.link)
                    e.stopPropagation()
                  }}
                >
                  <span className='flex items-center justify-center'>
                    <ExternalLink className='w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300' />
                    {translate('placeholder.viewDetail')}
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
    <div className='pt-20  flex w-full flex-col items-center justify-center md:gap-6 gap-4' id='experience'>
      <div className='inline-flex items-center md:p-8 p-5 bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-cyan-900/30 rounded-full border border-purple-200/50 dark:border-purple-700/50 shadow-lg backdrop-blur-sm  '>
        <Trophy className='w-7 h-7 mr-3 text-purple-600 dark:text-purple-400' />
        <span className='bg-gradient-to-r md:text-2xl text-xl from-purple-700 to-blue-700 dark:from-purple-300 dark:to-blue-300 bg-clip-text text-transparent'>
          {translate('header.experience')}
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
