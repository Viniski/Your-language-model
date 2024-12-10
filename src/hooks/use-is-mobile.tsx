import { useMediaQuery, useTheme } from '@mui/material';
import { Breakpoint } from '@mui/system/createTheme/createBreakpoints';

const useIsMobile = (breakpoint?: Breakpoint) => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down(breakpoint || 'md'));
};

export default useIsMobile;
