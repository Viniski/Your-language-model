import { useIntl } from 'react-intl';
import YouTube from 'react-youtube';
import { twJoin } from 'tailwind-merge';

const aspectRatio16x9Class =
  'before:float-left before:content-[""] after:content-[""] before:pt-[56.25%] after:block after:clear-both';

const DashboardPrompt = () => {
  const intl = useIntl();

  return (
    <div className={twJoin('w-full', aspectRatio16x9Class)}>
      <YouTube
        className="h-full w-full"
        iframeClassName="h-fill w-full"
        opts={{ playerVars: { autoplay: 1 } }}
        videoId={intl.$t({ id: 'Dashboard.Prompt.VideoId' })}
      />
    </div>
  );
};

export default DashboardPrompt;
