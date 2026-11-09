import { Be_Vietnam_Pro as BeVietnamPro, Chakra_Petch as ChakraPetch, JetBrains_Mono as JetBrainsMono, Oswald } from 'next/font/google'

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

// Futuristic display face for the portfolio (angular, HUD-like, supports Vietnamese)
export const chakraPetch = ChakraPetch({
  subsets: ['latin', 'vietnamese'],
  weight: ['500', '600', '700'],
  variable: '--font-chakra',
  display: 'swap',
})

export const jetBrainsMono = JetBrainsMono({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})
