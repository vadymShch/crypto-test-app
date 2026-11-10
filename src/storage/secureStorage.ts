import * as Keychain from 'react-native-keychain';
import type { LoginResponse } from '../api/auth';

const SESSION_SERVICE = 'app.session';
const PIN_SERVICE = 'app.pin';

// ---- Сесія (токени + дані користувача) ----

export async function saveSession(session: LoginResponse) {
  await Keychain.setGenericPassword('session', JSON.stringify(session), {
    service: SESSION_SERVICE,
  });
}

export async function loadSession(): Promise<LoginResponse | null> {
  const result = await Keychain.getGenericPassword({ service: SESSION_SERVICE });
  if (!result) return null;
  return JSON.parse(result.password) as LoginResponse;
}

export async function clearSession() {
  await Keychain.resetGenericPassword({ service: SESSION_SERVICE });
}

export async function updateSessionTokens(accessToken: string, refreshToken: string) {
  const session = await loadSession();
  if (!session) return;
  await saveSession({ ...session, accessToken, refreshToken });
}

// ---- PIN ----

export async function savePin(pin: string) {
  await Keychain.setGenericPassword('pin', pin, { service: PIN_SERVICE });
}

export async function hasPin() {
  const result = await Keychain.getGenericPassword({ service: PIN_SERVICE });
  return !!result;
}

export async function checkPin(pin: string) {
  const result = await Keychain.getGenericPassword({ service: PIN_SERVICE });
  return !!result && result.password === pin;
}

export async function clearPin() {
  await Keychain.resetGenericPassword({ service: PIN_SERVICE });
}