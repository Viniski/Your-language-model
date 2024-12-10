import { useRef } from 'react';
import { QueryClientProvider as OrgQueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ChildrenProps } from '@/types';

const QueryClientProvider = ({ children }: ChildrenProps) => {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
    }),
  );

  return <OrgQueryClientProvider client={queryClient.current}>{children}</OrgQueryClientProvider>;
};

export default QueryClientProvider;
