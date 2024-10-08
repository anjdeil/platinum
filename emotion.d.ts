import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        typography: {
            fontFamily: string;
            fontSize: string;
        };
        fonts: {
            [key: string]: string
        };
        colors: {
            primary: string;
            secondary: string;
            tertiary: string;
            grey: string;
            white: string;
            black: string;
            active: string;
            error: string;
            backgroundGradient: string;
        };
        shadows: {
            primaryShadow: string;
        },
        background: {
            secondary: string;
            hover: string;
            formElements: string;
        };
        spacing: {
            small: string;
            medium: string;
            large: string;
        };
        media: {
            small: string;
            medium: string;
            large: string;
            middle: string;
            xl: string;
            largePlus: string;
            extraLarge: string;
        };
    }
}
