import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AppButton, AppTextFieldFormPassword } from '@/components';
import { useNavigationTransitionConfirmation } from '@/components/navigation-transition-confirmation';
import { createPasswordValidator } from '@/utils/validation';
import FormAccordion from './form-accordion';
import FormDivider from './form-divider';
import supabase from '@/api/supabase-client';

const FormPassword = () => {
  const intl = useIntl();
  const formSchema = z.object({
    newPassword: createPasswordValidator(intl),
  });
  type FormData = z.infer<typeof formSchema>;
  const form = useForm({
    defaultValues: { newPassword: '' },
    resolver: zodResolver(formSchema),
  });
  const isEditing = form.formState.isDirty;
  useNavigationTransitionConfirmation(isEditing);

  const updateProfile = async (value: { newPassword: string }) => {
    const { data, error } = await supabase.auth.updateUser({
      password: value.newPassword,
    });
  };

  return (
    <FormAccordion title={intl.$t({ id: 'Profile.PasswordTitle' })} titleBarClassName="bg-004">
      <FormDivider />
      <div className="grid gap-6 md:grid-cols-2">
        <AppTextFieldFormPassword
          control={form.control}
          field="newPassword"
          label={intl.$t({ id: 'Form.NewPasswordLabel' })}
        />
      </div>
      <FormDivider />
      <div className="flex justify-end">
        <AppButton color="003" disabled={!isEditing} loading={false} onClick={form.handleSubmit(updateProfile)}>
          {intl.$t({ id: 'Common.SaveChanges' })}
        </AppButton>
      </div>
    </FormAccordion>
  );
};

export default FormPassword;
