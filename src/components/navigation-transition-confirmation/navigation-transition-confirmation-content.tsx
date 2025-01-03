import { useContext, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';
import { AppButton, AppDialog } from '@/components';

const NavigationTransitionConfirmationContent = () => {
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
      <AppDialog.Title className="mr-0">
        <FormattedMessage id="Common.PageLeaveConfirmationTitle" />
      </AppDialog.Title>
      <AppDialog.Description>
        <FormattedMessage id="Common.PageLeaveConfirmationDescription" />
      </AppDialog.Description>
      <AppDialog.Actions className="mt-5 justify-center">
        <AppButton color="003" variant="outlined" onClick={() => handleConfirm?.()}>
          <FormattedMessage id="Common.PageLeaveConfirmationConfirm" />
        </AppButton>
        <AppButton color="003" onClick={() => setHandleConfirm(null)}>
          <FormattedMessage id="Common.PageLeaveConfirmationCancel" />
        </AppButton>
      </AppDialog.Actions>
    </AppDialog.Container>
  );
};

export default NavigationTransitionConfirmationContent;
