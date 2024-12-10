import { useContext, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { AppButton, AppDialog } from '@/components';

const NavigationTransitionConfirmationContent = () => {
  const intl = useIntl();
  const { navigator } = useContext(NavigationContext);
  const [handleConfirm, setHandleConfirm] = useState<(() => void) | null>();

  useEffect(() => {
    // @ts-ignore
    const unblock = navigator.block((transition) => {
      setHandleConfirm(() => () => {
        unblock();
        transition.retry();
      });
    });

    return unblock;
  }, [navigator]);

  return (
    <AppDialog.Container className="text-center" open={!!handleConfirm}>
      <AppDialog.Title className="mr-0">{intl.$t({ id: 'Common.PageLeaveConfirmationTitle' })}</AppDialog.Title>
      <AppDialog.Description>{intl.$t({ id: 'Common.PageLeaveConfirmationDescription' })}</AppDialog.Description>
      <AppDialog.Actions className="mt-5 justify-center">
        <AppButton color="003" variant="outlined" onClick={() => handleConfirm?.()}>
          {intl.$t({ id: 'Common.PageLeaveConfirmationConfirm' })}
        </AppButton>
        <AppButton color="003" onClick={() => setHandleConfirm(null)}>
          {intl.$t({ id: 'Common.PageLeaveConfirmationCancel' })}
        </AppButton>
      </AppDialog.Actions>
    </AppDialog.Container>
  );
};

export default NavigationTransitionConfirmationContent;
