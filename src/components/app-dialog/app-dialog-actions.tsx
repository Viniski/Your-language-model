import { twMerge } from 'tailwind-merge';
import { ChildrenProps } from '@/types';

interface ActionsProps extends ChildrenProps {
  className?: string;
}

const Actions = ({ className, children }: ActionsProps) => (
  <div className={twMerge('flex justify-end gap-4', className)}>{children}</div>
);

export default Actions;
