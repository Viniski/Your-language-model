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

  const useUpdateProfilePassword = useMutation({
    mutationFn: async (data: FormData) => {
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword,
      });

      if (error) {
        throw error;
      }
    },
    onSuccess: (_, variables) => {
      enqueueSnackbar(intl.$t({ id: 'Profile.UpdateToastSuccessTitle' }), {
        variant: 'success',
      });
      form.reset(variables);
    },
    onError: () => {
      enqueueSnackbar(intl.$t({ id: 'Error.CommonError' }), {
        variant: 'error',
        persist: true,
      });
    },
  });

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
        <AppButton
          color="003"
          disabled={!isEditing}
          loading={useUpdateProfilePassword.isLoading}
          onClick={form.handleSubmit((values) => useUpdateProfilePassword.mutate(values))}
        >
          <FormattedMessage id="Common.SaveChanges" />
        </AppButton>
      </div>
    </FormAccordion>
  );
};

export default FormPassword;
