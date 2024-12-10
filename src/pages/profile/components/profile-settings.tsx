import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { AppButton, AppTextFieldForm } from '@/components';
import { useNavigationTransitionConfirmation } from '@/components/navigation-transition-confirmation';
import languages from '@/data/languages.json';
import QueryKey from '@/enums/query-key';
import { createSimpleStringValidator } from '@/utils/validation';
import FormAccordion from './form-accordion';
import FormDivider from './form-divider';
import { useState } from 'react';
import supabase from '@/api/supabase-client';

const ProfileSettings = ({
  user,
}: {
  user: { first_name: string; last_name: string; organization: string; phone: string; language: 'pl' | 'en' };
}) => {
  const intl = useIntl();
  const queryClient = useQueryClient();
  const formSchema = z.object({
    firstName: createSimpleStringValidator(intl),
    lastName: createSimpleStringValidator(intl),
    organization: createSimpleStringValidator(intl),
    phone: createSimpleStringValidator(intl),
    language: createSimpleStringValidator(intl),
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

  const [loading, setLoading] = useState(true);
  const updateProfile = async (data: {
    firstName: string;
    lastName: string;
    organization: string;
    phone: string;
    language: string;
  }) => {
    try {
      setLoading(true);
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
    } catch (error) {
      alert(error);
      console.log(error);
    } finally {
      await queryClient.invalidateQueries([QueryKey.USER]);
      setLoading(false);
    }
  };

  return (
    <FormAccordion title={intl.$t({ id: 'Profile.SettingsTitle' })} titleBarClassName="bg-primary">
      <FormDivider />
      <div className="grid gap-6 md:grid-cols-2">
        <AppTextFieldForm control={form.control} field="firstName" label={intl.$t({ id: 'Form.FirstNameLabel' })} />
        <AppTextFieldForm control={form.control} field="lastName" label={intl.$t({ id: 'Form.LastNameLabel' })} />
        <AppTextFieldForm
          control={form.control}
          field="organization"
          label={intl.$t({ id: 'Form.OrganizationLabel' })}
        />
        <AppTextFieldForm control={form.control} field="phone" label={intl.$t({ id: 'Form.PhoneLabel' })} />
        <AppTextFieldForm
          select
          control={form.control}
          field="language"
          label={intl.$t({ id: 'Form.LanguageLabel' })}
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
        <AppButton color="003" disabled={!isEditing} loading={false} onClick={form.handleSubmit(updateProfile)}>
          {intl.$t({ id: 'Common.SaveChanges' })}
        </AppButton>
      </div>
    </FormAccordion>
  );
};

export default ProfileSettings;
