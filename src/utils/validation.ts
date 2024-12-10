import { IntlShape } from 'react-intl/src/types';
import { z } from 'zod';

export const PASSWORD_REQUIREMENTS = {
  min: {
    value: 6,
  },
  minLowercase: {
    regex: /[a-z]/,
  },
  minUppercase: {
    regex: /[A-Z]/,
  },
  minNumbers: {
    regex: /[0-9]/,
  },
  minSymbols: {
    regex: /[\W_]+/,
  },
};

export const createEmailValidator = (intl: IntlShape) =>
  z.string().regex(/^[a-z0-9][_a-z0-9\-.+]*@[a-z0-9][a-z0-9.-]*\.[a-z]{2,}$/i, intl.$t({ id: 'Form.EmailIncorrect' }));

export const createSimpleStringValidator = (intl: IntlShape) =>
  z.string().min(1, { message: intl.$t({ id: 'Form.FieldRequired' }) });

export const createSimplePasswordValidator = (intl: IntlShape) =>
  z.string().min(1, { message: intl.$t({ id: 'Form.PasswordIncorrect' }) });

export const createPasswordValidator = (intl: IntlShape) =>
  z.string().min(PASSWORD_REQUIREMENTS.min.value, { message: intl.$t({ id: 'Form.PasswordIncorrect' }) });
