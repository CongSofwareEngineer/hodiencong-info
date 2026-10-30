'use client'
import Link from 'next/link'

import { MailIcon } from '../Icons/Mail'
import { MapPinIcon } from '../Icons/MapPin'
import { PhoneIcon } from '../Icons/Phone'
import { CopyIcon } from '../Icons/Functions/Copy'

import BackLink from '@/app/(Components)/BackLink'
import { INFO_CONTACT, LINK_CONTACT } from '@/constants/app'
import { NAV_ROUTES, PROFILE, SOCIALS } from '@/constants/profile'
import useLanguage from '@/hooks/useLanguage'
import { copyToClipboard } from '@/utils/notification'

const Item = ({ icon, value, link }: { icon: React.ReactNode; value: string; link: string }) => {
  return (
    <div className='group flex items-center gap-3'>
      <span className='flex h-9 w-9 min-w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-amber-300'>{icon}</span>
      <BackLink className='text-sm text-white/70 transition-colors hover:text-white' href={link} target='_blank'>
        {value}
      </BackLink>
      <CopyIcon
        className='size-4 cursor-pointer text-white/30 opacity-0 transition-opacity group-hover:opacity-100 hover:text-amber-300'
        onClick={() => copyToClipboard(value)}
      />
    </div>
  )
}

const Footer = () => {
  const { translate } = useLanguage()

  return (
    <footer className='dark relative overflow-hidden border-t border-white/10 bg-[#05050a] text-white'>
      <div aria-hidden className='absolute -top-40 left-1/2 h-80 w-[80%] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl' />

      <div className='container relative mx-auto flex flex-col gap-16 px-5 pb-10 pt-20 md:px-12'>
        <div className='flex flex-col items-center gap-4 text-center'>
          <span className='font-mono text-xs uppercase tracking-[0.4em] text-white/40'>{translate('portfolio.footer.tagline')}</span>
          <h2 className='cine-title text-[13vw] md:text-[9rem]'>{PROFILE.name}</h2>
          <p className='font-display text-2xl uppercase tracking-widest text-gradient-gold'>{translate('portfolio.footer.theEnd')}</p>
          <p className='max-w-md text-sm text-white/50'>{translate('portfolio.footer.theEndDes')}</p>
        </div>

        <div className='grid gap-10 border-t border-white/10 pt-12 md:grid-cols-3'>
          <div className='flex flex-col gap-4'>
            <span className='cine-eyebrow'>{translate('portfolio.footer.navTitle')}</span>
            <div className='flex flex-col gap-2'>
              {NAV_ROUTES.map((item) => (
                <Link
                  key={item.key}
                  className='w-fit text-sm uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-amber-300'
                  href={item.link}
                >
                  {translate(`portfolio.nav.${item.key}`)}
                </Link>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-4'>
            <span className='cine-eyebrow'>{translate('portfolio.footer.contactTitle')}</span>
            <Item icon={<PhoneIcon className='size-4' />} link={LINK_CONTACT.SDT} value={INFO_CONTACT.SDT} />
            <Item icon={<MailIcon className='size-4' />} link={LINK_CONTACT.Mail} value={INFO_CONTACT.Mail} />
            <Item icon={<MapPinIcon className='size-4' />} link={LINK_CONTACT.GGMap} value={translate('footer.address')} />
          </div>

          <div className='flex flex-col gap-4'>
            <span className='cine-eyebrow'>{translate('portfolio.footer.socialTitle')}</span>
            <div className='flex flex-wrap gap-2'>
              {SOCIALS.map((social) => (
                <BackLink
                  key={social.key}
                  className='rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.15em] text-white/70 transition-all hover:border-amber-300/60 hover:text-white'
                  href={social.link}
                  target='_blank'
                >
                  {social.title}
                </BackLink>
              ))}
            </div>
          </div>
        </div>

        <div className='flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/40 md:flex-row'>
          <span>{translate('portfolio.footer.rights', { year: new Date().getFullYear() })}</span>
          <span className='font-mono tracking-[0.3em]'>{`${PROFILE.shortName} · ${new Date().getFullYear()}`}</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
