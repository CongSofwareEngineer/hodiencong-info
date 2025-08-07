import { Zap } from 'lucide-react'

import useLanguage from '@/hooks/useLanguage'

const Info = () => {
  const { translate } = useLanguage()

  return (
    <section className='container md:px-12 px-5 flex w-full flex-col items-center justify-center md:gap-6 gap-4' id='contactMe'>
      <div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-cyan-900/30 rounded-full border border-purple-200/50 dark:border-purple-700/50 shadow-lg backdrop-blur-sm  '>
        <Zap className='w-7 h-7 mr-3 text-purple-600 dark:text-purple-400' />
        <span className='bg-gradient-to-r text-2xl from-purple-700 to-blue-700 dark:from-purple-300 dark:to-blue-300 bg-clip-text text-transparent'>
          {translate('placeholder.professionalSkill')}
        </span>
      </div>

      <h2 className=' text-gray-900 dark:text-white'>
        <span className='bg-gradient-to-r text-center from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent'>
          {translate('home.techAndSkill')}
        </span>
      </h2>
    </section>
  )
}

export default Info
