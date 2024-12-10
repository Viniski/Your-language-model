import { CircularProgress } from '@mui/material';
import { twMerge } from 'tailwind-merge';

interface Props {
  className?: string;
}

const AppLoader = ({ className }: Props) => (
  <div className={twMerge('flex h-full w-full items-center justify-center', className)}>
    <CircularProgress size={64} />
  </div>
);

export default AppLoader;
