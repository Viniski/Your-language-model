import { FormEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import { ChildrenProps } from '@/types';
import Title from './public-container-title';

interface Props extends ChildrenProps {
  className?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
}

const PublicContainer = ({ children, className, onSubmit }: Props) => {
  const componentClassName = twMerge(
    'm-auto flex w-full max-w-[560px] flex-col rounded-xl bg-[--bg-primary] p-6 md:p-16',
    className,
  );

  if (onSubmit) {
    return (
      <form className={componentClassName} onSubmit={onSubmit}>
        {children}
      </form>
    );
  }

  return <div className={componentClassName}>{children}</div>;
};

PublicContainer.Title = Title;

export default PublicContainer;
