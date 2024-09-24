import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        typography: {
            fontFamily: string;
            fontSize: string;
        };
        colors: {
            primary: string;
            secondary: string;
            tertiary: string;
            grey: string;
            white: string;
            black: string;
            active: string;
        };
        background: {
            primaryGradient: string;
            secondary: string;
            hover: string;
            skeleton: string;
        };
        spacing: {
            small: string;
            medium: string;
            large: string;
        };
        media: {
            medium: string;
            large: string;
            middle: string;
            xl: string;
            extraLarge: string;
        };
    }
}
