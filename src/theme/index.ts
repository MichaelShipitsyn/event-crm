import { colors, createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import { Theme as MuiTheme } from '@material-ui/core/styles/createMuiTheme';
import { Shadows as MuiShadows } from '@material-ui/core/styles/shadows';
import {
  Palette as MuiPalette,
  TypeBackground as MuiTypeBackground
} from '@material-ui/core/styles/createPalette';
import { softShadows } from './shadows';
import typography from './typography';

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

type Direction = 'ltr' | 'rtl';

interface ThemeOptions {
  name?: string;
  direction?: Direction;
  typography?: Record<string, any>;
  overrides?: Record<string, any>;
  palette?: Record<string, any>;
  shadows?: MuiShadows;
}

const themeOptions: ThemeOptions = {
  direction: 'ltr',
  typography,
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden'
      }
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32
      }
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)'
      }
    },
    MuiInputBase: {
      input: {
        '&::placeholder': {
          opacity: 1,
          color: colors.blueGrey[600]
        }
      }
    }
  },
  palette: {
    type: 'light',
    action: {
      active: colors.blueGrey[600]
    },
    background: {
      default: colors.common.white,
      dark: '#f4f6f8',
      paper: colors.common.white
    },
    primary: {
      main: colors.indigo[600]
    },
    secondary: {
      main: '#5850EC'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows: softShadows
};

export const createTheme = (): Theme => {
  let theme = createMuiTheme(themeOptions);

  theme = responsiveFontSizes(theme);

  return theme as Theme;
};
