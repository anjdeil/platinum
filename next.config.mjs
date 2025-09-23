/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  i18n: {
    locales: ['en', 'ru', 'pl', 'uk', 'de'],
    defaultLocale: 'pl',
    localeDetection: true,
  },
  images: {
    // unoptimized: true,
    domains: [
      'admin.platinumchetvertinovskaya.com',
      'stg-platinum-staging.kinsta.cloud',
      'secure.gravatar.com',
      'instagram.fwaw3-2.fna.fbcdn.net',
      'scontent.cdninstagram.com',
      'img.youtube.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    optimizePackageImports: [
      'lodash',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      'react-select',
      'react-slick',
      'swiper',
      '@react-pdf/renderer',
      'styled-components',
    ],
    turbo: {
      rules: {
        '*.svg': ['@svgr/webpack'],
      },
    },
  },
  env: {
    timeZone: 'Europe/Warsaw',
  },
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap.xml',
      },
      {
        source: '/sitemap/:slug',
        destination: '/api/sitemap/:slug',
      },
    ];
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/:path*',
  //       headers: [
  //         { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  //         { key: 'X-Content-Type-Options', value: 'nosniff' },
  //         { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  //         { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
  //       ],
  //     },
  //     {
  //       source: '/api/:path*',
  //       headers: [
  //         { key: 'Cache-Control', value: 's-maxage=60, stale-while-revalidate=600' },
  //       ],
  //     },
  //   ];
  // },
};


export default nextConfig;
