import { useIntl } from 'react-intl';
import PageTitle from '@/components/page-title';
import ProfileEmail from './components/profile-email';
import ProfilePassword from './components/profile-password';
import ProfileSettings from './components/profile-settings';
import { useQuery } from '@tanstack/react-query';
import QueryKey from '@/enums/query-key';
import supabase from '@/api/supabase-client';
import { AppLoader } from '@/components';
import { log } from 'node:console';

const Divider = () => <div className="mx-8 hidden border-b border-[--border-secondary] md:flex" />;

const fetchProfile = async () => {
  const user = await supabase.auth.getUser();

  return await supabase
    .from('profiles')
    .select(`first_name, last_name, organization, phone, language`)
    .eq('id', user.data.user?.id)
    .single()
    .then(({ data }) => data);
};

const Profile = () => {
  const intl = useIntl();
  const currentUserQuery = useQuery({
    queryKey: [QueryKey.USER],
    queryFn: fetchProfile,
  });

  if (currentUserQuery.isLoading) {
    <AppLoader />;
  }

  return (
    <div className="flex flex-col gap-8">
      <PageTitle>{intl.$t({ id: 'Profile.Title' })}</PageTitle>
      <div className="flex flex-col gap-8 md:gap-0 md:rounded-[0.625rem] md:border md:border-gray-50/50 md:bg-[--bg-primary]">
        {currentUserQuery.data && <ProfileSettings user={currentUserQuery.data} />}
        <Divider />
        <ProfilePassword />
        <Divider />
        <ProfileEmail />
      </div>
    </div>
  );
};

export default Profile;
