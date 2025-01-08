import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { Link, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { twJoin } from 'tailwind-merge';
import { z } from 'zod';
import supabase from '@/api/supabase-client';
import { AppButton, AppTextFieldFormPassword } from '@/components';
import PublicContainer from '@/components/public-container';
import { useLogout } from '@/hooks';
import { createPasswordValidator } from '@/utils/validation';

const Reset = () => {
  const intl = useIntl();
  const logout = useLogout();
  const { token = '' } = useParams();

  const resetPasswordMutation = useMutation({
    mutationFn: async (password: FormData['password']) => {
      if (token !== 'super_secret_token') {
        throw new Error('Invalid token');
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
  const isMutationSent = resetPasswordMutation.isSuccess || resetPasswordMutation.isError;

  return (
    <PublicContainer
      className={twJoin(isMutationSent && 'items-center')}
      onSubmit={form.handleSubmit(({ password }) => resetPasswordMutation.mutate(password))}
    >
      {isMutationSent ? (
        <>
          <img
            alt=""
            className="mb-8 max-w-full"
            height={148}
            src={resetPasswordMutation.isError ? '/images/action-error.svg' : '/images/action-success.svg'}
            width={262}
          />
          <div className="mb-6 flex flex-col items-center gap-2.5">
            <PublicContainer.Title className="whitespace-pre-line text-center">
              <FormattedMessage id={resetPasswordMutation.isError ? 'Reset.Error.Title' : 'Reset.Success.Title'} />
            </PublicContainer.Title>
            {resetPasswordMutation.isError && (
              <p className="text-center text-gray-300">
                <FormattedMessage id="Reset.Error.Description" />
              </p>
            )}
          </div>
        </>
      ) : (
        <>
          <PublicContainer.Title className="mb-3">
            <FormattedMessage id="Reset.Title" />
          </PublicContainer.Title>
          <p className="mb-8 text-gray-600">
            <FormattedMessage id="Reset.Description" />
          </p>
          <AppTextFieldFormPassword
            className="mb-5"
            control={form.control}
            field="password"
            label={intl.$t({ id: 'Form.NewPassword' })}
            slotProps={{
              htmlInput: { autoComplete: 'new-password' },
            }}
          />
          <AppButton
            className="mb-8 rounded-xl !py-4 !text-base !font-normal"
            loading={resetPasswordMutation.isLoading}
            type="submit"
          >
            <FormattedMessage id="Reset.ChangePassword" />
          </AppButton>
        </>
      )}
      <Link
        className="self-center text-center font-semibold text-primary-500 no-underline"
        to={resetPasswordMutation.isError ? '/forgotten' : '/login'}
      >
        <FormattedMessage id={resetPasswordMutation.isError ? 'Reset.GoToReset' : 'Reset.GoToLoginPage'} />
      </Link>
    </PublicContainer>
  );
};

export default Reset;
