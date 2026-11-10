import { clearPin, clearSession } from '../storage/secureStorage';
import { useAuthStore } from '../store/authStore';
import { queryClient } from '../lib/queryClient';

export async function signOut() {
  await clearSession();
  await clearPin();
  queryClient.clear();
  useAuthStore.getState().logout();
}