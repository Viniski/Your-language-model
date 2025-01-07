import { FormattedMessage } from 'react-intl';
import PageTitle from '@/components/page-title';

const Models = () => (
    <div className="flex grow flex-col">
      <div className="mb-8 flex flex-col gap-2">
        <PageTitle>
          <FormattedMessage id="Models.Title" />
        </PageTitle>
        <p className="text-gray-400">
          <FormattedMessage id="Models.Wip" />
        </p>
      </div>
    </div>
  );

export default Models;
