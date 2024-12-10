import { useIntl } from 'react-intl';

const RegisterGdpr = () => {
  const intl = useIntl();

  return <div className="m-auto max-w-5xl text-center text-sm text-white">{intl.$t({ id: 'Register.Gdpr' })}</div>;
};

export default RegisterGdpr;
