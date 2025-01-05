import { useIntl } from 'react-intl';
import { ButtonBase } from '@mui/material';
import { twJoin } from 'tailwind-merge';
import { ChildrenProps } from '@/types';

const Container = ({ children }: ChildrenProps) => (
  <div className="flex w-full flex-col gap-6 rounded-[0.625rem] bg-[--bg-primary] md:px-6 md:py-8">
    <div className="flex w-full flex-col gap-8 md:mx-auto md:my-0 md:w-4/5 md:items-center lg:w-3/5">
      {/* <div className="flex flex-col rounded-[0.625rem] border border-gray-50/50 bg-[--bg-primary] px-4 py-8 md:px-8 md:py-10"> */}
      {children}
    </div>
  </div>
);

type TabsProps = {
  activeTab: 'default' | 'prompt';
  setActiveTab: (tab: 'default' | 'prompt') => void;
};

const Tabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const intl = useIntl();
  const tabs = [
    { key: 'default', label: intl.$t({ id: 'Dashboard.TabDefault' }) },
    { key: 'prompt', label: intl.$t({ id: 'Dashboard.TabPrompt' }) },
  ] as const;

  return (
    <div className="-mx-4 overflow-x-auto overflow-y-hidden px-4 scrollbar-hide">
      <div className="flex gap-4 border-b border-[--border-secondary]">
        {tabs.map(({ key, label }) => (
          <ButtonBase
            key={key}
            className={twJoin(
              'mb-[-1px] whitespace-nowrap rounded-tl-[0.625rem] rounded-tr-[0.625rem] px-5 py-2.5 text-base text-gray-300',
              key === activeTab ? 'bg-001 text-white' : 'border border-solid border-[--border-secondary]',
            )}
            onClick={() => setActiveTab(key)}
          >
            {label}
          </ButtonBase>
        ))}
      </div>
    </div>
  );
};

export default {
  Container,
  Tabs,
};
