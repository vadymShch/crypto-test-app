import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '../api/auth';
import { useAuthStore } from '../store/authStore';

export function useProfile() {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);

  const { data: me } = useQuery({
    queryKey: ['me'],
    queryFn: fetchMe,
    enabled: !!accessToken,
  });

  const source = me ?? user;

  return {
    fullName: source ? `${source.firstName} ${source.lastName}` : '',
    image: source?.image ?? null,
  };
}