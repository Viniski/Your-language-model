import { twMerge } from 'tailwind-merge';
import { ChildrenProps } from '@/types';

interface Props extends ChildrenProps {
  className?: string;
}

const Description = ({ children, className }: Props) => (
  <p className={twMerge('text-gray-300', className)}>{children}</p>
);

export default Description;
