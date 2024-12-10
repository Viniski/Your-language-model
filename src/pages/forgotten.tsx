import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { enqueueSnackbar } from 'notistack';
import { twJoin } from 'tailwind-merge';
import { z } from 'zod';
import { AppButton, AppTextFieldForm } from '@/components';
import PublicContainer from '@/components/public-container';
import { createEmailValidator } from '@/utils/validation';
import supabase from '@/api/supabase-client';
import { useEffect } from 'react';

const Forgotten = () => {
  const intl = useIntl();
  const [searchParams] = useSearchParams();
  const useRemindPassword = useMutation({
    mutationFn: async (email: string) =>
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:3000/reset/super_secret_token',
      }),
  });

  const formSchema = z.object({ email: createEmailValidator(intl) });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: searchParams.get('email') || '' },
  });

  return (
    <PublicContainer
      className={twJoin(useRemindPassword.isSuccess && 'items-center')}
      onSubmit={form.handleSubmit(({ email }) => useRemindPassword.mutate(email))}
    >
      {useRemindPassword.isSuccess ? (
        <>
          <img
            alt={intl.$t({ id: 'Forgotten.EmailSentTitle' })}
            className="mb-6 max-w-full"
            height={148}
            src="/images/email-sent.svg"
            width={262}
          />
          <PublicContainer.Title className="mb-2.5">
            {intl.$t({ id: 'Forgotten.EmailSentTitle' })}
          </PublicContainer.Title>
          <p className="mb-6 flex flex-col items-center text-center text-gray-600">
            {intl.$t({ id: 'Forgotten.EmailSentDescription' })}
            <span className="font-bold text-primary-900">{form.getValues('email')}</span>
          </p>
          <Link className="self-center font-semibold text-primary-500 no-underline" to="/">
            <FormattedMessage id="Common.BackToLogin" />
          </Link>
        </>
      ) : (
        <>
          <PublicContainer.Title className="mb-3">{intl.$t({ id: 'Forgotten.Title' })}</PublicContainer.Title>
          <p className="mb-8 text-gray-600">{intl.$t({ id: 'Forgotten.Description' })}</p>
          <AppTextFieldForm
            className="mb-5"
            control={form.control}
            field="email"
            inputProps={{ autoComplete: 'email' }}
            label={intl.$t({ id: 'Form.EmailLabel' })}
          />
          <AppButton
            className="rounded-xl !py-4 !text-base !font-normal"
            loading={useRemindPassword.isLoading}
            type="submit"
          >
            {intl.$t({ id: 'Forgotten.ResetPassword' })}
          </AppButton>
          <div className="mt-8 self-center text-gray-600">
            {intl.$t({ id: 'Forgotten.RememberPassword' })}&nbsp;
            <Link className="self-center font-semibold text-primary-500 no-underline" to="/">
              {intl.$t({ id: 'Common.LogIn' })}
            </Link>
          </div>
        </>
      )}
    </PublicContainer>
  );
};

export default Forgotten;
