import { useQuery } from '@tanstack/react-query';
import QueryKey from '@/enums/query-key';
import supabase from '@/api/supabase-client';

const fetchProfile = async () => {
  const user = await supabase.auth.getUser();

  return await supabase
    .from('profiles')
    .select(`first_name, last_name, organization, phone, language`)
    .eq('id', user.data.user?.id)
    .single()
    .then(({ data }) => data);
};

const useCurrentUserQuery = () =>
  useQuery({
    queryKey: [QueryKey.CURRENT_USER],
    queryFn: fetchProfile,
    staleTime: Infinity,
  });

export default useCurrentUserQuery;
