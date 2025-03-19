/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'pl', 'uk', 'de'],
    defaultLocale: 'pl',
    localeDetection: false,
  },
  images: {
    domains: [
      'platinum.digiway-dev.online',
      'secure.gravatar.com',
      'instagram.fwaw3-2.fna.fbcdn.net',
      'scontent.cdninstagram.com',
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
};

export default nextConfig;
