/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'pl', 'uk', 'de'],
    defaultLocale: 'pl',
    localeDetection: true,
  },
  images: {
    unoptimized: true,
    domains: [
      'admin.platinumchetvertinovskaya.com',
      'secure.gravatar.com',
      'instagram.fwaw3-2.fna.fbcdn.net',
      'scontent.cdninstagram.com',
      'admin.platinumchetvertinovskaya.com',
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
};


export default nextConfig;
