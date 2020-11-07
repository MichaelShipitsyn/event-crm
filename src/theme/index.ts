import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { Theme as MuiTheme } from '@material-ui/core/styles/createMuiTheme';
import { Shadows as MuiShadows } from '@material-ui/core/styles/shadows';
import {
  Palette as MuiPalette,
  TypeBackground as MuiTypeBackground
} from '@material-ui/core/styles/createPalette';
import { softShadows } from './shadows';
import typography from './typography';
import palette from './palette';
import overrides from './overrides';
import props from './props';

interface TypeBackground extends MuiTypeBackground {
  dark: string;
}

interface Palette extends MuiPalette {
  background: TypeBackground;
}

export interface Theme extends MuiTheme {
  name: string;
  palette: Palette;
}

interface ThemeOptions {
  name?: string;
  props?: Record<string, any>;
  typography?: Record<string, any>;
  overrides?: Record<string, any>;
  palette?: Record<string, any>;
  shadows?: MuiShadows;
}

const themeOptions: ThemeOptions = {
  props,
  typography,
  overrides,
  palette,
  shadows: softShadows
};

export const createTheme = (): Theme => {
  let theme = createMuiTheme(themeOptions);

  theme = responsiveFontSizes(theme);

  return theme as Theme;
};
