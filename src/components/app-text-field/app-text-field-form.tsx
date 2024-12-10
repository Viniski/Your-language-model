import { Control, useController } from 'react-hook-form';
import { TextFieldProps } from '@mui/material';
import AppTextField from './app-text-field.styles';

export type Props = Omit<TextFieldProps, 'variant'> & {
  field: string;
  testId?: string;
  control: Control<any>;
};

const AppTextFieldForm = ({ field, testId, control, ...props }: Props) => {
  const {
    field: formField,
    fieldState: { isTouched, invalid, error },
  } = useController({
    name: field,
    control,
  });

  return (
    <AppTextField
      data-testid={testId}
      error={isTouched && invalid}
      helperText={isTouched && (error?.message || '')}
      inputRef={formField.ref}
      value={formField.value}
      onBlur={formField.onBlur}
      onChange={formField.onChange}
      {...props}
    />
  );
};

export default AppTextFieldForm;
