import { IntlConfig } from 'react-intl';
import { create } from 'zustand';
import languages from '@/data/languages.json';

interface State {
  language: IntlConfig['locale'];
  setLanguage: (language: string) => void;
  resetLanguage: () => void;
}

const DEFAULT_LANGUAGE = 'en';

const getLanguageWithFallback = (language: string) =>
  Object.keys(languages).includes(language) ? (language as State['language']) : DEFAULT_LANGUAGE;

const browserLanguageWithFallback = getLanguageWithFallback(navigator.language.split('-')[0]);

const useLanguageStore = create<State>()((set) => ({
  language: browserLanguageWithFallback,
  setLanguage: (language) => set({ language: getLanguageWithFallback(language) }),
  resetLanguage: () => set({ language: browserLanguageWithFallback }),
}));

export default useLanguageStore;
