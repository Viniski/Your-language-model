import FeaturesList from './dashboard-list';

const DashboardListSkeleton = () => (
  <FeaturesList.Container>
    <FeaturesList.Tabs activeTab="default" setActiveTab={() => {}} />
    <div className="flex flex-col gap-6"></div>
  </FeaturesList.Container>
);

export default DashboardListSkeleton;
