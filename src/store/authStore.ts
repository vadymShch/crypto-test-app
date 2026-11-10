import { create } from 'zustand';
import type { LoginResponse } from '../api/auth';

type User = Omit<LoginResponse, 'accessToken' | 'refreshToken'>;

export type AuthStatus = 'loading' | 'signedOut' | 'needsPin' | 'locked' | 'unlocked';

type AuthState = {
  status: AuthStatus;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setStatus: (status: AuthStatus) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setSession: (data: LoginResponse) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  status: 'loading',
  user: null,
  accessToken: null,
  refreshToken: null,
  setStatus: (status) => set({ status }),
  setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
  setSession: ({ accessToken, refreshToken, ...user }) =>
    set({ user, accessToken, refreshToken }),
  logout: () =>
    set({ status: 'signedOut', user: null, accessToken: null, refreshToken: null }),
}));