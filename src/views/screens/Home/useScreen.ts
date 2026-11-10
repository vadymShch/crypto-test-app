import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';
import { useLatestPosts } from '../../../hooks/usePosts';
import { useProfile } from '../../../hooks/useProfile';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function useScreen() {
  const navigation = useNavigation<Nav>();
  const { fullName } = useProfile();

  const { data: posts, isPending, isError, fetchStatus, refetch } = useLatestPosts();
  const isOffline = isPending && fetchStatus === 'paused';

  const openPost = (postId: number) => navigation.navigate('Post', { postId });

  return { fullName, posts, isPending, isError, isOffline, refetch, openPost };
}