import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { prefixer } from 'stylis';
import globalStyles from '@/styles';
import { ChildrenProps } from '@/types';
import themeSettings from './theme-settings';

const cache = createCache({
  key: 'app',
  prepend: true,
  stylisPlugins: import.meta.env.MODE === 'development' ? [] : [prefixer],
});

const settings = themeSettings();

const ThemeProvider = ({ children }: ChildrenProps) => (
  <CacheProvider value={cache}>
    <MuiThemeProvider theme={settings}>
      {globalStyles}
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  </CacheProvider>
);

export default ThemeProvider;
