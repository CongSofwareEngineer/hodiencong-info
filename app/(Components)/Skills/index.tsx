import { useState } from 'react'

import Progress from '@/components/Progress'
import useLanguage from '@/hooks/useLanguage'
import CodeIcon from '@/components/Icons/Home/Code'
import ServerIcon from '@/components/Icons/Home/Server'
import SmartPhoneIcon from '@/components/Icons/Home/SmartPhone'
import DataBaseIcon from '@/components/Icons/Home/Database'
import StarIcon from '@/components/Icons/Star'
import ZapIcon from '@/components/Icons/Zap'

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend')

  const { translate } = useLanguage()

  const skillCategories = [
    {
      id: 'frontend',
      name: 'Frontend',
      icon: CodeIcon,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    },
    {
      id: 'backend',
      name: 'Backend',
      icon: ServerIcon,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
    },
    {
      id: 'mobile',
      name: 'Mobile',
      icon: SmartPhoneIcon,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20',
    },
    {
      id: 'database',
      name: 'Database',
      icon: DataBaseIcon,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20',
    },
  ]

  const skills = {
    frontend: [
      { name: 'React/Next.js', level: 95, icon: '⚛️' },
      { name: 'TypeScript', level: 92, icon: '📘' },
      { name: 'JavaScript', level: 95, icon: '🟨' },
      { name: 'HTML5/CSS3', level: 98, icon: '🎨' },
      { name: 'Tailwind CSS', level: 95, icon: '💨' },
      { name: 'SASS/SCSS', level: 88, icon: '💅' },
      { name: 'Webpack/Vite', level: 85, icon: '📦' },
    ],
    backend: [
      { name: 'Node.js', level: 93, icon: '🟢' },
      { name: 'Express.js', level: 92, icon: '🚀' },
      { name: 'REST APIs', level: 95, icon: '🔗' },
      { name: 'GraphQL', level: 82, icon: '📊' },
      { name: 'Microservices', level: 85, icon: '🏗️' },
    ],
    mobile: [
      { name: 'React Native', level: 90, icon: '📱' },
      { name: 'Flutter/Dart', level: 85, icon: '🦋' },
      { name: 'Expo', level: 88, icon: '🎯' },
      { name: 'App Store Deploy', level: 90, icon: '🚀' },
    ],
    database: [
      { name: 'MongoDB', level: 92, icon: '🍃' },
      { name: 'PostgreSQL', level: 88, icon: '🐘' },
      { name: 'MySQL', level: 85, icon: '🗄️' },
      { name: 'Redis', level: 87, icon: '🔴' },
      { name: 'Firebase', level: 90, icon: '🔥' },
    ],
    cloud: [
      { name: 'AWS', level: 88, icon: '☁️' },
      { name: 'Google Cloud', level: 82, icon: '🌤️' },
      { name: 'Digital Ocean', level: 85, icon: '🌊' },
      { name: 'Docker', level: 90, icon: '🐳' },
      { name: 'Kubernetes', level: 78, icon: '⎈' },
      { name: 'CI/CD', level: 87, icon: '🔄' },
      { name: 'Nginx', level: 83, icon: '🚀' },
      { name: 'Linux/Ubuntu', level: 88, icon: '🐧' },
    ],
    tools: [
      { name: 'Git/GitHub', level: 95, icon: '📝' },
      { name: 'VS Code', level: 98, icon: '💻' },
      { name: 'Figma', level: 85, icon: '🎨' },
      { name: 'Postman', level: 92, icon: '📮' },
      { name: 'Jira/Trello', level: 88, icon: '📋' },
      { name: 'Slack/Discord', level: 95, icon: '💬' },
    ],
  }

  const renderListCategorySkills = () => {
    return (
      <div className={` animate-slide-up `} style={{ animationDelay: '0.2s' }}>
        <div className='flex flex-wrap justify-center gap-4 mb-8'>
          {skillCategories.map((category) => (
            <button
              key={category.id}
              className={`group flex items-center px-6 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                activeCategory === category.id
                  ? `bg-linear-to-r ${category.color} text-white shadow-2xl scale-105`
                  : 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
              onClick={() => setActiveCategory(category.id)}
            >
              <category.icon
                className={`w-6 h-6 mr-3 transition-transform duration-300 ${activeCategory === category.id ? 'scale-110' : 'group-hover:scale-110'}`}
              />
              <span className='text-lg'>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    )
  }

  const renderListSkills = () => {
    return (
      <div className={`w-full animate-scale-in`} style={{ animationDelay: '0.4s' }}>
        <div
          className={`md:p-8 p-5 bg-gradient-to-br ${skillCategories.find((c) => c.id === activeCategory)?.bgColor} rounded-3xl border border-white/50 dark:border-gray-700/30 shadow-2xl backdrop-blur-sm`}
        >
          <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {skills[activeCategory as keyof typeof skills].map((skill, index) => (
              <div
                key={`skills-${index}`}
                className=' hover:translate-y-[-8px] hover:scale-105 group bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/30 dark:border-gray-700/30 rounded-2xl overflow-hidden  '
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className='p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <div className='flex items-center'>
                      <span className='text-2xl mr-3 group-hover:scale-125 transition-transform duration-300'>{skill.icon}</span>
                      <h4 className='text-gray-900 dark:text-white group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300'>
                        {skill.name}
                      </h4>
                    </div>
                    <span
                      className={`text-sm px-2 py-1 bg-gradient-to-r ${skillCategories.find((c) => c.id === activeCategory)?.color} text-white rounded-full`}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  <div className='space-y-2'>
                    <Progress
                      className='h-3 bg-blue-500 dark:bg-gray-700 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300'
                      value={skill.level}
                    />
                    <div className='flex justify-between text-xs text-gray-600 dark:text-gray-400'>
                      <span>{translate('home.proficiency')}</span>
                      <span className='flex items-center'>
                        {skill.level >= 90 && <StarIcon className='w-3 h-3 mr-1 text-yellow-500 fill-current' />}
                        {skill.level >= 90
                          ? translate('home.veryGood')
                          : skill.level >= 80
                            ? translate('home.advanced')
                            : skill.level >= 70
                              ? translate('home.intermediate')
                              : translate('home.beginner')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='pt-20  flex w-full flex-col items-center justify-center md:gap-6 gap-4' id='skills'>
      <div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-cyan-900/30 rounded-full border border-purple-200/50 dark:border-purple-700/50 shadow-lg backdrop-blur-sm  '>
        <ZapIcon className='w-7 h-7 mr-3 text-purple-600 dark:text-purple-400' />
        <span className='bg-gradient-to-r md:text-2xl text-xl from-purple-700 to-blue-700 dark:from-purple-300 dark:to-blue-300 bg-clip-text text-transparent'>
          {translate('placeholder.professionalSkill')}
        </span>
      </div>

      <h2 className=' text-gray-900 dark:text-white'>
        <span className='bg-gradient-to-r text-center from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent'>
          {translate('home.techAndSkill')}
        </span>
      </h2>
      <p className='text-xl text-center text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed'>{translate('home.desSkill')}</p>
      {renderListCategorySkills()}
      {renderListSkills()}
    </div>
  )
}

export default Skills
