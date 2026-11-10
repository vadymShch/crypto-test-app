import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchLatestPosts, fetchPost, fetchPostComments, fetchAllPosts } from '../api/posts';

export function useLatestPosts() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['posts', 'latest'],
    queryFn: async () => {
      const posts = await fetchLatestPosts();

      posts.forEach((post) => {
        queryClient.setQueryData(['posts', post.id], post);
        queryClient.prefetchQuery({
          queryKey: ['posts', post.id, 'comments'],
          queryFn: () => fetchPostComments(post.id),
        });
      });

      return posts;
    },
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id),
  });
}

export function usePostComments(postId: number) {
  return useQuery({
    queryKey: ['posts', postId, 'comments'],
    queryFn: () => fetchPostComments(postId),
  });
}; 

export function useAllPosts() {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['posts', 'all'],
    queryFn: async () => {
      const posts = await fetchAllPosts();
      posts.forEach((post) => queryClient.setQueryData(['posts', post.id], post));
      return posts;
    },
  });
}