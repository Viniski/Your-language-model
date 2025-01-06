import { FormattedMessage, useIntl } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { faMap, faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListItemButton } from '@mui/material';
import { useIsMobile, useLogout } from '@/hooks';
import { NullableUser } from '@/types';

const NavigationMenu = ({ user, toggleNavigation }: { user: NullableUser; toggleNavigation: () => void }) => {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const logout = useLogout();

  const links = [
    { to: '/features', icon: faMap, text: intl.$t({ id: 'Nav.Dashboard' }) },
    { to: '/profile', icon: faUser, text: intl.$t({ id: 'Nav.Profile' }) },
  ];

  const toggleNavigationOnMobile = () => {
    if (isMobile) {
      toggleNavigation();
    }
  };

  const onLogoutClick = () => {
    logout.mutate();
    toggleNavigationOnMobile();
  };

  return (
    <nav className="flex h-full flex-col px-2.5 py-14 md:py-10">
      <div className="mb-14 flex items-center gap-3 px-5 text-001 md:hidden">
        <div className="flex rounded-full border border-001 p-1.5">
          <FontAwesomeIcon className="w-[1em] text-lg" icon={faUser} />
        </div>
        {user && <div className="text-lg font-bold">{`${user.first_name} ${user.last_name}`}</div>}
      </div>
      {links.map(({ to, icon, text }) => (
        <ListItemButton
          key={to}
          className="mb-2 flex grow-0 items-center gap-3 rounded-md px-5 py-3 text-gray-600 no-underline [&.active]:pointer-events-none [&.active]:bg-001 [&.active]:text-white"
          component={NavLink}
          to={to}
          onClick={toggleNavigationOnMobile}
        >
          <FontAwesomeIcon className="text-lg" icon={icon} />
          {text}
        </ListItemButton>
      ))}
      <div className="mt-auto">
        <div className="mb-10 border-b border-gray-400/20 md:hidden" />
        <ListItemButton className="flex items-center gap-3 rounded-md px-5 py-3 text-gray-500" onClick={onLogoutClick}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} size="lg" />
          <FormattedMessage id="Nav.Logout" />
        </ListItemButton>
      </div>
    </nav>
  );
};
export default NavigationMenu;
