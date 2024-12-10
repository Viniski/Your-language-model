import { useState } from 'react';
import { useIntl } from 'react-intl';
import { Outlet } from 'react-router-dom';
import dayjs from 'dayjs';
import NavigationTransitionConfirmation from '@/components/navigation-transition-confirmation';
import { useCurrentUserQuery, useIsMobile } from '@/hooks';
import Header from '@/layouts/main/header';
import Navigation from '@/layouts/main/navigation';

const Main = () => {
  const intl = useIntl();
  const isMobile = useIsMobile();
  const [prevIsMobile, setPrevIsMobile] = useState(isMobile);
  const currentUserQuery = useCurrentUserQuery();
  const [isNavigationOpen, setIsNavigationOpen] = useState(!isMobile);
  const toggleNavigation = () => setIsNavigationOpen((value) => !value);

  if (isMobile !== prevIsMobile) {
    setPrevIsMobile(isMobile);
    setIsNavigationOpen(!isMobile);
  }

  return (
    <div className="flex h-full flex-col">
      <Header toggleNavigation={toggleNavigation} user={currentUserQuery.data} />
      <div className="flex h-full overflow-hidden">
        <Navigation
          user={currentUserQuery.data}
          isNavigationOpen={isNavigationOpen}
          toggleNavigation={toggleNavigation}
        />
        <div className="flex h-full w-full flex-col overflow-auto bg-[--bg-secondary]">
          <main className="flex grow-[1] flex-col px-6 py-14 md:px-8 md:py-10">
            <Outlet />
          </main>
          <footer className="flex justify-end gap-2 border-t border-[--border-primary] p-4 text-xs md:gap-6 md:px-8 md:text-sm">
            <a
              className="text-gray-500 no-underline"
              href={intl.$t({ id: 'Footer.Link' })}
              rel="noreferrer"
              target="_blank"
            >
              {intl.$t({ id: 'Footer.Title' }, { currentYear: dayjs().year() })}
            </a>
          </footer>
        </div>
      </div>
      <NavigationTransitionConfirmation />
    </div>
  );
};

export default Main;
