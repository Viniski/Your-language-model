import { IntlConfig } from 'react-intl';
import { create } from 'zustand';
import languages from '@/data/languages.json';
import { Language } from '@/types';

interface State {
  language: IntlConfig['locale'];
  setLanguage: (language: Language) => void;
}

export const DEFAULT_LANGUAGE = 'pl';

const getLanguageWithFallback = (language: Language) =>
  Object.keys(languages).includes(language) ? (language as State['language']) : DEFAULT_LANGUAGE;

const useLanguageStore = create<State>()((set) => ({
  language: getLanguageWithFallback(navigator.language.split('-')[0] as Language),
  setLanguage: (language) => set({ language: getLanguageWithFallback(language) }),
}));

export default useLanguageStore;
