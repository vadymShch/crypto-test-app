import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { LANGUAGES, setLanguage, type AppLanguage } from '../../../i18n';

export function useScreen() {
  const navigation = useNavigation();
  const { i18n } = useTranslation();

  const current = i18n.language as AppLanguage;

  const goBack = () => navigation.goBack();
  const selectLanguage = (code: AppLanguage) => {
    setLanguage(code);
  };

  return { languages: LANGUAGES, current, goBack, selectLanguage };
}