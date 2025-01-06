import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useSearchParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AppButton, AppError, AppTextFieldForm, AppTextFieldFormPassword } from '@/components';
import PublicContainer from '@/components/public-container';
import { useLogin } from '@/hooks';
import { createEmailValidator, createSimplePasswordValidator } from '@/utils/validation';

const Login = () => {
  const intl = useIntl();
  const useLoginUser = useLogin();
  const [searchParams] = useSearchParams();

  const errorsMessage = {
    invalid_credentials: intl.$t({ id: 'Error.InvalidEmailOrPassword' }),
    email_not_confirmed: intl.$t({ id: 'Error.EmailNotConfirmed' }),
  } as const;

  const formSchema = z.object({ email: createEmailValidator(intl), password: createSimplePasswordValidator(intl) });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { email: searchParams.get('email') || '', password: '' },
  });

  return (
    <PublicContainer className="gap-8" onSubmit={form.handleSubmit((data) => useLoginUser.mutate(data))}>
      <PublicContainer.Title>
        <FormattedMessage id="Login.Title" />
      </PublicContainer.Title>
      <div className="flex flex-col gap-6">
        {useLoginUser.isError && (
          <AppError errorMessage={errorsMessage[useLoginUser.error as 'invalid_credentials' | 'email_not_confirmed']} />
        )}
        <AppTextFieldForm
          autoFocus
          control={form.control}
          field="email"
          inputProps={{ autoComplete: 'email' }}
          label={intl.$t({ id: 'Form.Email' })}
          type="email"
        />
        <AppTextFieldFormPassword
          control={form.control}
          field="password"
          inputProps={{ autoComplete: 'current-password' }}
          label={intl.$t({ id: 'Form.Password' })}
        />
      </div>
      <Link className="self-end font-semibold text-primary-500 no-underline" to="/forgotten">
        <FormattedMessage id="Login.ForgotPassword" />
      </Link>
      <AppButton className="rounded-xl !py-4 !text-base" loading={useLoginUser.isLoading} type="submit">
        <FormattedMessage id="Common.LogIn" />
      </AppButton>
      <div className="self-center text-gray-600">
        <FormattedMessage id="Login.DoNotHaveAnAccount" />
        &nbsp;
        <Link className="self-center font-semibold text-primary-500 no-underline" to="/register">
          <FormattedMessage id="Common.Register" />
        </Link>
      </div>
    </PublicContainer>
  );
};

export default Login;
