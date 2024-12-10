import { SnackbarProvider } from 'notistack';
import { AppSnackbar } from '@/components';
import IntlProvider from '@/contexts/intl-provider';
import QueryClientProvider from '@/contexts/query-client-provider';
import ThemeProvider from '@/contexts/theme-provider';
import { ChildrenProps } from '@/types';

const Components = {
  default: AppSnackbar,
  error: AppSnackbar,
  success: AppSnackbar,
  warning: AppSnackbar,
  info: AppSnackbar,
};

const AppContextsProvider = ({ children }: ChildrenProps) => (
  <IntlProvider>
    <ThemeProvider>
      <SnackbarProvider autoHideDuration={5000} Components={Components} variant="success">
        <QueryClientProvider>{children}</QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </IntlProvider>
);

export default AppContextsProvider;
