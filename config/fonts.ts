import { Be_Vietnam_Pro as BeVietnamPro, Oswald, Roboto_Slab as RobotoSlab } from 'next/font/google'

export const robotoSlab = RobotoSlab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
})

export const oswald = Oswald({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-oswald',
  display: 'swap',
})

export const beVietnamPro = BeVietnamPro({
  subsets: ['latin', 'vietnamese'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-be-vietnam',
  display: 'swap',
})
