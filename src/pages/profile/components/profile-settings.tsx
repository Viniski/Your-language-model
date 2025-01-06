import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import { z } from 'zod';
import supabase from '@/api/supabase-client';
import { AppButton, AppTextFieldForm } from '@/components';
import { useNavigationTransitionConfirmation } from '@/components/navigation-transition-confirmation';
import { useLanguageStore } from '@/contexts/intl-provider';
import languages from '@/data/languages.json';
import QueryKey from '@/enums/query-key';
import { NullableUser } from '@/types';
import { createSimpleStringValidator } from '@/utils/validation';
import FormAccordion from './form-accordion';
import FormDivider from './form-divider';

const ProfileSettings = ({ user }: { user: NullableUser }) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const { setLanguage } = useLanguageStore();
  const formSchema = z.object({
    firstName: createSimpleStringValidator(intl),
    lastName: createSimpleStringValidator(intl),
    organization: createSimpleStringValidator(intl),
    phone: createSimpleStringValidator(intl),
    language: z.enum(['pl', 'en']),
  });

  type FormData = z.infer<typeof formSchema>;
  const form = useForm({
    defaultValues: {
      firstName: user?.first_name || '',
      lastName: user?.last_name || '',
      organization: user?.organization || '',
      phone: user?.phone || '',
      language: user?.language || 'pl',
    },
    resolver: zodResolver(formSchema),
  });
  const isEditing = form.formState.isDirty;
  useNavigationTransitionConfirmation(isEditing);

  const useUpdateProfileSettings = useMutation({
    mutationFn: async (data: FormData) => {
      const currentUser = await supabase.auth.getUser();

      const updates = {
        id: currentUser.data.user?.id,
        first_name: data.firstName,
        last_name: data.lastName,
        organization: data.organization,
        phone: data.phone,
        language: data.language,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').update(updates).eq('id', currentUser.data.user?.id);

      if (error) {
        throw error;
      }
    },
    onSuccess: (_, variables) => {
      setLanguage(variables.language);
      enqueueSnackbar(intl.$t({ id: 'Profile.UpdateToastSuccess.Title' }, { language: variables.language }));
      queryClient.invalidateQueries([QueryKey.USER]);
      form.reset(variables);
    },
    onError: () => {
      enqueueSnackbar(intl.$t({ id: 'Error.UnexpectedOccurred' }), {
        variant: 'error',
        persist: true,
      });
    },
  });

  return (
    <FormAccordion title={intl.$t({ id: 'Profile.Settings.Title' })} titleBarClassName="bg-primary">
      <FormDivider />
      <div className="grid gap-6 md:grid-cols-2">
        <AppTextFieldForm control={form.control} field="firstName" label={intl.$t({ id: 'Form.FirstName' })} />
        <AppTextFieldForm control={form.control} field="lastName" label={intl.$t({ id: 'Form.LastName' })} />
        <AppTextFieldForm control={form.control} field="organization" label={intl.$t({ id: 'Form.Organization' })} />
        <AppTextFieldForm control={form.control} field="phone" label={intl.$t({ id: 'Form.Phone' })} />
        <AppTextFieldForm
          select
          control={form.control}
          field="language"
          label={intl.$t({ id: 'Form.Language' })}
          SelectProps={{ native: true }}
        >
          {Object.entries(languages).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </AppTextFieldForm>
      </div>
      <FormDivider />
      <div className="flex justify-end">
        <AppButton
          color="003"
          disabled={!isEditing}
          loading={useUpdateProfileSettings.isLoading}
          onClick={form.handleSubmit((values) => useUpdateProfileSettings.mutate(values))}
        >
          <FormattedMessage id="Common.SaveChanges" />
        </AppButton>
      </div>
    </FormAccordion>
  );
};

export default ProfileSettings;
