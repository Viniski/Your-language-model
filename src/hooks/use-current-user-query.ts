import { useQuery } from '@tanstack/react-query';
import supabase from '@/api/supabase-client';
import QueryKey from '@/enums/query-key';

const fetchProfile = async () => {
  const user = await supabase.auth.getUser();

  const { data } = await supabase
    .from('profiles')
    .select(`first_name, last_name, organization, phone, language`)
    .eq('id', user.data.user?.id)
    .single();

  return data;
};

const useCurrentUserQuery = () =>
  useQuery({
    queryKey: [QueryKey.CURRENT_USER],
    queryFn: fetchProfile,
    staleTime: Infinity,
  });

export default useCurrentUserQuery;
