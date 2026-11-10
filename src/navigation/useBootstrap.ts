import { useEffect } from 'react';
import { loadSession, hasPin } from '../storage/secureStorage';
import { useAuthStore, type AuthStatus } from '../store/authStore';
import { loadSavedLanguage } from '../i18n';

export function useBootstrap() {
  const setSession = useAuthStore((state) => state.setSession);
  const setStatus = useAuthStore((state) => state.setStatus);

  useEffect(() => {
    const init = async () => {
      let status: AuthStatus = 'signedOut';
      try {
        await loadSavedLanguage();
        const [session, pinExists] = await Promise.all([loadSession(), hasPin()]);
        if (session) {
          setSession(session);
          status = pinExists ? 'locked' : 'needsPin';
        }
      } catch (e) {}
      setStatus(status);
    };
    init();
  }, []);
}