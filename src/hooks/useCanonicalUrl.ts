import { useRouter } from 'next/router';

export const useCanonicalUrl = () => {
    const router = useRouter();

    if (typeof window === 'undefined') return '';

    const origin = window.location.origin;

    const localePrefix =
        router.locale && router.locale !== router.defaultLocale
            ? `/${router.locale}`
            : '';

    const pathWithoutQuery = router.asPath.split('?')[0];

    return `${origin}${localePrefix}${pathWithoutQuery}`;
};
