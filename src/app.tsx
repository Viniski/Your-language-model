import { useEffect, useState } from 'react';
import AppRoutes from './app-routes';
import supabase from './api/supabase-client';
import { Session } from '@supabase/supabase-js';

const App = () => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return <AppRoutes isLoggedIn={!!session} />;
};

export default App;
