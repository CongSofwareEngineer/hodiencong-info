import Link, { LinkProps } from 'next/link'
import { AnchorHTMLAttributes, HTMLAttributes } from 'react'

type BackLinkProps = {
  noBackLink?: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement> &
  HTMLAttributes<HTMLAnchorElement> &
  LinkProps
const BackLink = ({ noBackLink = false, target = '_self', ...props }: BackLinkProps) => {
  return <Link {...props} rel={target === '_self' || noBackLink ? undefined : 'noopener noreferrer'} target={target} />
}

export default BackLink
