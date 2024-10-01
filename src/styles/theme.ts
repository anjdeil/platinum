import { Theme } from "@emotion/react";
import { Montserrat } from "next/font/google";

export const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600', '700'],
});

const theme: Theme = {
    typography: {
        fontFamily: `${montserrat.style.fontFamily}`,
        fontSize: '16px',
    },
    colors: {
        primary: '#113760',
        secondary: '#738ebc',
        tertiary: '#0000FF',
        grey: '#878787',
        white: '#fff',
        black: '#000',
        active: '#1E71BE',
        silver: '#E0EFFE',
        platinum: '#063e7b',
        shadow: '#2B2A2933',
        error: '#D92D20',
    },
    background: {
        primaryGradient: 'radial-gradient(79.43% 79.43% at 49.95% 64.07%, #024584 0%, #0B233D 100%)',
        infoGradient: 'radial-gradient(66.14% 66.14% at 49.95% 64.07%, #024584 0%, #0B233D 100%)',
        secondary: '#f2f8fe',
        hover: '#063e7b',
        skeleton: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        grey: '#BEBEBE',
        success: '#17AA40',
        warning: '#F2B517'
    },
    spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
    },
    media: {
        medium: '(max-width: 768px)',
        large: '(max-width: 1024px)',
        middle: '(max-width: 1100px)',
        xl: '(max-width: 1200px)',
        extraLarge: '(max-width: 1440px)',
    },
};

export default theme;
