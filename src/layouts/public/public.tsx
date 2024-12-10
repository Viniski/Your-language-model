import { Outlet } from 'react-router-dom';

const Public = () => (
  <div
    className="flex min-h-full w-full flex-col gap-6 bg-cover bg-fixed bg-no-repeat p-6"
    style={{ backgroundImage: 'var(--bg-public)' }}
  >
    <Outlet />
  </div>
);

export default Public;
