import { CheckCircle, ExternalLink, Facebook, Mail, MapPin, Phone, Send, Zap } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

import MyButton from '@/components/MyButton'
import MyForm from '@/components/MyForm'
import MyInput from '@/components/MyInput'
import MyInputArea from '@/components/MyInputArea'
import { INFO_CONTACT, LINK_CONTACT } from '@/constants/app'
import useCheckForm from '@/hooks/useCheckForm'
import useLanguage from '@/hooks/useLanguage'
import { ErrorForm } from '@/types'
import { cloneData } from '@/utils/functions'

export type FormData = {
  email?: string
  name?: string
  sdt?: string
  content?: string
}

const ContactMe = () => {
  const { translate } = useLanguage()
  const { checkEmail, checkNumberPhone } = useCheckForm()

  const [formData, setFormData] = useState<FormData>()
  const [errors, setErrors] = useState<ErrorForm<FormData>>({
    content: translate('errors.empty'),
    email: translate('errors.empty'),
    name: translate('errors.empty'),
  })
  const [loading, setLoading] = useState(false)

  const onChangeForm = (vale: FormData) => {
    const errorClone = cloneData(errors || {}) as ErrorForm<FormData>

    if (typeof vale?.email !== 'undefined') {
      if (vale?.email) {
        const error = checkEmail(vale?.email)

        if (error) {
          errorClone.email = error
        } else {
          delete errorClone.email
        }
      } else {
        delete errorClone.email
      }
    }

    if (typeof vale?.sdt !== 'undefined') {
      const error = checkNumberPhone(vale?.sdt)

      if (error) {
        errorClone.sdt = error
      } else {
        delete errorClone.sdt
      }
    }

    if (typeof vale?.name !== 'undefined') {
      if (!vale?.name) {
        errorClone.name = translate('errors.empty')
      } else {
        delete errorClone.name
      }
    }

    if (typeof vale?.content !== 'undefined') {
      if (!vale?.content) {
        errorClone.content = translate('errors.empty')
      } else {
        delete errorClone.content
      }
    }

    setErrors(errorClone)
    setFormData((prev) => ({ ...prev, ...vale }))
  }

  const handleSubmit = async () => {
    if (Object.keys(errors || {}).length > 0) {
      return
    }
    if (!formData?.name || !formData?.sdt || !formData?.email) {
      setErrors({
        name: translate('errors.empty'),
        email: translate('errors.empty'),
        content: translate('errors.empty'),
      })

      return
    }
    setLoading(true)
    setLoading(false)
    console.log({ formData })
  }

  const renderContact = () => {
    const arr = [
      {
        icon: Mail,
        title: 'Email',
        value: INFO_CONTACT.Mail,
        description: translate('home.contactMe.mainDescription'),
        action: LINK_CONTACT.Mail,
        color: 'from-red-500 to-pink-500',
      },
      {
        icon: Phone,
        title: translate('register.phone'),
        value: INFO_CONTACT.SDT,
        description: translate('home.contactMe.phoneDescription'),
        action: LINK_CONTACT.SDT,
        color: 'from-green-500 to-emerald-500',
      },
      {
        icon: MapPin,
        title: translate('placeholder.address'),
        value: 'TP.HCM, Việt Nam',
        description: translate('home.contactMe.addressDescription'),
        action: '#',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        icon: Facebook,
        title: 'Facebook',
        value: 'Hồ Diên Công',
        description: translate('home.contactMe.mainDescription'),
        action: LINK_CONTACT.FaceBook,
        color: 'from-purple-500 to-indigo-500',
        isBlank: true,
      },
      // {
      //   icon: Calendar,
      //   title: translate('placeholder.calendly'),
      //   value: translate('home.contactMe.calendarSubTitle'),
      //   description: translate('home.contactMe.calendarDescription'),
      //   action: '#',
      //   color: 'from-purple-500 to-indigo-500',
      // },
    ]

    return (
      <div className='flex flex-col md:gap-6 gap-4 w-full'>
        {arr.map((contact, index) => (
          <Link
            key={index}
            className='hover:translate-y-[-8px] hover:scale-105 group block p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/50 dark:border-gray-700/50 shadow-lg hover:shadow-2xl transition-all duration-300  '
            href={contact.action}
            target={contact.isBlank ? '_blank' : '_self'}
          >
            <div className='flex w-full items-center space-x-6'>
              <div
                className={`w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
              >
                <contact.icon className='w-8 h-8 text-white' />
              </div>
              <div className='flex-1'>
                <h4 className='text-xl text-gray-900 dark:text-white mb-1 group-hover:text-gray-800 dark:group-hover:text-gray-100 transition-colors duration-300'>
                  {contact.title}
                </h4>
                <p className='text-lg text-gray-700 dark:text-gray-300 mb-1'>{contact.value}</p>
                <p className='text-sm text-gray-500 dark:text-gray-400'>{contact.description}</p>
              </div>
              <ExternalLink className='w-5 h-5 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors duration-300' />
            </div>
          </Link>
        ))}
      </div>
    )
  }

  const renderEnterContact = () => {
    return (
      <div className='relative w-full flex flex-1 flex-col animate-scale-in ' style={{ animationDelay: '0.3s' }}>
        <div className='absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-2xl opacity-50 animate-float' />
        <div
          className='absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-2xl opacity-30 animate-float'
          style={{ animationDelay: '1.5s' }}
        />

        <div className='relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl shadow-2xl border border-white/20 dark:border-gray-700/30 rounded-3xl overflow-hidden group p-8'>
          {/* Top gradient bar */}
          <div className='absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-gradient-shift gradient-animated' />

          <div className='text-center space-y-6'>
            <div className='inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mx-auto my-6 shadow-2xl animate-float'>
              <Send className='w-10 h-10 text-white' />
            </div>
            <h4 className='text-3xl text-gray-900 dark:text-white mb-4'>{translate('home.contactMe.sendMessage')}</h4>
            <MyForm className='w-full flex flex-col gap-5' validationErrors={errors} onSubmit={handleSubmit}>
              <MyInput
                isRequired
                errorMessage={() => errors?.name}
                isInvalid={!!errors?.name}
                label={translate('register.name')}
                placeholder={translate('placeholder.enterName')}
                value={formData?.name}
                onChange={(e) => onChangeForm({ name: e.target.value })}
              />
              <MyInput
                isRequired
                errorMessage={() => errors?.email}
                isInvalid={!!errors?.email}
                label={translate('register.email')}
                placeholder={translate('placeholder.enterEmail')}
                value={formData?.email}
                onChange={(e) => onChangeForm({ email: e.target.value })}
              />
              <MyInput
                isRequired
                errorMessage={() => errors?.sdt}
                isInvalid={!!errors?.sdt}
                label={translate('register.phone')}
                maxLength={12}
                placeholder={translate('placeholder.enterNumberPhone')}
                value={formData?.sdt}
                onChange={(e) => onChangeForm({ sdt: e.target.value })}
              />
              <MyInputArea
                isRequired
                errorMessage={() => errors?.content}
                isInvalid={!!errors?.content}
                label={translate('text.content')}
                maxLength={300}
                placeholder={translate('placeholder.enterContent')}
                value={formData?.content}
                onChange={(e) => onChangeForm({ content: e.target.value })}
              />
              <MyButton
                className='w-full h-16 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group relative overflow-hidden'
                disabled={Object.keys(errors || {}).length > 0}
                isLoading={loading}
                type='submit'
                // onClick={handleSubmit}
              >
                {translate('common.send')}
              </MyButton>
              <div className='text-center flex items-center text-gray-500 dark:text-gray-400'>
                <CheckCircle className='w-5 h-5 inline mr-2 text-green-500' />
                {translate('home.contactMe.reply')}
              </div>
            </MyForm>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='pt-20  flex w-full flex-col items-center justify-center md:gap-6 gap-4' id='contactMe'>
      <div className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-100 via-blue-100 to-cyan-100 dark:from-purple-900/30 dark:via-blue-900/30 dark:to-cyan-900/30 rounded-full border border-purple-200/50 dark:border-purple-700/50 shadow-lg backdrop-blur-sm  '>
        <Zap className='w-5 h-5 mr-3 text-purple-600 dark:text-purple-400' />
        <span className='bg-gradient-to-r from-purple-700 to-blue-700 dark:from-purple-300 dark:to-blue-300 bg-clip-text text-transparent'>
          {translate('placeholder.contactMe')}
        </span>
      </div>

      <h2 className=' text-gray-900 dark:text-white'>
        <span className='bg-gradient-to-r text-center from-gray-900 via-purple-800 to-blue-800 dark:from-white dark:via-purple-300 dark:to-blue-300 bg-clip-text text-transparent'>
          {translate('home.contactMe.subTitle')}
        </span>
      </h2>
      <p className='text-xl text-center text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed'> {translate('home.contactMe.des')}</p>
      <div className='w-full flex lg:flex-row flex-col gap-10'>
        <div className='flex flex-1'>{renderEnterContact()}</div>
        <div className='flex flex-1'>{renderContact()}</div>
      </div>
    </div>
  )
}

export default ContactMe
