/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'ru', 'pl', 'uk', 'de'],
        defaultLocale: 'en',
        localeDetection: false,
    },
};

export default nextConfig;
