import { useInView } from 'framer-motion'
import Image, { ImageProps } from 'next/image'
import { useRef, useState } from 'react'

import { images } from '@/config/images'
import { cn } from '@/utils/tailwind'

type Props = {
  noAnimation?: boolean
} & Omit<ImageProps, 'alt' | 'src'> & {
    alt?: string
    src?: string
  }
const MyImage = ({ noAnimation = false, src, alt = 'thay-hong-toan', ...props }: Props) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const [loaded, setLoaded] = useState(false)

  return (
    <Image
      ref={ref}
      fill
      alt={alt}
      draggable={false}
      loading='lazy'
      priority={false}
      sizes='100vw'
      {...props}
      className={cn('!relative overflow-hidden', props?.className)}
      style={{
        filter: loaded || noAnimation ? 'none' : 'blur(20px)',
        transition: 'filter 0.08s ease-out',
        ...props.style,
      }}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null
        currentTarget.src = images.icons.avatarDefault
      }}
      onLoad={() => {
        setLoaded(true)
      }}
      src={
        inView
          ? src || images.icons.avatarDefault
          : 'https://res.cloudinary.com/tc-store/image/upload/w_100/v1734883048/tc-store/bgWhiteBlur_yxlqi7.png'
      }
      // src={src || images.icons.avatarDefault}
    />
  )
}

export default MyImage
