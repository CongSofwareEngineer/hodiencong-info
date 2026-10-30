'use client'
import ContactMe from '@/app/(Components)/ContactMe'
import SocialMedia from '@/app/(Components)/SocialMedia'
import PageHero from '@/components/Cinematic/PageHero'
import useLanguage from '@/hooks/useLanguage'

const ContactClient = () => {
  const { translate } = useLanguage()

  return (
    <div className='flex flex-col gap-24 pb-28 md:gap-32'>
      <PageHero
        description={translate('portfolio.contact.des')}
        eyebrow={translate('portfolio.contact.eyebrow')}
        scene='05 / 05'
        title={translate('portfolio.contact.title')}
      />
      <ContactMe />
      <SocialMedia />
    </div>
  )
}

export default ContactClient
