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
    },
    backgroundColor: {
        sedcondary: '#f2f8fe',
    },
    spacing: {
        small: '8px',
        medium: '16px',
        large: '24px',
    },
};

export default theme;