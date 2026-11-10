import { signOut } from '../../../services/session';

export function useScreen() {
  const onLogout = () => signOut();

  return { onLogout };
}