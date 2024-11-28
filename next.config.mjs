/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'ru', 'pl', 'uk', 'de'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    domains: ['platinum.digiway-dev.online'],
  },
  env: {
    TIME_ZONE: 'Europe/Warsaw',
  },
};

export default nextConfig;
