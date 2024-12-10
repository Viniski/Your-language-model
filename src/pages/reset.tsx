import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { twJoin } from 'tailwind-merge';
import { z } from 'zod';
import { AppButton, AppTextFieldFormPassword } from '@/components';
import PublicContainer from '@/components/public-container';
import { createPasswordValidator } from '@/utils/validation';
import supabase from '@/api/supabase-client';
import { useLogout } from '@/hooks';

const Reset = () => {
  const intl = useIntl();
  const logout = useLogout();
  const { token = '' } = useParams();

  const useResetPassword = useMutation({
    mutationFn: async (password: FormData['password']) => {
      if (token !== 'super_secret_token') {
        throw Error;
      }

      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        throw error;
      }
    },
    onSettled: () => {
      logout.mutate();
    },
  });
  type FormData = z.infer<typeof formSchema>;
  const formSchema = z.object({ password: createPasswordValidator(intl) });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { password: '' },
  });
  const isMutationSent = useResetPassword.isSuccess || useResetPassword.isError;

  return (
    <PublicContainer
      className={twJoin(isMutationSent && 'items-center')}
      onSubmit={form.handleSubmit(({ password }) => useResetPassword.mutate(password))}
    >
      {isMutationSent ? (
        <>
          <img
            alt=""
            className="mb-8 max-w-full"
            height={148}
            src={useResetPassword.isError ? '/images/action-error.svg' : '/images/action-success.svg'}
            width={262}
          />
          <div className="mb-6 flex flex-col items-center gap-2.5">
            <PublicContainer.Title className="whitespace-pre-line text-center">
              {intl.$t({ id: useResetPassword.isError ? 'Reset.TitleError' : 'Reset.TitleSuccess' })}
            </PublicContainer.Title>
            {useResetPassword.isError && (
              <p className="text-center text-gray-300">{intl.$t({ id: 'Reset.DescriptionError' })}</p>
            )}
          </div>
        </>
      ) : (
        <>
          <PublicContainer.Title className="mb-3">{intl.$t({ id: 'Reset.Title' })}</PublicContainer.Title>
          <p className="mb-8 text-gray-600">{intl.$t({ id: 'Reset.Description' })}</p>
          <AppTextFieldFormPassword
            className="mb-5"
            control={form.control}
            field="password"
            inputProps={{ autoComplete: 'new-password' }}
            label={intl.$t({ id: 'Form.PasswordLabel' })}
          />
          <AppButton
            className="mb-8 rounded-xl !py-4 !text-base !font-normal"
            loading={useResetPassword.isLoading}
            type="submit"
          >
            {intl.$t({ id: 'Reset.ChangePassword' })}
          </AppButton>
        </>
      )}
      <Link
        className="self-center text-center font-semibold text-primary-500 no-underline"
        to={useResetPassword.isError ? '/forgotten' : '/login'}
      >
        {intl.$t({ id: useResetPassword.isError ? 'Reset.GoToReset' : 'Reset.GoToLoginPage' })}
      </Link>
    </PublicContainer>
  );
};

export default Reset;
