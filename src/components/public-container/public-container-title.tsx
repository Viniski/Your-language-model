import { twMerge } from 'tailwind-merge';
import { ChildrenProps } from '@/types';

interface Props extends ChildrenProps {
  className?: string;
}

const PublicFormTitle = ({ children, className }: Props) => (
  <h1 className={twMerge('text-2xl font-bold md:text-3xl', className)}>{children}</h1>
);

export default PublicFormTitle;
