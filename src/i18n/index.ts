import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from './locales/en';
import sv from './locales/sv';

const LANGUAGE_KEY = 'app.language';

export type AppLanguage = 'en' | 'sv';

export const LANGUAGES: { code: AppLanguage; label: string }[] = [
  { code: 'en', label: 'English' },
  { code: 'sv', label: 'Svenska' },
];

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    sv: { translation: sv },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
});

export async function loadSavedLanguage() {
  const saved = await AsyncStorage.getItem(LANGUAGE_KEY);
  if (saved === 'en' || saved === 'sv') {
    await i18n.changeLanguage(saved);
  }
}

export async function setLanguage(lang: AppLanguage) {
  await i18n.changeLanguage(lang);
  await AsyncStorage.setItem(LANGUAGE_KEY, lang);
}

export default i18n;