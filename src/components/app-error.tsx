import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { twMerge } from 'tailwind-merge';

const AppError = ({ errorMessage, className }: { errorMessage: string; className?: string }) => (
  <div className={twMerge('flex flex-col gap-1', className)}>
    <div key={errorMessage} className="flex items-center gap-3 text-sm text-error">
      <FontAwesomeIcon icon={faCircleExclamation} size="xl" />
      {errorMessage}
    </div>
  </div>
);

export default AppError;
