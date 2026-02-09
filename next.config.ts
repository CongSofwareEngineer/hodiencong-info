const path = require('path')
/** @type {import('next').NextConfig} */

const nextConfig: any = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: '/api/cookies',
        destination: 'https://server-secure-data-nestjs.onrender.com/user/info-me',
        permanent: false,
      },
    ]
  },

  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
}

if (process.env.NEXT_PUBLIC_BUILD) {
  console.log('building for production')

  nextConfig.productionBrowserSourceMaps = false
  nextConfig.reactStrictMode = true
  nextConfig.cleanDistDir = true
  nextConfig.compress = true

  nextConfig.experimental = {
    gzipSize: true,
    optimizeCss: true,
    turbopackMinify: true,
    optimizePackageImports: [
      'styled-components',
      'framer-motion',
      'react-device-detect',
      'zustand',
      'react-toastify',
      '@heroui/button',
      '@heroui/checkbox',
      '@heroui/code',
      '@heroui/drawer',
      '@heroui/dropdown',
      '@heroui/form',
      '@heroui/image',
      '@heroui/input',
      '@heroui/kbd',
      '@heroui/link',
      '@heroui/listbox',
      '@heroui/modal',
      '@heroui/navbar',
      '@heroui/number-input',
      '@heroui/select',
      '@heroui/snippet',
      '@heroui/spinner',
      '@heroui/switch',
      '@heroui/system',
      '@heroui/theme',
      '@tanstack/react-query',
    ],
  }

  nextConfig.compiler = {
    styledComponents: {
      displayName: true,
      ssr: true,
      minify: true,
    },
    reactRemoveProperties: true,
  }
}
module.exports = nextConfig
