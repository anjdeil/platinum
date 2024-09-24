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
        error: '#d92d20',
    },
    shadows: {
        primaryShadow: '0 0 6px 0 rgba(17, 55, 96, 0.4)',
    },
    background: {
        secondary: '#f2f8fe',
        hover: '#063e7b',
        formElements: '#f2f8fe',
    },
    spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
    },
    media: {
        medium: '(min-width: 768px)',
        large: '(min-width: 1024px)',
        middle: '(min-width: 1100px)',
        xl: '(min-width: 1200px)',
        extraLarge: '(min-width: 1440px)',
    },
};

export default theme;