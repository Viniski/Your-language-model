import { createTheme } from '@mui/material';
import { plPL } from '@mui/material/locale';
import colors from '@/styles/colors.json';

const rootElement = document.getElementById('root') as HTMLElement;

const componentsWithRoot = ['MuiDialog', 'MuiDrawer', 'MuiPopover', 'MuiPopper'].map((component) => [
  component,
  { defaultProps: { container: rootElement } },
]);

const themeSettings = () =>
  createTheme(
    {
      typography: {
        fontFamily: 'Open Sans',
      },
      palette: {
        primary: {
          main: colors.base.primary.DEFAULT,
          dark: colors.base.primary.dark,
        },
        '003': {
          main: colors.base['003'].DEFAULT,
          dark: colors.base['003'].dark,
          contrastText: colors.base.white,
        },
        error: {
          main: colors.base.error.DEFAULT,
          dark: colors.base.error.dark,
        },
        warning: {
          main: colors.base.warning.DEFAULT,
        },
        success: {
          main: colors.base.success.DEFAULT,
        },
        text: {
          primary: colors.text.primary,
        },
      },
      components: {
        ...Object.fromEntries(componentsWithRoot),
        MuiSkeleton: {
          styleOverrides: {
            root: {
              transform: 'unset',
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            input: {
              '&:-webkit-autofill': {
                transitionDelay: '9999s',
                transitionProperty: '-webkit-box-shadow, -webkit-text-fill-color, caret-color, background-color',
              },
            },
          },
        },
      },
    },
    plPL,
  );

export default themeSettings;
