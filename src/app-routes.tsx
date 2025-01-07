import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Main from '@/layouts/main';
import Public from '@/layouts/public';
import Dashboard from '@/pages/dashboard';
import Forgotten from '@/pages/forgotten';
import Login from '@/pages/login';
import Models from '@/pages/models';
import Profile from '@/pages/profile';
import Register from '@/pages/register';
import Reset from '@/pages/reset';

const AppRoutes = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const location = useLocation();
  const isResetRoute = location.pathname.startsWith('/reset/');

  return (
    <Routes>
      {isLoggedIn && !isResetRoute ? (
        <Route element={<Main />}>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Models />} path="/models" />
          <Route element={<Profile />} path="/profile" />
          <Route element={<Navigate replace to="/dashboard" />} path="*" />
        </Route>
      ) : (
        <Route element={<Public />}>
          <Route element={<Login />} path="/" />
          <Route element={<Register />} path="/register" />
          <Route element={<Forgotten />} path="/forgotten" />
          <Route element={<Reset />} path="/reset/:token" />
          <Route element={<Navigate replace to="/" />} path="*" />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
