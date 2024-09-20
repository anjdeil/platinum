

import { Palette, PaletteColor, PaletteOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: PaletteColor;
  }

  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
  }
}
