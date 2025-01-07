import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import PageTitle from '@/components/page-title';
import DashboardChat from './components/dashboard-chat';
import DashboardList from './components/dashboard-list';
import DashboardPrompt from './components/dashboard-prompt';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'default' | 'prompt'>('default');

  return (
    <div className="flex grow flex-col">
      <div className="mb-8 flex flex-col gap-2">
        <PageTitle>
          <FormattedMessage id="Dashboard.Title" />
        </PageTitle>
        <p className="text-gray-400">
          <FormattedMessage id="Dashboard.Description" />
        </p>
      </div>
      <DashboardList.Container>
        <DashboardList.AppTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {activeTab === 'default' ? <DashboardChat /> : <DashboardPrompt />}
      </DashboardList.Container>
    </div>
  );
};

export default Dashboard;
