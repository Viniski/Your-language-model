import { Tooltip, TooltipProps } from '@mui/material';
import { TooltipClasses } from '@mui/material/Tooltip/tooltipClasses';

const classes: Partial<TooltipClasses> = {
  tooltip: 'max-w-60 py-2 px-3 rounded-md bg-gray-300 text-center',
  arrow: 'text-gray-300 [&__before]:border [&__before]:border-gray-300',
};

const AppTooltip = (props: TooltipProps) => <Tooltip arrow classes={classes} {...props} />;

export default AppTooltip;
