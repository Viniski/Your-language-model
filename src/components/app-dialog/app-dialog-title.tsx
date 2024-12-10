import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import { twMerge } from 'tailwind-merge';
import { ChildrenProps } from '@/types';

interface AppDialogTitleProps extends ChildrenProps {
  onClose?: () => void;
  className?: string;
}

const Title = ({ children, onClose, className }: AppDialogTitleProps) => (
  <h2 className={twMerge('mb-2 mr-8 p-0 text-2xl font-bold leading-[1.2]', className)}>
    {children}
    {onClose && (
      <IconButton
        aria-label="close"
        className="absolute right-6 top-6 bg-primary-50 text-001 hover:bg-primary/5"
        onClick={onClose}
      >
        <FontAwesomeIcon className="w-[1em]" icon={faXmark} />
      </IconButton>
    )}
  </h2>
);

export default Title;
