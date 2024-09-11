import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
    subsets: ['latin', 'cyrillic'],
    weight: ['400', '500', '600', '700'],
});

const theme = {
    typography: {
        fontFamily: `${montserrat.style.fontFamily} !important`,
        fontSize: '16px',
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: `${montserrat.style.fontFamily} !important`,
                },
            },
        },
    },
    colors: {
        primary: '#113760',
        secondary: '#738ebc',
        tertiary: '#0000FF',
        grey: '#878787',
        white: '#fff',
        black: '#000',
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
        medium: '(min-width: 768px)',
        large: '(min-width: 1024px)',
        midle: '(min-width: 1100px)',
        xl: '(min-width: 1200px)',
        extraLarge: '(min-width: 1440px)',
    },
};

export default theme;