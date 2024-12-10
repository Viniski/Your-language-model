import { FormattedMessage } from 'react-intl';
import PageTitle from '@/components/page-title';
import DashboardPage from './components/dashboard-page';

const Dashboard = () => (
  <div className="flex grow flex-col">
    <div className="mb-8 flex flex-col gap-8 md:gap-0">
      <PageTitle>
        <FormattedMessage id="Dashboard.Title" />
      </PageTitle>
      <p className="text-gray-400">
        <FormattedMessage id="Dashboard.Description" />
      </p>
    </div>
    <DashboardPage />
  </div>
);

export default Dashboard;
