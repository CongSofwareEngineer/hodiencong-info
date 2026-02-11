import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, HTMLAttributes } from 'react'

type BackLinkProps = {
  noBackLink?: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLAnchorElement> &
  LinkProps
const BackLink = ({ noBackLink = false, target = '_self', ...props }: BackLinkProps) => {
  const handleClick = (e: any) => {
    // Handle smooth scrolling for hash links
    if (typeof props?.href === 'string' && props?.href.startsWith('#')) {
      e.preventDefault()

      const elementId = props?.href.substring(1)
      const element = document.getElementById(elementId)

      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }
    }

    props.onClick?.(e)
    window.history.pushState(null, '', props?.href)
  }

  return <Link {...props} rel={target === '_self' || noBackLink ? undefined : 'noopener noreferrer'} target={target} onClick={handleClick} />
}

export default BackLink
