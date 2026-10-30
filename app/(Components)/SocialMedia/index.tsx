import BackLink from '../BackLink'

import Reveal from '@/components/Cinematic/Reveal'
import SectionHeading from '@/components/Cinematic/SectionHeading'
import TiltCard from '@/components/Cinematic/TiltCard'
import { ExternalLinkIcon } from '@/components/Icons/ExternalLink'
import FacebookIcon from '@/components/Icons/SocialMedia/Facebook'
import GithubIcon from '@/components/Icons/SocialMedia/Github'
import InstagramIcon from '@/components/Icons/SocialMedia/Instagram'
import LinkedinIcon from '@/components/Icons/SocialMedia/Linkedin'
import TwitterIcon from '@/components/Icons/SocialMedia/Twitter'
import ZaloIcon from '@/components/Icons/SocialMedia/Zalo'
import { SOCIALS } from '@/constants/profile'
import useLanguage from '@/hooks/useLanguage'

const SOCIAL_ICON = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  facebook: FacebookIcon,
  x: TwitterIcon,
  instagram: InstagramIcon,
  zalo: ZaloIcon,
}

const SocialMedia = () => {
  const { translate } = useLanguage()

  return (
    <section className='container mx-auto flex flex-col gap-12 px-5 md:px-12' id='social-media'>
      <SectionHeading eyebrow={translate('home.socialMedia.title')} title={translate('portfolio.contact.socialTitle')} />
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3'>
        {SOCIALS.map((social, index) => {
          const Icon = SOCIAL_ICON[social.key]

          return (
            <Reveal key={social.key} delay={index * 90} variant='flip'>
              <TiltCard className='rounded-3xl'>
                <BackLink className='glass shine-border group block rounded-3xl p-5 md:p-6' href={social.link} target='_blank'>
                  <div className='flex w-full items-center gap-5'>
                    <div className='depth-2 flex h-14 w-14 min-w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:bg-white/10'>
                      <Icon className='h-7 w-7 text-white' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='font-display text-lg uppercase tracking-wide text-white'>{social.title}</h4>
                      <p className='text-sm text-white/50'>{social.handle}</p>
                    </div>
                    <ExternalLinkIcon className='h-5 w-5 min-w-5 text-white/40 transition-colors duration-300 group-hover:text-amber-300' />
                  </div>
                </BackLink>
              </TiltCard>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

export default SocialMedia
