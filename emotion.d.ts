import '@emotion/react';

declare module '@emotion/react' {
    export interface Theme {
        colors: {
            primary: string,
            secondary: string,
            tertiary: string,
            black: string,
            white: string,
            border: string,
            new: string,
            best: string,
            hot: string,
            sale: string,
        },
        background: {
            secondary: string,
        },
        typography: {
            fontFamily: string,
            fontSize: string,
        },
        spacing: {
            small: string,
            medium: string,
            large: string,
        },
        media: {
            medium: string,
            large: string,
            extraLarge: string,
        },
    }
}
