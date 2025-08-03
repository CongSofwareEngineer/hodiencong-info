import { Award, Calendar, Coffee, Mail, MapPin, Sparkles } from 'lucide-react'
import { useRouter } from 'next/navigation'

import MyButton from '@/components/MyButton'
import MyImage from '@/components/MyImage'
import { images } from '@/config/images'
import useLanguage from '@/hooks/useLanguage'

const Home = () => {
  const { translate } = useLanguage()
  const router = useRouter()

  const techStack = [
    { name: 'React/Next.js', icon: '⚛️', color: 'from-blue-500 to-cyan-500' },
    { name: 'Node.js', icon: '🟢', color: 'from-green-500 to-emerald-500' },
    { name: 'Database', icon: '🗄️', color: 'from-purple-500 to-pink-500' },
    { name: 'Mobile', icon: '📱', color: 'from-green-400 to-teal-500' },
  ]

  return (
    <div className='pt-28  flex min-[1000px]:flex-row flex-col md:gap-4 gap-6 w-full' id='home'>
      <div className='flex flex-1 flex-col gap-3'>
        <div className='space-y-6'>
          <div className='space-y-4'>
            <h1 className='leading-tight text-gray-900 dark:text-white'>
              <span className='block'>Xin chào, tôi là</span>
              <span className='block bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent animate-gradient-shift gradient-animated'>
                Hồ Diên Công
              </span>
            </h1>

            <div className='  flex items-center'>
              <h2 className='text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mr-4'>Tôi là một</h2>
              <div className='relative'>
                <div className='text-2xl md:text-3xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-slide-up key-{currentRole}'>
                  {translate('placeholder.softwareEngineer')}
                </div>
                <div className='absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transform scale-x-0 animate-[scale-x_1s_ease-in-out_infinite]' />
              </div>
            </div>
          </div>

          <p className='text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl'>{translate('placeholder.introduce')}</p>
        </div>

        <div className='flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400'>
          <div className='flex items-center space-x-2'>
            <MapPin className='w-5 h-5 text-blue-600' />
            <span>TP.HCM, Việt Nam</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Calendar className='w-5 h-5 text-green-600' />
            <span>{translate('placeholder.enterJob')}</span>
          </div>
          <div className='flex items-center space-x-2'>
            <Coffee className='w-5 h-5 text-orange-600' />
            <span>{translate('placeholder.likeCoding')}</span>
          </div>
        </div>

        <div className='space-y-4 pt-3'>
          <h3 className='text-lg text-gray-900 dark:text-white'>🛠️ Tech Stack chính:</h3>
          <div className='flex flex-wrap   gap-4'>
            {techStack.map((tech, index) => (
              <div
                key={index}
                className={`flex hover:translate-y-[-8px] hover:scale-105 flex-col justify-center items-center group p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer `}
              >
                <div
                  className={`text-3xl mb-2 bg-gradient-to-r ${tech.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                >
                  {tech.icon}
                </div>
                <div className='text-sm text-gray-700 dark:text-gray-300 text-center group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300'>
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='relative flex flex-1 flex-col animate-scale-in ' style={{ animationDelay: '0.3s' }}>
        <div className='absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-50 animate-float' />
        <div
          className='absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-30 animate-float'
          style={{ animationDelay: '1.5s' }}
        />
        <div className='relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-3xl overflow-hidden group p-8'>
          {/* Top gradient bar */}
          <div className='absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-gradient-shift gradient-animated' />

          {/* Floating badges */}
          <div className='absolute top-6 right-6 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center animate-float'>
            <div className='w-4 h-4 bg-white rounded-full flex items-center justify-center'>
              <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse' />
            </div>
          </div>

          <div className='text-center space-y-6'>
            {/* Profile Image Placeholder */}
            <div className='relative mx-auto'>
              <div className='absolute -inset-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300' />
              <div className='relative mx-auto w-48 h-48 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-700 rounded-full shadow-2xl group-hover:shadow-3xl transition-all duration-500 overflow-hidden border-4 border-white dark:border-gray-700'>
                <MyImage
                  alt='HD Công - Full-stack Engineer'
                  className='!w-full !h-full object-cover group-hover:scale-110 transition-transform duration-500'
                  src={images.logo}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent' />
              </div>
              {/* Status indicator */}
              <div className='absolute bottom-4 right-4 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg animate-pulse'>
                <div className='absolute inset-0 bg-green-400 rounded-full animate-ping' />
              </div>
            </div>

            {/* Name & Title */}
            <div className='space-y-2'>
              <h3 className='text-3xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent'>
                Hồ Diên Công
              </h3>
              <p className='text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>Software Engineer</p>
              <div className='flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-400'>
                <Award className='w-4 h-4' />
                <span className='text-sm'>4+ Years Experience</span>
              </div>
            </div>

            {/* Skills Preview */}
            <div className='flex flex-wrap justify-center gap-2'>
              {['React', 'ReactNative', 'HTML', 'CSS', 'JavaScript', 'MongoDB', 'TypeScript'].map((skill) => (
                <span
                  key={skill}
                  className='px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-sm text-gray-700 dark:text-gray-300 rounded-full border border-blue-200/50 dark:border-blue-700/50'
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Contact Button */}
            <MyButton
              className='w-full bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-600 dark:to-gray-700 hover:from-gray-900 hover:to-black dark:hover:from-gray-500 dark:hover:to-gray-600 text-white py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group'
              onClick={() => router.push('#contactMe')}
            >
              <span className='flex items-center justify-center'>
                <Mail className='w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300' />
                {translate('placeholder.contactMe')}
                <Sparkles className='w-5 h-5 ml-3 group-hover:rotate-12 transition-transform duration-300' />
              </span>
            </MyButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
