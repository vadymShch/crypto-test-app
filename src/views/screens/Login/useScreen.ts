import { useMemo, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';
import { login } from '../../../api/auth';
import { saveSession } from '../../../storage/secureStorage';
import { useAuthStore } from '../../../store/authStore';
import { createLoginRules } from './rules';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

type LoginFormValues = {
  username: string;
  password: string;
};

export function useScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<Nav>();
  const setSession = useAuthStore((state) => state.setSession);
  const setStatus = useAuthStore((state) => state.setStatus);

  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const rules = useMemo(() => createLoginRules(t), [t]);

  const goBack = () => navigation.goBack();
  const goToRegister = () => navigation.navigate('Register');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: { username: '', password: '' },
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit(async ({ username, password }) => {
    setLoginError(null);
    setIsLoading(true);
    try {
      const data = await login(username.trim(), password);
      await saveSession(data);
      setSession(data);
      setStatus('needsPin');
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        setLoginError(t('login.invalidCredentials'));
      } else {
        setLoginError(t('login.network'));
      }
      setIsLoading(false);
    }
  });

  return { control, errors, rules, onSubmit, goBack, goToRegister, isLoading, loginError };
}