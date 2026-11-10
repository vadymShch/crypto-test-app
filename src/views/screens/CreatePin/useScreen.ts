import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { savePin, clearSession } from '../../../storage/secureStorage';
import { useAuthStore } from '../../../store/authStore';
import { PIN_LENGTH } from '../../../constants/pin';

type Step = 'enter' | 'confirm';

export function useScreen() {
  const { t } = useTranslation();
  const logout = useAuthStore((state) => state.logout);
  const setStatus = useAuthStore((state) => state.setStatus);

  const [step, setStep] = useState<Step>('enter');
  const [firstPin, setFirstPin] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onDigit = (digit: string) => {
    if (pin.length >= PIN_LENGTH) return;
    setPin(pin + digit);
    setError(null);
  };

  const onDelete = () => setPin((prev) => prev.slice(0, -1));

  const onContinue = async () => {
    if (pin.length < PIN_LENGTH) {
      setError(t('pin.enterDigits', { length: PIN_LENGTH }));
      return;
    }

    if (step === 'enter') {
      setFirstPin(pin);
      setPin('');
      setStep('confirm');
      return;
    }

    if (pin !== firstPin) {
      setError(t('pin.mismatch'));
      setPin('');
      setFirstPin('');
      setStep('enter');
      return;
    }

    await savePin(pin);
    setStatus('unlocked');
  };

  const goBack = async () => {
    if (step === 'confirm') {
      setStep('enter');
      setPin('');
      setFirstPin('');
      setError(null);
      return;
    }
    await clearSession();
    logout();
  };

  const title = step === 'enter' ? t('pin.createTitle') : t('pin.repeatTitle');
  const subtitle = t('pin.prompt', { length: PIN_LENGTH });

  return {
    title,
    subtitle,
    pin,
    pinLength: PIN_LENGTH,
    error,
    onDigit,
    onDelete,
    onContinue,
    goBack,
  };
}