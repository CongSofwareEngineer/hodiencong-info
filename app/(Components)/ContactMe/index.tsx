import { useState } from 'react'

import BackLink from '../BackLink'

import MyForm from '@/components/MyForm'
import { INFO_CONTACT, LINK_CONTACT } from '@/constants/app'
import useCheckForm from '@/hooks/useCheckForm'
import useLanguage from '@/hooks/useLanguage'
import { ErrorForm } from '@/types'
import { cloneData } from '@/utils/functions'
import { ExternalLinkIcon } from '@/components/Icons/ExternalLink'
import FacebookIcon from '@/components/Icons/SocialMedia/Facebook'
import { MailIcon } from '@/components/Icons/Mail'
import { PhoneIcon } from '@/components/Icons/Phone'
import { MapPinIcon } from '@/components/Icons/MapPin'
import SendIcon from '@/components/Icons/Functions/Send'
import { CheckBadgeIcon } from '@/components/Icons/CheckBadge'
import InputForm from '@/components/MyForm/Input'
import InputAreaForm from '@/components/MyForm/InputArea'
import Reveal from '@/components/Cinematic/Reveal'
import { PROFILE } from '@/constants/profile'

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
  const [errors, setErrors] = useState<ErrorForm<FormData>>()
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
    console.log('handleSubmit')

    let errorsClone = cloneData(errors || {}) as ErrorForm<FormData>

    if (!formData?.name) {
      errorsClone.name = translate('errors.empty')
    }
    if (!formData?.sdt) {
      errorsClone.sdt = translate('errors.empty')
    }
    if (!formData?.content) {
      errorsClone.content = translate('errors.empty')
    }
    if (Object.keys(errorsClone).length > 0) {
      setErrors(errorsClone)

      return
    }
    setLoading(true)
    setLoading(false)
    console.log({ formData })
  }

  const renderContact = () => {
    const arr = [
      {
        icon: MailIcon,
        title: 'Email',
        value: INFO_CONTACT.Mail,
        description: translate('home.contactMe.mainDescription'),
        action: LINK_CONTACT.Mail,
        color: 'from-amber-300 to-orange-500',
      },
      {
        icon: PhoneIcon,
        title: translate('register.phone'),
        value: INFO_CONTACT.SDT,
        description: translate('home.contactMe.phoneDescription'),
        action: LINK_CONTACT.SDT,
        color: 'from-lime-300 to-emerald-500',
      },
      {
        icon: MapPinIcon,
        title: translate('placeholder.address'),
        value: translate('portfolio.hero.location'),
        description: translate('home.contactMe.addressDescription'),
        action: '#',
        color: 'from-cyan-300 to-blue-600',
      },
      {
        icon: FacebookIcon,
        title: 'Facebook',
        value: PROFILE.name,
        description: translate('home.contactMe.faceDescription'),
        action: LINK_CONTACT.FaceBook,
        color: 'from-fuchsia-400 to-pink-600',
        isBlank: true,
      },
    ]

    return (
      <div className='flex w-full flex-col gap-4'>
        {arr.map((contact, index) => (
          <Reveal key={`contact-me-${index}`} delay={index * 120} variant='right'>
            <BackLink
              className='glass shine-border group block max-w-full rounded-3xl p-5 transition-all duration-500 hover:-translate-y-1 md:p-6'
              href={contact.action}
              target={contact.isBlank ? '_blank' : '_self'}
            >
              <div className='flex w-full items-center gap-5'>
                <div
                  className={`flex h-14 w-14 min-w-14 items-center justify-center rounded-2xl bg-linear-to-br ${contact.color} shadow-lg transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}
                >
                  <contact.icon className='h-7 w-7 text-black' />
                </div>
                <div className='flex-1'>
                  <h4 className='font-display text-lg uppercase tracking-wide text-white'>{contact.title}</h4>
                  <p className='break-all text-base text-white/80'>{contact.value}</p>
                  <p className='text-xs text-white/50'>{contact.description}</p>
                </div>
                <ExternalLinkIcon className='h-5 w-5 min-w-5 text-white/40 transition-colors duration-300 group-hover:text-amber-300' />
              </div>
            </BackLink>
          </Reveal>
        ))}
      </div>
    )
  }

  const renderEnterContact = () => {
    return (
      <Reveal className='relative flex w-full flex-1 flex-col' variant='left'>
        <div aria-hidden className='absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-400/40 blur-3xl animate-float' />
        <div
          aria-hidden
          className='absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-fuchsia-500/30 blur-3xl animate-float'
          style={{ animationDelay: '1.5s' }}
        />

        <div className='glass relative overflow-hidden rounded-[2rem] p-5 md:p-8'>
          <div className='absolute left-0 right-0 top-0 h-1 bg-linear-to-r from-amber-300 via-fuchsia-400 to-cyan-400' />

          <div className='flex flex-col gap-6'>
            <div className='flex items-center gap-4'>
              <div className='flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-amber-300 to-orange-500 shadow-[0_0_40px_-5px_rgba(251,191,36,0.7)] animate-float'>
                <SendIcon className='h-7 w-7 text-black' />
              </div>
              <h3 className='font-display text-3xl uppercase tracking-wide'>{translate('home.contactMe.sendMessage')}</h3>
            </div>
            <MyForm className='flex w-full flex-col gap-5' validationErrors={errors}>
              <InputForm
                isRequired
                errorMessage={() => errors?.name}
                isInvalid={!!errors?.name}
                label={translate('register.name')}
                placeholder={translate('placeholder.enterName')}
                value={formData?.name}
                onChange={(e) => onChangeForm({ name: e })}
              />
              <InputForm
                isRequired
                errorMessage={() => errors?.email}
                isInvalid={!!errors?.email}
                label={translate('register.email')}
                placeholder={translate('placeholder.enterEmail')}
                value={formData?.email}
                onChange={(e) => onChangeForm({ email: e })}
              />
              <InputForm
                isRequired
                errorMessage={() => errors?.sdt}
                isInvalid={!!errors?.sdt}
                label={translate('register.phone')}
                maxLength={12}
                placeholder={translate('placeholder.enterNumberPhone')}
                value={formData?.sdt}
                onChange={(e) => onChangeForm({ sdt: e })}
              />
              <InputAreaForm
                isRequired
                showCount
                errorMessage={() => errors?.content}
                isInvalid={!!errors?.content}
                label={translate('text.content')}
                maxLength={300}
                placeholder={translate('placeholder.enterContent')}
                value={formData?.content}
                onChange={(e) => onChangeForm({ content: e })}
              />
              <button
                className='cine-btn cine-btn-primary h-14 w-full'
                type='submit'
                onClick={handleSubmit}
                disabled={Object.keys(errors || {}).length > 0 || loading}
              >
                {loading && <span className='loading loading-spinner loading-sm' />}
                {translate('common.send')}
              </button>
              <div className='flex items-center justify-center text-sm text-white/50'>
                <CheckBadgeIcon className='mr-2 inline h-5 w-5 text-emerald-400' />
                {translate('home.contactMe.reply')}
              </div>
            </MyForm>
          </div>
        </div>
      </Reveal>
    )
  }

  return (
    <section className='container mx-auto px-5 md:px-12' id='contact-me'>
      <div className='flex w-full flex-col gap-10 lg:flex-row'>
        <div className='flex flex-1'>{renderEnterContact()}</div>
        <div className='flex flex-1'>{renderContact()}</div>
      </div>
    </section>
  )
}

export default ContactMe
