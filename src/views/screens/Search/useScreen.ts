import { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';
import { useAllPosts } from '../../../hooks/usePosts';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export function useScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState('');

  const { data: posts, isPending, isError, fetchStatus, refetch } = useAllPosts();
  const isOffline = isPending && fetchStatus === 'paused';

  const results = useMemo(() => {
    if (!posts) return [];
    const text = query.trim().toLowerCase();
    if (!text) return posts;
    return posts.filter(
      (post) => post.title.toLowerCase().includes(text) || String(post.id) === text,
    );
  }, [posts, query]);

  const openPost = (postId: number) => navigation.navigate('Post', { postId });

  return { query, setQuery, results, isPending, isError, isOffline, refetch, openPost };
}