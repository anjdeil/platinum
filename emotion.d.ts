import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        typography: {
            fontFamily: string;
            fontSize: string;
            bigFontSize: string;
            smallFontSize: string;
        };
        colors: {
            primary: string;
            secondary: string;
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
            new: string;
            best: string;
            hot: string;
            sale: string;
        };
        background: {
            primaryGradient: string;
            infoGradient: string;
            secondary: string;
            hover: string;
            skeleton: string;
            grey: string;
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
