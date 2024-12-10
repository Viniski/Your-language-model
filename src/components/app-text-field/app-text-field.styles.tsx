import { TextField, TextFieldProps } from '@mui/material';

const AppTextField = (props: Omit<TextFieldProps, 'variant'>) => {
  const { InputProps = {}, ...rest } = props;
  const { classes: InputPropsClasses, ...InputPropsRest } = InputProps;

  return (
    <TextField
      InputLabelProps={{
        classes: {
          root: '[&:not(.Mui-focused):not(.Mui-error)]:text-gray-300',
          error: 'text-error',
        },
      }}
      InputProps={{
        classes: {
          root: '[&.Mui-disabled]:bg-gray-50/20 rounded-xl [&:not(.Mui-error):not(.Mui-focused)_fieldset]:border-gray-100 [&:not(.Mui-error):not(.Mui-disabled)_fieldset]:hover:border-primary',
          input: 'py-[1.125rem] px-5 text-gray-600 truncate',
          disabled: '[&_fieldset]:border-gray-100] disabled:[-webkit-text-fill-color:#565c70]',
          focused: '[&_input]:!text-gray-900 [&:not(.Mui-error)_fieldset]:border-primary',
          error: '[&_fieldset]:border-error',
          ...InputPropsClasses,
        },
        ...InputPropsRest,
      }}
      {...rest}
      variant="outlined"
    />
  );
};

export default AppTextField;
