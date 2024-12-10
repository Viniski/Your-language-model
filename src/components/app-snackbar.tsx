import { forwardRef, ReactNode } from 'react';
import {
  faCircleCheck,
  faCircleXmark
} from '@fortawesome/free-regular-svg-icons';
import {
  faCircleExclamation,
  faXmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import { closeSnackbar, CustomContentProps, VariantOverrides, VariantType } from 'notistack';
import { twMerge } from 'tailwind-merge';

const iconPerVariant: Partial<Record<VariantType, ReactNode>> = {
  error: <FontAwesomeIcon className="text-2xl" icon={faCircleXmark} />,
  success: <FontAwesomeIcon className="text-2xl" icon={faCircleCheck} />,
  warning: <FontAwesomeIcon className="text-2xl" icon={faCircleExclamation} />,
  info: <FontAwesomeIcon className="text-2xl" icon={faCircleExclamation} style={{ transform: 'rotate(-180deg)' }} />,
};

const classNamePerVariant: Partial<Record<VariantType, string>> = {
  error: 'border-error/20 bg-error-light text-error',
  success: 'border-success/20 bg-[#f0fff4] text-success',
  warning: 'border-warning/20 bg-warning-light text-warning',
  info: 'border-006/20 bg-[#f0f7ff] text-006',
};

const AppSnackbar = forwardRef<HTMLDivElement, CustomContentProps & VariantOverrides['default']>((props, ref) => {
  const { id, message, variant, style, title } = props;

  return (
    <div
      ref={ref}
      role="alert"
      style={style}
      className={twMerge(
        'flex max-w-[500px] flex-nowrap items-center rounded-lg border-2 px-6 py-3.5 shadow-none',
        classNamePerVariant[variant],
      )}
    >
      {iconPerVariant[variant]}
      <div className="ml-4 flex flex-col gap-2">
        {!!title && <p className="text-base font-bold">{title}</p>}
        {!!message && <p className="text-sm leading-[1.2] text-gray-300">{message}</p>}
      </div>
      <IconButton className="-mr-2 ml-2 text-current" onClick={() => closeSnackbar(id)}>
        <FontAwesomeIcon className="w-[1em]" icon={faXmark} />
      </IconButton>
    </div>
  );
});

export default AppSnackbar;
