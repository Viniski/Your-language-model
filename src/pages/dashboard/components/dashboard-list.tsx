import { useIntl } from 'react-intl';
import { Tab, Tabs } from '@mui/material';
import { ChildrenProps } from '@/types';

const Container = ({ children }: ChildrenProps) => (
  <div className="flex w-full flex-col gap-6 rounded-[0.625rem] bg-[--bg-primary] md:px-6 md:py-8">
    <div className="flex w-full flex-col gap-8 md:mx-auto md:my-0 md:w-4/5 md:items-center lg:w-3/5">{children}</div>
  </div>
);

type TabsProps = {
  activeTab: 'default' | 'prompt';
  setActiveTab: (tab: 'default' | 'prompt') => void;
};

const AppTabs = ({ activeTab, setActiveTab }: TabsProps) => {
  const intl = useIntl();
  const tabs = [
    { key: 'default', label: intl.$t({ id: 'Dashboard.Tab.Default' }) },
    { key: 'prompt', label: intl.$t({ id: 'Dashboard.Tab.Prompt' }) },
  ] as const;

  return (
    <Tabs
      className="min-h-[unset] overflow-visible border-[--border-secondary] pb-4 md:border-b md:pb-0"
      value={activeTab}
      variant="scrollable"
      classes={{
        flexContainer: 'gap-4',
        indicator: 'hidden md:block bg-004',
      }}
      onChange={(_, key) => setActiveTab(key)}
    >
      {tabs.map(({ key, label }) => (
        <Tab
          key={key}
          className="min-h-[unset] min-w-[unset] rounded-md bg-transparent px-3 py-2.5 normal-case text-gray-400"
          label={label}
          value={key}
          classes={{
            selected: '!bg-004 text-white md:!bg-transparent md:text-004',
          }}
        />
      ))}
    </Tabs>
  );
};

export default {
  Container,
  AppTabs,
};
