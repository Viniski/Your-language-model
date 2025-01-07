import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import supabase from './api/supabase-client';
import AppRoutes from './app-routes';
import { AppLoader } from './components';

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: supabaseSession } }) => {
      setSession(supabaseSession);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, supabaseSession) => {
      setSession(supabaseSession);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return <AppLoader />;
  }

  return <AppRoutes isLoggedIn={!!session} />;
};

export default App;
