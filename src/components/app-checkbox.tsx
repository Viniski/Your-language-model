import { forwardRef } from 'react';
import { Checkbox, CheckboxProps } from '@mui/material';
import { CheckboxClasses } from '@mui/material/Checkbox/checkboxClasses';

const classes: Partial<CheckboxClasses> = {
  root: 'text-001/50',
  checked: '!text-003',
};

const AppCheckbox = forwardRef<HTMLButtonElement, CheckboxProps>((props, ref) => (
  <Checkbox ref={ref} classes={{ ...classes, ...props.classes }} {...props} />
));

export default AppCheckbox;
