import { Drawer, SwipeableDrawer } from '@mui/material';
import { useIsMobile } from '@/hooks';
import { NullableUser } from '@/types';
import NavigationMenu from './navigation-menu';

const ModalProps = { keepMounted: true };

const drawerClasses = {
  root: 'w-[245px]',
  paper:
    'top-[--app-header-height] bottom-0 h-[unset] w-[245px] border-[--border-primary] bg-[--bg-primary] bg-none shadow-none',
};

const swipeableDrawerClasses = {
  paper: 'w-[300px] border-[--border-primary] rounded-tr-2xl rounded-br-2xl bg-[--bg-primary] bg-none shadow-none',
};

const swipeableDrawerComponentsProps = {
  backdrop: {
    className: 'bg-[--bg-backdrop-primary]',
  },
};

const Navigation = ({
  user,
  isNavigationOpen,
  toggleNavigation,
}: {
  user: NullableUser;
  isNavigationOpen: boolean;
  toggleNavigation: () => void;
}) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <SwipeableDrawer
        disableSwipeToOpen
        classes={swipeableDrawerClasses}
        componentsProps={swipeableDrawerComponentsProps}
        ModalProps={ModalProps}
        open={isNavigationOpen}
        variant="temporary"
        onClose={toggleNavigation}
        onOpen={toggleNavigation}
      >
        <NavigationMenu toggleNavigation={toggleNavigation} user={user} />
      </SwipeableDrawer>
    );
  }

  return (
    <Drawer classes={drawerClasses} ModalProps={ModalProps} variant="permanent" onClose={toggleNavigation}>
      <NavigationMenu toggleNavigation={toggleNavigation} user={user} />
    </Drawer>
  );
};

export default Navigation;
