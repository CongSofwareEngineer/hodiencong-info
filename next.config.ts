const path = require('path')

/** @type {import('next').NextConfig} */
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: true,
// })

const nextConfig: any = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
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

  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://server-secure-data-nestjs.onrender.com https://www.google-analytics.com; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; upgrade-insecure-requests",
          },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
        ],
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
  nextConfig.productionBrowserSourceMaps = false
  nextConfig.reactStrictMode = true
  nextConfig.cleanDistDir = true
  nextConfig.compress = true

  nextConfig.experimental = {
    gzipSize: true,
    optimizeCss: true,
    turbopackMinify: true,
    optimizePackageImports: ['libphonenumber-j', 'react-device-detect', 'zustand', '@heroui/react', '@tanstack/react-query'],
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
// module.exports = withBundleAnalyzer(nextConfig)
module.exports = nextConfig
