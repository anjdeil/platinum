import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            primary: string;
            secondary: string;
            tertiary: string;
            white: string;
            black: string;
        };
        background: {
            secondary: string;
        };
        typography: {
            fontFamily: string;
            fontSize: string;
        };
        spacing: {
            small: string;
            medium: string;
            large: string;
        };
        media: {
            medium: string;
            large: string;
            midle: string;
            xl: string;
            extraLarge: string;
        };
    }
}