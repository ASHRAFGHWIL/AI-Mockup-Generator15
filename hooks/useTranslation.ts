import React from 'react';
import { en } from '../i18n/en';
import { ar } from '../i18n/ar';

export type Language = 'en' | 'ar';

export const LanguageContext = React.createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof typeof en) => string;
}>({
  language: 'en',
  setLanguage: () => {},
  t: (key) => en[key] || key,
});

const translations = { en, ar };

export const useTranslation = () => {
  const { language, setLanguage } = React.useContext(LanguageContext);

  const t = React.useCallback(
    (key: keyof typeof en): string => {
      return translations[language][key] || key;
    },
    [language]
  );

  return { t, language, setLanguage };
};
