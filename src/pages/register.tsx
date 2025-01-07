import { Controller, useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormControlLabel } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { twJoin } from 'tailwind-merge';
import { z } from 'zod';
import supabase from '@/api/supabase-client';
import { AppButton, AppCheckbox, AppTextFieldForm, AppTextFieldFormPassword } from '@/components';
import PublicContainer from '@/components/public-container';
import { createEmailValidator, createPasswordValidator, createSimpleStringValidator } from '@/utils/validation';

const Register = ({ initialEmail, hasLoginLink = true }: { initialEmail?: string; hasLoginLink?: boolean }) => {
  const intl = useIntl();

  const formSchema = z.object({
    firstName: createSimpleStringValidator(intl),
    lastName: createSimpleStringValidator(intl),
    organization: createSimpleStringValidator(intl),
    phone: createSimpleStringValidator(intl),
    email: createEmailValidator(intl),
    password: createPasswordValidator(intl),
    privacyPolicy: z.literal<boolean>(true),
    terms: z.literal<boolean>(true),
  });
  type FormData = z.infer<typeof formSchema>;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      organization: '',
      phone: '',
      email: initialEmail || '',
      password: '',
      privacyPolicy: false,
      terms: false,
    },
  });

  const agreements = [
    {
      name: 'privacyPolicy',
      label: intl.$t({ id: 'Register.AgreementPrivacyPolicy' }),
      link: intl.$t({ id: 'Common.PrivacyPolicyLink' }),
    },
    {
      name: 'terms',
      label: intl.$t({ id: 'Register.AgreementTerms' }),
      link: intl.$t({ id: 'Common.TermsLink' }),
    },
  ] as const;

  const registerUserMutation = useMutation({
    mutationFn: async (values: FormData) =>
      supabase.auth
        .signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              first_name: values.firstName,
              last_name: values.lastName,
              organization: values.organization,
              phone: values.phone,
              language: intl.locale,
            },
          },
        })
        .then(({ data }) => data),
  });

  if (registerUserMutation.isSuccess || registerUserMutation.isError) {
    return (
      <PublicContainer className="items-center gap-8">
        <img
          alt=""
          className="max-w-full"
          height={148}
          src={registerUserMutation.isError ? '/images/action-error.svg' : '/images/action-success.svg'}
          width={262}
        />
        <div className="mb-6 flex flex-col items-center gap-2.5">
          <PublicContainer.Title className="whitespace-pre-line text-center">
            <FormattedMessage id={registerUserMutation.isError ? 'Register.Error.Title' : 'Register.Success.Title'} />
          </PublicContainer.Title>
          <p className="text-center text-gray-300">
            <FormattedMessage
              id={registerUserMutation.isError ? 'Register.Error.Description' : 'Register.Success.Description'}
            />
          </p>
        </div>
        <Link className="self-center font-semibold text-primary-500 no-underline" to="/">
          <FormattedMessage id="Common.BackToLogin" />
        </Link>
      </PublicContainer>
    );
  }

  return (
    <>
      <PublicContainer className="gap-8">
        <PublicContainer.Title>
          <FormattedMessage id="Register.Title" />
        </PublicContainer.Title>
        <form className="flex flex-col gap-8" onSubmit={form.handleSubmit((data) => registerUserMutation.mutate(data))}>
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold">
              <FormattedMessage id="Register.ProfileDataTitle" />
            </h2>
            <div className="flex flex-col gap-4 md:gap-6">
              <AppTextFieldForm
                autoFocus
                control={form.control}
                field="firstName"
                label={intl.$t({ id: 'Form.FirstName' })}
              />
              <AppTextFieldForm control={form.control} field="lastName" label={intl.$t({ id: 'Form.LastName' })} />
              <AppTextFieldForm
                control={form.control}
                field="organization"
                label={intl.$t({ id: 'Form.Organization' })}
              />
              <AppTextFieldForm control={form.control} field="phone" label={intl.$t({ id: 'Form.Phone' })} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold">
              <FormattedMessage id="Register.LoginDataTitle" />
            </h2>
            <div className="flex flex-col gap-4 md:gap-6">
              <AppTextFieldForm
                control={form.control}
                field="email"
                inputProps={{ autoComplete: 'email' }}
                label={intl.$t({ id: 'Form.Email' })}
                type="email"
              />
              <AppTextFieldFormPassword
                control={form.control}
                field="password"
                inputProps={{ autoComplete: 'new-password' }}
                label={intl.$t({ id: 'Form.Password' })}
              />
            </div>
          </div>
          <div className="flex flex-col">
            {agreements.map(({ name, label, link }) => (
              <Controller
                key={name}
                control={form.control}
                name={name}
                render={({ field, fieldState }) => (
                  <>
                    <FormControlLabel
                      control={
                        <AppCheckbox
                          checked={field.value}
                          classes={{ checked: 'text-primary' }}
                          className={twJoin('mr-0.5', fieldState.invalid && 'text-error')}
                          onChange={(_, checked) => field.onChange(checked)}
                        />
                      }
                      label={
                        <p className="text-sm text-gray-500">
                          <FormattedMessage
                            id="Register.Agreement"
                            values={{
                              link: (
                                <a className="text-primary-500" href={link} rel="noreferrer" target="_blank">
                                  {label}
                                </a>
                              ),
                            }}
                          />
                        </p>
                      }
                    />
                    {fieldState.invalid && (
                      <p className="ml-8 text-xs text-error">
                        <FormattedMessage id="Form.FieldRequired" />
                      </p>
                    )}
                  </>
                )}
              />
            ))}
          </div>
          <AppButton className="rounded-xl !py-4 !text-base" loading={registerUserMutation.isLoading} type="submit">
            <FormattedMessage id="Common.Register" />
          </AppButton>
          {hasLoginLink && (
            <div className="self-center text-gray-600">
              <FormattedMessage id="Register.HaveAnAccount" />
              &nbsp;
              <Link className="self-center font-semibold text-primary-500 no-underline" to="/">
                <FormattedMessage id="Common.LogIn" />
              </Link>
            </div>
          )}
        </form>
      </PublicContainer>
      <div className="m-auto max-w-5xl text-center text-sm text-white">
        <FormattedMessage id="Register.Gdpr" />
      </div>
    </>
  );
};

export default Register;
