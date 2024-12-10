/// <reference types="vite/client" />

import { Theme as MuiTheme } from '@mui/material/styles';
import languages from '@/data/languages.json';
import plMessages from '@/locales/pl.json';

declare module '@mui/material/styles' {
  interface Palette {
    '003': Palette['primary'];
  }

  interface PaletteOptions {
    '003': PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    '003': true;
  }
}

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MuiTheme {}
}

declare global {
  namespace FormatjsIntl {
    interface IntlConfig {
      locale: keyof typeof languages;
    }
    interface Message {
      ids: keyof typeof plMessages;
    }
  }
}

declare module 'notistack' {
  interface VariantOverrides {
    default: {
      title?: string;
    };
    error: {
      title?: string;
    };
    success: {
      title?: string;
    };
    warning: {
      title?: string;
    };
    info: {
      title?: string;
    };
  }
}
