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

  compiler: {
    styledComponents: {
      displayName: true,
      ssr: true,
    },
  },
}

// module.exports = withBundleAnalyzer(nextConfig)
module.exports = nextConfig
