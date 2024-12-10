import { MemoryRouter } from 'react-router-dom';
import AppContextsProvider from '@/contexts';
import { ChildrenProps } from '@/types';

const TestContextProvider = ({ children }: ChildrenProps) => (
  <MemoryRouter>
    <AppContextsProvider>{children}</AppContextsProvider>
  </MemoryRouter>
);

export default TestContextProvider;
