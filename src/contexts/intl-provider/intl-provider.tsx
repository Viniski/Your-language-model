import { IntlProvider as OrgIntlProvider } from 'react-intl';
import useLanguageStore from '@/contexts/intl-provider/use-language-store';
import messagesEN from '@/locales/en.json';
import messagesPL from '@/locales/pl.json';
import { ChildrenProps } from '@/types';

const messages = {
  en: messagesEN,
  pl: messagesPL,
};

const IntlProvider = ({ children }: ChildrenProps) => {
  const { language } = useLanguageStore();

  return (
    <OrgIntlProvider
      locale={language}
      messages={messages[language]}
      onError={(err) => {
        if (err.code === 'MISSING_TRANSLATION') {
          return;
        }
        throw err;
      }}
    >
      {children}
    </OrgIntlProvider>
  );
};

export default IntlProvider;
