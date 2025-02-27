import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/api/supabase-client';
import QueryKey from '@/enums/query-key';

const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  return useMutation({
    mutationFn: async (value: { email: string; password: string }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: value.email,
        password: value.password,
      });

      if (error) {
        throw error.code;
      }

      return data;
    },
    onSuccess: () => {
      const redirect = searchParams.get('redirect');

      if (redirect) {
        navigate(redirect);
      }

      queryClient.invalidateQueries([QueryKey.CURRENT_USER]);
    },
  });
};

export default useLogin;
