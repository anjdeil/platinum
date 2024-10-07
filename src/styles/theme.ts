
import { Theme } from '@emotion/react';
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600', '700'],
});


const theme: Theme = {
    typography: {
        fontFamily: `${montserrat.style.fontFamily}`,
        fontSize: '16px',
    },
    fonts: {
        bodysmallReg:
            '400 0.75rem/1rem ' + montserrat.style.fontFamily,
        bodyMiddleReg:
            '400 1rem/1.5rem ' + montserrat.style.fontFamily,
        bodyMiddleSemiBold:
            '600 1rem/1.5rem ' + montserrat.style.fontFamily,
        bodyMiddleMedium:
            '500 1rem/1.5rem ' + montserrat.style.fontFamily,
        titleH1SemiBold:
            '600 3rem/3.5rem ' + montserrat.style.fontFamily,
        titleH2SemiBold:
            '600 1.5rem/2rem ' + montserrat.style.fontFamily,
        titleH2Medium:
            '500 1.5rem/2rem ' + montserrat.style.fontFamily,
    },
    colors: {
        primary: '#113760',
        backgroundGradient: 'radial-gradient(79.43% 79.43% at 49.95% 64.07%, #024584 0%, #0B233D 100%)',
        secondary: '#738ebc',
        tertiary: '#0000FF',
        grey: '#878787',
        white: '#fff',
        black: '#000',
        active: '#1E71BE',
        primaryBlue200: "#e0effe",
        primaryBlue600: "#063e7b",
        primaryBlue700: "#113760",
    },
    background: {
        secondary: '#f2f8fe',
        hover: '#063e7b'
    },
    spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
    },
    media: {
        small: '(max-width: 430px)',
        medium: '(max-width: 768px)',
        large: '(max-width: 1024px)',
        middle: '(max-width: 1100px)',
        xl: '(max-width: 1200px)',
        extraLarge: '(max-width: 40px)',
    },
};

export default theme;