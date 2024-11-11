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
    fonts: {
        bodysmallReg: '400 0.75rem/1rem ' + montserrat.style.fontFamily,
        bodyMiddleReg: '400 1rem/1.5rem ' + montserrat.style.fontFamily,
        bodyMiddleSemiBold: '600 1rem/1.5rem ' + montserrat.style.fontFamily,
        bodyMiddleMedium: '500 1rem/1.5rem ' + montserrat.style.fontFamily,
        titleH1SemiBold: '600 3rem/3.5rem ' + montserrat.style.fontFamily,
        titleH2SemiBold: '600 1.5rem/2rem ' + montserrat.style.fontFamily,
        titleH2Medium: '500 1.5rem/2rem ' + montserrat.style.fontFamily,
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
        error: '#d92d20',
        success: '#28a745',
        silver: "",
        platinum: "",
        shadow: "",
        border: '#738EBC',
        lightBorder: "#E0EFFE",
        new: '#17AA40',
        best: '#1E71BE',
        hot: '#F2B517',
        sale: '#D92D20',
    },
    background: {
        secondary: '#f2f8fe',
        hover: '#063e7b',
        skeleton: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
        grey: '#BEBEBE',
        success: '#17AA40',
        warning: '#F2B517',
        primaryGradient: "radial-gradient(79.43% 79.43% at 49.95% 64.07%, #024584 0%, #0B233D 100%)",
        infoGradient: "radial-gradient(66.14% 66.14% at 49.95% 64.07%, #024584 0%, #0B233D 100%)",
        formElements: "#F2F8FE",
        resetButton: "#f1f1f5",
        resetButtonHover: "#e8e8f0",
        resetButtonActive: "#d9d9e6",
    },
    spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
    },
    media: {
        small: '(max-width: 430px)',
        medium: '(max-width: 768px)',
        mediumLarge: '(max-width: 900px)',
        large: '(max-width: 1024px)',
        middle: '(max-width: 1100px)',
        xl: '(max-width: 1200px)',
        largePlus: '(max-width: 1300px)',
        extraLarge: '(max-width: 1440px)',
    },
    customShadows: {
        primaryShadow: "0 0 6px 0 rgba(17, 55, 96, .4)"
    }
};

export default theme;