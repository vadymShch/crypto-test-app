import * as LocalAuthentication from 'expo-local-authentication';

export async function isBiometricAvailable() {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();
  return hasHardware && isEnrolled;
}

export async function authenticateWithBiometrics() {
  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Unlock the app',
    cancelLabel: 'Use PIN',
    disableDeviceFallback: true,
  });
  return result.success;
}