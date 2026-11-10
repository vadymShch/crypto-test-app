import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { checkPin } from '../../../storage/secureStorage';
import { signOut } from '../../../services/session';
import { useAuthStore } from '../../../store/authStore';
import { PIN_LENGTH } from '../../../constants/pin';
import {
  isBiometricAvailable,
  authenticateWithBiometrics,
} from '../../../services/biometrics';

export function useScreen() {
  const { t } = useTranslation();
  const user = useAuthStore((state) => state.user);
  const setStatus = useAuthStore((state) => state.setStatus);

  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [biometricAvailable, setBiometricAvailable] = useState(false);

  const unlock = () => setStatus('unlocked');

  const onBiometric = async () => {
    const success = await authenticateWithBiometrics();
    if (success) unlock();
  };

  useEffect(() => {
    const init = async () => {
      const available = await isBiometricAvailable();
      setBiometricAvailable(available);
      if (available) onBiometric();
    };
    init();
  }, []);

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

    const isValid = await checkPin(pin);
    if (!isValid) {
      setError(t('pin.wrong'));
      setPin('');
      return;
    }

    unlock();
  };

  const changeAccount = () => signOut();

  return {
    email: user?.email ?? '',
    pin,
    pinLength: PIN_LENGTH,
    error,
    biometricAvailable,
    onDigit,
    onDelete,
    onContinue,
    onBiometric,
    changeAccount,
  };
}