import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    typography: {
      fontFamily: string;
      fontSize: string;
    };
    fonts: {
      [key: string]: string;
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
      success: string;
      border: string;
      lightBorder: string;
      new: string;
      best: string;
      hot: string;
      sale: string;
      primaryBlue200: string;
      primaryBlue500: string;
      primaryBlue700: string;
    };
    customShadows: {
      primaryShadow: string;
      primaryBlue200: string;
      primaryBlue500: string;
      primaryBlue700: string;
    };
    background: {
      main: string;
      primaryGradient: string;
      infoGradient: string;
      secondary: string;
      hover: string;
      skeleton: string;
      skeletonSecondary: string;
      skeletonLight: string;
      skeletonDark: string;
      grey: string;
      success: string;
      warning: string;
      formElements: string;
      resetButton: string;
      resetButtonHover: string;
      resetButtonActive: string;
      banner: string;
    };
    spacing: {
      small: string;
      medium: string;
      large: string;
    };
    media: {
      smallest: string;
      small: string;
      preSmall: string;
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
