import { useState } from 'react';
import FeaturesList from './dashboard-list';
import { twJoin } from 'tailwind-merge';
import YouTube from 'react-youtube';
import { useIntl } from 'react-intl';

export const aspectRatio16x9Class =
  'before:float-left before:content-[""] after:content-[""] before:pt-[56.25%] after:block after:clear-both';

const DashboardPage = () => {
  const intl = useIntl();
  const [activeTab, setActiveTab] = useState<'default' | 'prompt'>('default');

  return (
    <FeaturesList.Container>
      <FeaturesList.Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'prompt' && (
        <div className={twJoin('w-full', aspectRatio16x9Class)}>
          <YouTube
            className="h-full w-full"
            iframeClassName="h-fill w-full"
            opts={{ playerVars: { autoplay: 1 } }}
            videoId={intl.$t({ id: 'Dashboard.Prompt.VideoId' })}
          />
        </div>
      )}
    </FeaturesList.Container>
  );
};

export default DashboardPage;
