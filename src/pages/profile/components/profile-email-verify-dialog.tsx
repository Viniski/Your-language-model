import { FormattedMessage } from 'react-intl';
import { AppButton, AppDialog } from '@/components';

const ProfileEmailVerifyDialog = ({ open, onClose }: { open: boolean; onClose: () => void }) => (
  <AppDialog.Container open={open}>
    <AppDialog.Title onClose={onClose}>
      <FormattedMessage id="Profile.VerifyEmailDialogTitle" />
    </AppDialog.Title>
    <AppDialog.Description className="mb-8 flex flex-col gap-2">
      <p>
        <FormattedMessage id="Profile.VerifyEmailDialogDescription1" />
      </p>
    </AppDialog.Description>
    <AppDialog.Actions>
      <AppButton color="003" variant="outlined" onClick={onClose}>
        <FormattedMessage id="Common.Ok" />
      </AppButton>
    </AppDialog.Actions>
  </AppDialog.Container>
);

export default ProfileEmailVerifyDialog;
