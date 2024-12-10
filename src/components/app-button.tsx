import { forwardRef } from 'react';
import { LoadingButton } from '@mui/lab';
import { LoadingButtonProps } from '@mui/lab/LoadingButton';
import { ButtonClasses } from '@mui/material';

const classes: Partial<ButtonClasses> = {
  root: 'py-3 rounded-lg text-sm normal-case shadow-none px-9 !text-base font-semibold',
  contained: 'border border-transparent',
};

const AppButton = forwardRef<HTMLButtonElement, LoadingButtonProps>((props, ref) => (
  <LoadingButton ref={ref} classes={classes} variant="contained" {...props} />
));

export default AppButton;
