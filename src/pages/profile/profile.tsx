import { FormattedMessage } from 'react-intl';
import { AppLoader } from '@/components';
import PageTitle from '@/components/page-title';
import { useCurrentUserQuery } from '@/hooks';
import ProfileEmail from './components/profile-email';
import ProfilePassword from './components/profile-password';
import ProfileSettings from './components/profile-settings';

const Divider = () => <div className="mx-8 hidden border-b border-[--border-secondary] md:flex" />;

const Profile = () => {
  const currentUserQuery = useCurrentUserQuery();

  if (currentUserQuery.isLoading || !currentUserQuery.data) {
    return <AppLoader />;
  }

  return (
    <div className="flex flex-col gap-8">
      <PageTitle>
        <FormattedMessage id="Profile.Title" />
      </PageTitle>
      <div className="flex flex-col gap-8 md:gap-0 md:rounded-[0.625rem] md:border md:border-gray-50/50 md:bg-[--bg-primary]">
        <ProfileSettings user={currentUserQuery.data} />
        <Divider />
        <ProfilePassword />
        <Divider />
        <ProfileEmail />
      </div>
    </div>
  );
};

export default Profile;
