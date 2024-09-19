import { Theme } from "@emotion/react";

const theme: Theme = {
    colors: {
        primary: '#113760',
        secondary: '#738ebc',
        tertiary: '#0000FF',
        white: '#fff',
        black: '#000',
    },
    background: {
        secondary: '#f2f8fe',
    },
    typography: {
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
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