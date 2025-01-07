import { useMutation, useQueryClient } from '@tanstack/react-query';
import supabase from '@/api/supabase-client';

const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => supabase.auth.signOut(),
    onMutate: () => {
      queryClient.resetQueries();
    },
  });
};

export default useLogout;
