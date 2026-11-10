import type { TFunction } from 'i18next';

export const createLoginRules = (t: TFunction) => ({
  username: { required: t('login.emailRequired') },
  password: { required: t('login.passwordRequired') },
});