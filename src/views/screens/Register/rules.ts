import type { TFunction } from 'i18next';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createRegisterRules = (t: TFunction) => ({
  name: {
    required: t('register.nameRequired'),
    minLength: { value: 2, message: t('register.nameMin') },
  },
  email: {
    required: t('register.emailRequired'),
    pattern: { value: EMAIL_REGEX, message: t('register.emailInvalid') },
  },
  password: {
    required: t('register.passwordRequired'),
    minLength: { value: 8, message: t('register.passwordMin') },
    maxLength: { value: 64, message: t('register.passwordMax') },
    validate: {
      lower: (v: string) => /[a-z]/.test(v) || t('register.lower'),
      upper: (v: string) => /[A-Z]/.test(v) || t('register.upper'),
      special: (v: string) => /[^A-Za-z0-9\s]/.test(v) || t('register.special'),
    },
  },
});