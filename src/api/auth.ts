import { api } from './client';

export type LoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type MeResponse = Pick<
  LoginResponse,
  'id' | 'username' | 'email' | 'firstName' | 'lastName' | 'image'
>;

export async function login(username: string, password: string) {
  const { data } = await api.post<LoginResponse>('/auth/login', {
    username,
    password,
    expiresInMins: 30,
  });
  return data;
}

export async function fetchMe() {
  const { data } = await api.get<MeResponse>('/auth/me');
  return data;
}