import { Link } from 'react-router-dom';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';
import { AppLogo } from '@/components';
import { NullableUser } from '@/types';

const Header = ({ user, toggleNavigation }: { user: NullableUser; toggleNavigation: () => void }) => (
  <header className="flex min-h-[--app-header-height] items-center justify-between border-b border-[--border-primary] bg-[--bg-primary] px-8">
    <IconButton className="-ml-2 md:hidden" onClick={toggleNavigation}>
      <FontAwesomeIcon icon={faBars} />
    </IconButton>
    <Link className="flex" to="/">
      <AppLogo />
    </Link>
    <div className="hidden gap-6 md:flex">
      <div className="flex items-center gap-3 text-gray-600">
        <FontAwesomeIcon icon={faUser} />
        {user && <span className="text-sm">{`${user.first_name} ${user.last_name}`}</span>}
      </div>
    </div>
  </header>
);

export default Header;
