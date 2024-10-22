import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme
    {
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
            backgroundGradient: string;
            tertiary: string;
            grey: string;
            white: string;
            black: string;
            active: string;
            silver: string;
            platinum: string;
            shadow: string;
            error: string;
            border: string;
            new: string,
            best: string,
            hot: string,
            sale: string,
        };
        customShadows: {
            primaryShadow: string;
        };
        background: {
            primaryGradient: string;
            infoGradient: string;
            secondary: string;
            hover: string;
            skeleton: string;
            grey: string;
            success: string;
            warning: string;
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
            mediumLarge: string;
            large: string;
            middle: string;
            xl: string;
            largePlus: string;
            extraLarge: string;
        };
    }
}
