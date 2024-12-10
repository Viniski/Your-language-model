import { useReducer } from 'react';
import { useIntl } from 'react-intl';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, InputAdornment } from '@mui/material';
import AppTooltip from '@/components/app-tooltip';
import AppTextFieldForm, { Props as AppTextFieldProps } from './app-text-field-form';

const AppTextFieldFormPassword = ({ disabled, ...props }: AppTextFieldProps) => {
  const intl = useIntl();
  const [isPasswordVisible, toggleIsPasswordVisible] = useReducer((value) => !value, false);
  const tooltipTitle = disabled ? '' : intl.$t({ id: isPasswordVisible ? 'Form.PasswordHide' : 'Form.PasswordShow' });

  return (
    <AppTextFieldForm
      ref={undefined}
      disabled={disabled}
      {...props}
      type={isPasswordVisible ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <AppTooltip title={tooltipTitle}>
              <IconButton disabled={disabled} onClick={toggleIsPasswordVisible}>
                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} size="sm" />
              </IconButton>
            </AppTooltip>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default AppTextFieldFormPassword;
