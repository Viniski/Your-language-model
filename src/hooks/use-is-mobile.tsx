import { Breakpoint, useMediaQuery, useTheme } from '@mui/material';

const useIsMobile = (breakpoint?: Breakpoint) => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down(breakpoint || 'md'));
};

export default useIsMobile;
