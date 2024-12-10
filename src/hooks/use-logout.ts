import supabase from '@/api/supabase-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
