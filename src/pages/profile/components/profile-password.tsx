import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { z } from 'zod';
import supabase from '@/api/supabase-client';
import { AppButton, AppTextFieldFormPassword } from '@/components';
import { useNavigationTransitionConfirmation } from '@/components/navigation-transition-confirmation';
import { createPasswordValidator } from '@/utils/validation';
import FormAccordion from './form-accordion';
import FormDivider from './form-divider';

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

  const updateProfilePasswordMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      enqueueSnackbar(intl.$t({ id: 'Profile.UpdateToastSuccess.Title' }), {
        variant: 'success',
      });
      form.reset();
    },
    onError: () => {
      enqueueSnackbar(intl.$t({ id: 'Error.UnexpectedOccurred' }), {
        variant: 'error',
        persist: true,
      });
    },
  });

  return (
    <FormAccordion title={intl.$t({ id: 'Profile.Password.Title' })}>
      <FormDivider />
      <div className="grid gap-6 md:grid-cols-2">
        <AppTextFieldFormPassword
          control={form.control}
          field="newPassword"
          label={intl.$t({ id: 'Form.NewPassword' })}
        />
      </div>
      <FormDivider />
      <div className="flex justify-end">
        <AppButton
          color="003"
          disabled={!isEditing}
          loading={updateProfilePasswordMutation.isLoading}
          onClick={form.handleSubmit((values) => updateProfilePasswordMutation.mutate(values))}
        >
          <FormattedMessage id="Common.SaveChanges" />
        </AppButton>
      </div>
    </FormAccordion>
  );
};

export default FormPassword;
