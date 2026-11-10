import axios, { type AxiosError } from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useAuthStore } from '../store/authStore';
import { updateSessionTokens } from '../storage/secureStorage';
import { signOut } from '../services/session';

export const BASE_URL = 'https://dummyjson.com';

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// Додаємо токен до кожного запиту
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Що робити, коли сервер відповів 401
const refreshAuthLogic = async (failedRequest: AxiosError) => {
  try {
    const { refreshToken, setTokens } = useAuthStore.getState();
    if (!refreshToken) throw new Error('No refresh token');

    // Звичайний axios, а не api, щоб не зациклитись на власному interceptor
    const { data } = await axios.post<{ accessToken: string; refreshToken: string }>(
      `${BASE_URL}/auth/refresh`,
      { refreshToken, expiresInMins: 30 },
    );

    setTokens(data.accessToken, data.refreshToken);
    await updateSessionTokens(data.accessToken, data.refreshToken);

    if (failedRequest.response) {
      failedRequest.response.config.headers.Authorization = `Bearer ${data.accessToken}`;
    }
    console.log('Token refreshed');
  } catch (e) {
    // Оновити не вдалося: сесія недійсна, виходимо з акаунта
    await signOut();
    throw e;
  }
};

createAuthRefreshInterceptor(api, refreshAuthLogic);