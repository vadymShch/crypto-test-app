import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { createRegisterRules } from './rules';

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
};

export function useScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();

  const rules = useMemo(() => createRegisterRules(t), [t]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: { name: '', email: '', password: '' },
    mode: 'onTouched',
  });

  const onSubmit = handleSubmit((data) => {});

  return { control, errors, rules, onSubmit, goBack };
}